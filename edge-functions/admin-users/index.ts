import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
});
const service = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const PRODUCTION_ROLES = ["requester","communications_agent","tic_agent","coordinator","approver","auditor","admin","super_admin"];

function institutionalEmail(email: string) {
  return /^[^@]+@sanpedro-valle\.gov\.co$/i.test(email.trim());
}

function validateRoleTeams(roles: string[], teams: string[]) {
  const uniqueRoles = [...new Set(roles.map(String).filter(Boolean))];
  const teamSet = new Set(teams.map((x) => x.toUpperCase()));
  if (!uniqueRoles.length) throw new Error("roles_required");
  if (uniqueRoles.some((code) => !PRODUCTION_ROLES.includes(code))) throw new Error("role_not_available_for_launch");
  const principal = uniqueRoles.filter((code) => ["requester","communications_agent","tic_agent","coordinator","admin","super_admin"].includes(code));
  if (principal.length > 1) throw new Error("only_one_principal_role_allowed");
  if (uniqueRoles.includes("communications_agent") && (teamSet.size !== 1 || !teamSet.has("COM"))) throw new Error("communications_agent_requires_only_COM_team");
  if (uniqueRoles.includes("tic_agent") && (teamSet.size !== 1 || !teamSet.has("TIC"))) throw new Error("tic_agent_requires_only_TIC_team");
  if (uniqueRoles.includes("coordinator") && teamSet.size === 0) throw new Error("coordinator_requires_team");
  if (uniqueRoles.includes("requester") && teams.length) throw new Error("requester_must_not_have_operational_team");
}

async function authenticatedSuperAdmin(req: Request) {
  const jwt = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!jwt) throw new Error("missing_token");
  const { data, error } = await service.auth.getUser(jwt);
  if (error || !data.user) throw new Error("invalid_token");
  const { data: roles, error: roleError } = await service
    .from("user_roles")
    .select("roles!inner(code)")
    .eq("profile_id", data.user.id)
    .eq("roles.code", "super_admin")
    .limit(1);
  if (roleError) throw roleError;
  if (!roles?.length) throw new Error("super_admin_required");
  return data.user;
}

async function audit(actorId: string, entityId: string, action: string, newData: Record<string, unknown> = {}) {
  await service.from("audit_events").insert({
    actor_id: actorId, entity_type: "auth_user", entity_id: entityId, action, new_data: newData,
    context: { source: "edge:admin-users" },
  });
}

async function roleRows(codes: string[]) {
  const unique = [...new Set(codes.map(String).map((x) => x.trim()).filter(Boolean))];
  const disallowed = unique.filter((code) => !PRODUCTION_ROLES.includes(code));
  if (disallowed.length) throw new Error(`role_not_available_for_launch:${disallowed.join(",")}`);
  if (!unique.length) return [];
  const { data, error } = await service.from("roles").select("id,code,name").in("code", unique);
  if (error) throw error;
  const found = new Set((data || []).map((r) => r.code));
  const missing = unique.filter((r) => !found.has(r));
  if (missing.length) throw new Error(`unknown_roles:${missing.join(",")}`);
  return data || [];
}

async function teamRows(codes: string[]) {
  const unique = [...new Set(codes.map(String).map((x) => x.trim().toUpperCase()).filter(Boolean))];
  if (!unique.length) return [];
  const { data, error } = await service.from("teams").select("id,code,name").in("code", unique);
  if (error) throw error;
  const found = new Set((data || []).map((t) => t.code));
  const missing = unique.filter((t) => !found.has(t));
  if (missing.length) throw new Error(`unknown_teams:${missing.join(",")}`);
  return data || [];
}

async function assignRoles(actorId: string, profileId: string, codes: string[]) {
  const normalized = [...new Set((codes.length ? codes : ["requester"]).map(String))];
  if (actorId === profileId && !normalized.includes("super_admin")) throw new Error("cannot_remove_own_super_admin_role");
  const roles = await roleRows(normalized);
  const { error: delErr } = await service.from("user_roles").delete().eq("profile_id", profileId);
  if (delErr) throw delErr;
  if (roles.length) {
    const { error } = await service.from("user_roles").insert(roles.map((r) => ({
      profile_id: profileId, role_id: r.id, scope_type: "global", scope_id: null, granted_by: actorId,
    })));
    if (error) throw error;
  }
}

