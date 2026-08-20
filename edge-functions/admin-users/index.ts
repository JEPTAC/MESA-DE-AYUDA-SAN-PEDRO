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

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const service = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type RoleRow = { role_id: string; roles: { code: string } | null };

async function authenticatedAdmin(req: Request) {
  const authHeader = req.headers.get("Authorization") || "";
  const jwt = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!jwt) throw new Error("missing_token");

  const { data: userData, error: userError } = await service.auth.getUser(jwt);
  if (userError || !userData.user) throw new Error("invalid_token");

  const callerId = userData.user.id;
  const { data: roles, error: roleError } = await service
    .from("user_roles")
    .select("role_id,roles!inner(code)")
    .eq("profile_id", callerId)
    .eq("roles.code", "admin")
    .limit(1);
  if (roleError) throw roleError;
  if (!roles?.length) throw new Error("admin_required");
  return userData.user;
}

async function audit(actorId: string, entityId: string, action: string, newData: Record<string, unknown> = {}) {
  await service.from("audit_events").insert({
    actor_id: actorId,
    entity_type: "auth_user",
    entity_id: entityId,
    action,
    new_data: newData,
    context: { source: "edge:admin-users" },
  });
}

async function roleIds(roleCodes: string[]) {
  const unique = [...new Set(roleCodes.filter(Boolean))];
  if (!unique.length) return [];
  const { data, error } = await service.from("roles").select("id,code").in("code", unique);
  if (error) throw error;
  const found = new Set((data || []).map((r) => r.code));
  const missing = unique.filter((r) => !found.has(r));
  if (missing.length) throw new Error(`unknown_roles:${missing.join(",")}`);
  return data || [];
}

async function assignRoles(actorId: string, profileId: string, codes: string[]) {
  const normalized = [...new Set(codes.length ? codes : ["requester"])];
  if (actorId === profileId && !normalized.includes("admin")) {
    throw new Error("cannot_remove_own_admin_role");
  }
  const roles = await roleIds(normalized);
  const { error: delErr } = await service.from("user_roles").delete().eq("profile_id", profileId);
  if (delErr) throw delErr;
  if (roles.length) {
    const { error: insErr } = await service.from("user_roles").insert(roles.map((r) => ({
      profile_id: profileId,
      role_id: r.id,
      scope_type: "global",
      scope_id: null,
      granted_by: actorId,
    })));
    if (insErr) throw insErr;
  }
}

async function resolveDepartment(code?: string | null) {
  if (!code) return null;
  const { data, error } = await service.from("departments").select("id").ilike("code", code.trim()).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error(`unknown_department:${code}`);
  return data.id;
}

async function resolvePosition(code?: string | null) {
  if (!code) return null;
  const { data, error } = await service.from("positions").select("id").ilike("code", code.trim()).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error(`unknown_position:${code}`);
  return data.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    const caller = await authenticatedAdmin(req);
    const body = await req.json();
    const action = String(body.action || "");

    if (action === "list") {
      const page = Number(body.page || 1);
      const perPage = Math.min(Math.max(Number(body.per_page || 50), 1), 200);
      const { data, error } = await service.auth.admin.listUsers({ page, perPage });
      if (error) throw error;
      const ids = data.users.map((u) => u.id);
      const { data: profiles } = ids.length
        ? await service.from("profiles").select("id,full_name,display_name,institutional_email,phone,is_active,department_id,position_id").in("id", ids)
        : { data: [] } as any;
      const { data: userRoles } = ids.length
        ? await service.from("user_roles").select("profile_id,roles(code,name)").in("profile_id", ids)
        : { data: [] } as any;
      return json({ users: data.users, profiles: profiles || [], roles: userRoles || [] });
    }

    if (action === "create") {
      const email = String(body.email || "").trim().toLowerCase();
      if (!email) return json({ error: "email_required" }, 400);
      const fullName = String(body.full_name || body.display_name || email).trim();
      const displayName = String(body.display_name || fullName).trim();
      const roles = Array.isArray(body.roles) ? body.roles.map(String) : [String(body.role_code || "requester")];
      const departmentId = body.department_id || await resolveDepartment(body.department_code);
      const positionId = body.position_id || await resolvePosition(body.position_code);
      let created;

      if (body.password) {
        const { data, error } = await service.auth.admin.createUser({
          email,
          password: String(body.password),
          email_confirm: true,
          user_metadata: { full_name: fullName, display_name: displayName },
        });
        if (error) throw error;
        created = data.user;
      } else {
        const { data, error } = await service.auth.admin.inviteUserByEmail(email, {
          data: { full_name: fullName, display_name: displayName },
        });
        if (error) throw error;
        created = data.user;
      }
      if (!created) throw new Error("user_creation_failed");

      await service.from("profiles").upsert({
        id: created.id,
        full_name: fullName,
        display_name: displayName,
        institutional_email: email,
        department_id: departmentId,
        position_id: positionId,
        phone: body.phone || null,
        is_active: body.is_active !== false,
      });
      await assignRoles(caller.id, created.id, roles);
      await audit(caller.id, created.id, "user_created", { email, roles });
      return json({ ok: true, user_id: created.id, email, roles });
    }

    const targetId = String(body.user_id || "");
    if (!targetId) return json({ error: "user_id_required" }, 400);

    if (action === "change_password") {
      const password = String(body.password || "");
      if (password.length < 8) return json({ error: "password_min_8_chars" }, 400);
      const { error } = await service.auth.admin.updateUserById(targetId, { password });
      if (error) throw error;
      await audit(caller.id, targetId, "password_changed_by_admin");
      return json({ ok: true });
    }

    if (action === "set_roles") {
      const roles = Array.isArray(body.roles) ? body.roles.map(String) : [];
      if (!roles.length) return json({ error: "roles_required" }, 400);
      await assignRoles(caller.id, targetId, roles);
      await audit(caller.id, targetId, "roles_changed", { roles });
      return json({ ok: true, roles });
    }

    if (action === "update_profile") {
      const updates: Record<string, unknown> = {};
      for (const key of ["full_name", "display_name", "phone", "is_active"]) {
        if (Object.prototype.hasOwnProperty.call(body, key)) updates[key] = body[key];
      }
      if (body.department_code || Object.prototype.hasOwnProperty.call(body, "department_id")) {
        updates.department_id = body.department_id ?? await resolveDepartment(body.department_code);
      }
      if (body.position_code || Object.prototype.hasOwnProperty.call(body, "position_id")) {
        updates.position_id = body.position_id ?? await resolvePosition(body.position_code);
      }
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
    const status = ["missing_token", "invalid_token", "admin_required"].includes(message) ? 401 : 400;
    return json({ error: message }, status);
  }
});