async function assignTeams(actorId: string, profileId: string, codes: string[]) {
  const teams = await teamRows(codes);
  const { error: delErr } = await service.from("team_members").delete().eq("profile_id", profileId);
  if (delErr) throw delErr;
  if (teams.length) {
    const { error } = await service.from("team_members").insert(teams.map((t) => ({
      team_id: t.id, profile_id: profileId, member_role: "member", is_active: true,
    })));
    if (error) throw error;
  }
  await audit(actorId, profileId, "teams_changed", { teams: codes });
}

async function resolveByCode(table: "departments" | "positions", code?: string | null) {
  if (!code) return null;
  const { data, error } = await service.from(table).select("id").ilike("code", code.trim()).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error(`unknown_${table === "departments" ? "department" : "position"}:${code}`);
  return data.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  try {
    const caller = await authenticatedSuperAdmin(req);
    const body = await req.json();
    const action = String(body.action || "");

    if (action === "list") {
      const page = Math.max(Number(body.page || 1), 1);
      const perPage = Math.min(Math.max(Number(body.per_page || 100), 1), 200);
      const { data, error } = await service.auth.admin.listUsers({ page, perPage });
      if (error) throw error;
      const ids = data.users.map((u) => u.id);
      const [{ data: profiles }, { data: userRoles }, { data: memberships }, { data: allRoles }, { data: allTeams }] = await Promise.all([
        ids.length ? service.from("profiles").select("id,full_name,display_name,institutional_email,phone,is_active,department_id,position_id").in("id", ids) : Promise.resolve({ data: [] } as any),
        ids.length ? service.from("user_roles").select("profile_id,roles(code,name)").in("profile_id", ids) : Promise.resolve({ data: [] } as any),
        ids.length ? service.from("team_members").select("profile_id,teams(id,code,name)").eq("is_active", true).in("profile_id", ids) : Promise.resolve({ data: [] } as any),
        service.from("roles").select("code,name").in("code", PRODUCTION_ROLES).order("name"),
        service.from("teams").select("id,code,name").eq("is_active", true).order("name"),
      ]);
      return json({ users: data.users, profiles: profiles || [], roles: userRoles || [], memberships: memberships || [], available_roles: allRoles || [], available_teams: allTeams || [] });
    }

    if (action === "create") {
      const email = String(body.email || "").trim().toLowerCase();
      if (!email) return json({ error: "email_required" }, 400);
      if (!institutionalEmail(email)) return json({ error: "institutional_email_required" }, 400);
      const fullName = String(body.full_name || body.display_name || email).trim();
      const displayName = String(body.display_name || fullName).trim();
      const roles = Array.isArray(body.roles) ? body.roles.map(String) : [String(body.role_code || "requester")];
      const teams = Array.isArray(body.teams) ? body.teams.map(String) : (body.team_codes ? String(body.team_codes).split(/[;,]/).map((x) => x.trim()) : []);
      validateRoleTeams(roles, teams);
      const departmentId = body.department_id ?? await resolveByCode("departments", body.department_code);
      const positionId = body.position_id ?? await resolveByCode("positions", body.position_code);
      let created;
      if (body.password) {
        if (String(body.password).length < 8) return json({ error: "password_min_8_chars" }, 400);
        const { data, error } = await service.auth.admin.createUser({
          email, password: String(body.password), email_confirm: true,
          user_metadata: { full_name: fullName, display_name: displayName },
        });
        if (error) throw error;
        created = data.user;
      } else {
        const { data, error } = await service.auth.admin.inviteUserByEmail(email, { data: { full_name: fullName, display_name: displayName } });
        if (error) throw error;
        created = data.user;
      }
      if (!created) throw new Error("user_creation_failed");
      const { error: profileError } = await service.from("profiles").upsert({
        id: created.id, full_name: fullName, display_name: displayName, institutional_email: email,
        department_id: departmentId, position_id: positionId, phone: body.phone || null, is_active: body.is_active !== false,
      });
      if (profileError) throw profileError;
      await assignRoles(caller.id, created.id, roles);
      await assignTeams(caller.id, created.id, teams);
      await audit(caller.id, created.id, "user_created", { email, roles, teams });
      return json({ ok: true, user_id: created.id, email, roles, teams });
    }

    const targetId = String(body.user_id || "");
    if (!targetId) return json({ error: "user_id_required" }, 400);

    if (action === "change_password") {
      const password = String(body.password || "");
      if (password.length < 8) return json({ error: "password_min_8_chars" }, 400);
      const { error } = await service.auth.admin.updateUserById(targetId, { password });
      if (error) throw error;
      await audit(caller.id, targetId, "password_changed_by_super_admin");
      return json({ ok: true });
    }
    if (action === "set_access") {
      const roles = Array.isArray(body.roles) ? body.roles.map(String) : [];
      const teams = Array.isArray(body.teams) ? body.teams.map(String) : [];
      validateRoleTeams(roles, teams);
      await assignRoles(caller.id, targetId, roles);
      await assignTeams(caller.id, targetId, teams);
      await audit(caller.id, targetId, "access_changed", { roles, teams });
      return json({ ok: true, roles, teams });
    }
    if (action === "set_roles") {
      const roles = Array.isArray(body.roles) ? body.roles.map(String) : [];
      if (!roles.length) return json({ error: "roles_required" }, 400);
      const { data: currentMemberships } = await service.from("team_members").select("teams!inner(code)").eq("profile_id", targetId).eq("is_active", true);
      const teamCodes = (currentMemberships || []).map((x: any) => x.teams?.code).filter(Boolean);
      validateRoleTeams(roles, teamCodes);
      await assignRoles(caller.id, targetId, roles);
      await audit(caller.id, targetId, "roles_changed", { roles });
      return json({ ok: true, roles });
    }
    if (action === "set_teams") {
      const teams = Array.isArray(body.teams) ? body.teams.map(String) : [];
      const { data: currentRoles } = await service.from("user_roles").select("roles!inner(code)").eq("profile_id", targetId);
      const roleCodes = (currentRoles || []).map((x: any) => x.roles?.code).filter(Boolean);
      validateRoleTeams(roleCodes, teams);
      await assignTeams(caller.id, targetId, teams);
      return json({ ok: true, teams });
    }
    if (action === "update_profile") {
      const updates: Record<string, unknown> = {};
      for (const key of ["full_name", "display_name", "phone", "is_active"]) if (Object.prototype.hasOwnProperty.call(body, key)) updates[key] = body[key];
      if (body.department_code || Object.prototype.hasOwnProperty.call(body, "department_id")) updates.department_id = body.department_id ?? await resolveByCode("departments", body.department_code);
      if (body.position_code || Object.prototype.hasOwnProperty.call(body, "position_id")) updates.position_id = body.position_id ?? await resolveByCode("positions", body.position_code);
      const { error } = await service.from("profiles").update(updates).eq("id", targetId);
      if (error) throw error;
      await audit(caller.id, targetId, "profile_updated", updates);
      return json({ ok: true });
    }
    if (action === "set_active") {
      if (caller.id === targetId && body.is_active === false) return json({ error: "cannot_disable_self" }, 400);
      const active = body.is_active !== false;
      const { error } = await service.from("profiles").update({ is_active: active, is_available: active }).eq("id", targetId);
      if (error) throw error;
      await audit(caller.id, targetId, active ? "user_reactivated" : "user_deactivated", { is_active: active });
      return json({ ok: true, is_active: active });
    }
    return json({ error: "unknown_action" }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = ["missing_token", "invalid_token"].includes(message) ? 401 : message === "super_admin_required" ? 403 : 400;
    return json({ error: message }, status);
  }
});
