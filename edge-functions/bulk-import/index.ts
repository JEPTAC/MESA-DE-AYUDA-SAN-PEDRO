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

function validateRoleTeams(role: string, teams: string[]) {
  const teamSet = new Set(teams.map((x) => x.toUpperCase()));
  if (!PRODUCTION_ROLES.includes(role)) throw new Error(`role_not_available_for_launch:${role}`);
  if (role === "communications_agent" && (teamSet.size !== 1 || !teamSet.has("COM"))) throw new Error("communications_agent_requires_only_COM_team");
  if (role === "tic_agent" && (teamSet.size !== 1 || !teamSet.has("TIC"))) throw new Error("tic_agent_requires_only_TIC_team");
  if (role === "coordinator" && teamSet.size === 0) throw new Error("coordinator_requires_team");
  if (role === "requester" && teams.length) throw new Error("requester_must_not_have_operational_team");
}


type CsvRow = Record<string, string>;

function parseCsv(text: string): { headers: string[]; rows: CsvRow[] } {
  const matrix: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else {
      if (c === '"') quoted = true;
      else if (c === ',') { row.push(field); field = ""; }
      else if (c === '\n') { row.push(field); matrix.push(row); row = []; field = ""; }
      else if (c !== '\r') field += c;
    }
  }
  if (field.length || row.length) { row.push(field); matrix.push(row); }
  const nonEmpty = matrix.filter((r) => r.some((v) => v.trim() !== ""));
  if (!nonEmpty.length) return { headers: [], rows: [] };
  const headers = nonEmpty[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const rows = nonEmpty.slice(1).map((values) => Object.fromEntries(headers.map((h, i) => [h, (values[i] || "").trim()])));
  return { headers, rows };
}

function bool(value: string, fallback = true) {
  if (!value) return fallback;
  return ["1", "true", "si", "sí", "yes", "activo", "active"].includes(value.trim().toLowerCase());
}
function parseJson(value: string) {
  if (!value) return {};
  try { return JSON.parse(value); } catch { throw new Error("invalid_metadata_json"); }
}
function scrub(row: CsvRow) {
  const copy = { ...row };
  delete copy.password;
  delete copy.clave;
  delete copy.secret;
  return copy;
}

async function authenticatedSuperAdmin(req: Request) {
  const jwt = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!jwt) throw new Error("missing_token");
  const { data, error } = await service.auth.getUser(jwt);
  if (error || !data.user) throw new Error("invalid_token");
  const { data: roles, error: roleError } = await service.from("user_roles").select("roles!inner(code)").eq("profile_id", data.user.id).eq("roles.code", "super_admin").limit(1);
  if (roleError) throw roleError;
  if (!roles?.length) throw new Error("super_admin_required");
  return data.user;
}

async function departmentId(code: string) {
  if (!code) return null;
  const { data } = await service.from("departments").select("id").ilike("code", code).maybeSingle();
  if (!data) throw new Error(`unknown_department:${code}`);
  return data.id;
}
async function profileId(email: string) {
  if (!email) return null;
  const { data } = await service.from("profiles").select("id").ilike("institutional_email", email).maybeSingle();
  if (!data) throw new Error(`unknown_profile:${email}`);
  return data.id;
}
async function positionId(code: string) {
  if (!code) return null;
  const { data } = await service.from("positions").select("id").ilike("code", code).maybeSingle();
  if (!data) throw new Error(`unknown_position:${code}`);
  return data.id;
}

async function applyDepartment(row: CsvRow, dryRun: boolean) {
  if (!row.code || !row.name) throw new Error("code_and_name_required");
  const parent = row.parent_code ? await departmentId(row.parent_code) : null;
  if (dryRun) return;
  const { error } = await service.from("departments").upsert({
    code: row.code,
    name: row.name,
    parent_id: parent,
    department_type: row.department_type || "office",
    is_active: bool(row.is_active, true),
  }, { onConflict: "code" });
  if (error) throw error;
}

async function applyEmail(row: CsvRow, dryRun: boolean) {
  if (!row.email) throw new Error("email_required");
  const dept = row.department_code ? await departmentId(row.department_code) : null;
  const profile = row.profile_email ? await profileId(row.profile_email) : null;
  const aliases = row.aliases ? row.aliases.split(";").map((v) => v.trim()).filter(Boolean) : [];
  if (dryRun) return;
  const payload = {
    email: row.email.toLowerCase(), display_name: row.display_name || null,
    account_type: row.account_type || "personal", provider: row.provider || "microsoft365",
    profile_id: profile, department_id: dept, status: row.status || "active", aliases,
    storage_quota_mb: row.storage_quota_mb ? Number(row.storage_quota_mb) : null,
    notes: row.notes || null, metadata: parseJson(row.metadata_json),
  };
  const { data: existing } = await service.from("institutional_email_accounts").select("id").ilike("email", row.email).maybeSingle();
  const query = existing
    ? service.from("institutional_email_accounts").update(payload).eq("id", existing.id)
    : service.from("institutional_email_accounts").insert(payload);
  const { error } = await query;
  if (error) throw error;
}

async function applyAsset(row: CsvRow, dryRun: boolean) {
  if (!row.asset_type || !row.name) throw new Error("asset_type_and_name_required");
  const code = row.asset_type.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  let { data: type } = await service.from("asset_types").select("id").eq("code", code).maybeSingle();
  if (!type && !dryRun) {
    const created = await service.from("asset_types").insert({ code, name: row.asset_type }).select("id").single();
    if (created.error) throw created.error;
    type = created.data;
  }
  const dept = row.department_code ? await departmentId(row.department_code) : null;
  const assigned = row.assigned_email ? await profileId(row.assigned_email) : null;
  if (dryRun) return;
  const payload = {
    asset_type_id: type!.id, asset_tag: row.asset_tag || null, serial_number: row.serial_number || null,
    name: row.name, status: row.status || "active", criticality: row.criticality || "medium",
    department_id: dept, assigned_to: assigned, location: row.location || null,
    manufacturer: row.manufacturer || null, model: row.model || null,
    purchase_date: row.purchase_date || null, warranty_end_date: row.warranty_end_date || null,
    ip_address: row.ip_address || null, mac_address: row.mac_address || null,
    metadata: parseJson(row.metadata_json),
  };
  if (row.asset_tag) {
    const { error } = await service.from("assets").upsert(payload, { onConflict: "asset_tag" });
    if (error) throw error;
  } else if (row.serial_number) {
    const { data: existing } = await service.from("assets").select("id").eq("serial_number", row.serial_number).maybeSingle();
    const q = existing ? service.from("assets").update(payload).eq("id", existing.id) : service.from("assets").insert(payload);
    const { error } = await q; if (error) throw error;
  } else {
    const { error } = await service.from("assets").insert(payload); if (error) throw error;
  }
}

async function applyUser(row: CsvRow, actorId: string, dryRun: boolean) {
  if (!row.email || !row.full_name) throw new Error("email_and_full_name_required");
  if (!institutionalEmail(row.email)) throw new Error("institutional_email_required");
  if ("password" in row || "clave" in row) throw new Error("password_columns_not_allowed_use_admin_users_function");
  const dept = row.department_code ? await departmentId(row.department_code) : null;
  const pos = row.position_code ? await positionId(row.position_code) : null;
  const roleCode = row.role_code || "requester";
  const { data: role } = await service.from("roles").select("id").eq("code", roleCode).maybeSingle();
  if (!role) throw new Error(`unknown_role:${roleCode}`);
  const teamCodes = row.team_codes ? row.team_codes.split(/[;,]/).map((v) => v.trim().toUpperCase()).filter(Boolean) : [];
  validateRoleTeams(roleCode, teamCodes);
  let teams: Array<{id:string;code:string}> = [];
  if (teamCodes.length) {
    const { data, error } = await service.from("teams").select("id,code").in("code", teamCodes);
    if (error) throw error;
    teams = (data || []) as Array<{id:string;code:string}>;
    const found = new Set(teams.map((t) => t.code));
    const missing = teamCodes.filter((code) => !found.has(code));
    if (missing.length) throw new Error(`unknown_teams:${missing.join(",")}`);
  }
  if (dryRun) return;

  const { data: profile } = await service.from("profiles").select("id").ilike("institutional_email", row.email).maybeSingle();
  let uid = profile?.id;
  if (!uid) {
    const { data, error } = await service.auth.admin.inviteUserByEmail(row.email.toLowerCase(), { data: { full_name: row.full_name, display_name: row.display_name || row.full_name } });
    if (error) throw error;
    uid = data.user?.id;
  }
  if (!uid) throw new Error("user_invite_failed");
  const { error: profileError } = await service.from("profiles").upsert({
    id: uid, full_name: row.full_name, display_name: row.display_name || row.full_name,
    institutional_email: row.email.toLowerCase(), department_id: dept, position_id: pos,
    phone: row.phone || null, is_active: bool(row.is_active, true),
  });
  if (profileError) throw profileError;
  await service.from("user_roles").delete().eq("profile_id", uid);
  const { error: roleError } = await service.from("user_roles").insert({ profile_id: uid, role_id: role.id, scope_type: "global", scope_id: null, granted_by: actorId });
  if (roleError) throw roleError;
  await service.from("team_members").delete().eq("profile_id", uid);
  if (teams.length) {
    const { error: teamError } = await service.from("team_members").insert(teams.map((t) => ({ team_id: t.id, profile_id: uid, member_role: "member", is_active: true })));
    if (teamError) throw teamError;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  let jobId: string | null = null;
  try {
    const caller = await authenticatedSuperAdmin(req);
    const form = await req.formData();
    const file = form.get("file");
    const entity = String(form.get("entity") || "");
    const dryRun = String(form.get("dry_run") ?? "true").toLowerCase() !== "false";
    if (!(file instanceof File)) return json({ error: "csv_file_required" }, 400);
    if (!entity) return json({ error: "entity_required" }, 400);
    if (!file.name.toLowerCase().endsWith(".csv")) return json({ error: "csv_only" }, 400);

    const { data: template, error: templateError } = await service.from("import_templates").select("*").eq("entity_code", entity).eq("is_active", true).maybeSingle();
    if (templateError) throw templateError;
    if (!template) return json({ error: "unknown_import_entity" }, 400);

    const text = await file.text();
    const { headers, rows } = parseCsv(text);
    const missing = (template.required_headers || []).filter((h: string) => !headers.includes(h));
    if (missing.length) return json({ error: "missing_headers", missing }, 400);
    if (rows.length > template.max_rows_per_job) return json({ error: "too_many_rows", max_rows: template.max_rows_per_job }, 400);

    const created = await service.from("data_import_jobs").insert({
      entity_code: entity, source_file_name: file.name, source_file_size: file.size,
      status: "running", dry_run: dryRun, uploaded_by: caller.id, total_rows: rows.length, started_at: new Date().toISOString(),
    }).select("id").single();
    if (created.error) throw created.error;
    jobId = created.data.id;

    let success = 0;
    const errors: Array<{ row_number: number; error_code: string; message: string; row_data: CsvRow }> = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        if (entity === "departments") await applyDepartment(row, dryRun);
        else if (entity === "institutional_emails") await applyEmail(row, dryRun);
        else if (entity === "assets") await applyAsset(row, dryRun);
        else if (entity === "users") await applyUser(row, caller.id, dryRun);
        else throw new Error("unsupported_entity");
        success++;
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        errors.push({ row_number: i + 2, error_code: message.split(":")[0], message, row_data: scrub(row) });
      }
    }
    if (errors.length) await service.from("data_import_errors").insert(errors.map((e) => ({ ...e, job_id: jobId })));
    const status = errors.length ? (success ? "completed_with_errors" : "failed") : "completed";
    await service.from("data_import_jobs").update({
      status, processed_rows: rows.length, success_rows: success, failed_rows: errors.length,
      summary: { dry_run: dryRun, headers, entity }, completed_at: new Date().toISOString(),
    }).eq("id", jobId);
    await service.from("audit_events").insert({ actor_id: caller.id, entity_type: "data_import_job", entity_id: jobId, action: dryRun ? "csv_validated" : "csv_imported", new_data: { entity, total_rows: rows.length, success_rows: success, failed_rows: errors.length }, context: { source: "edge:bulk-import" } });
    return json({ ok: errors.length === 0, job_id: jobId, status, dry_run: dryRun, total_rows: rows.length, success_rows: success, failed_rows: errors.length, errors: errors.slice(0, 100) });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (jobId) await service.from("data_import_jobs").update({ status: "failed", summary: { error: message }, completed_at: new Date().toISOString() }).eq("id", jobId);
    const status = ["missing_token", "invalid_token", "super_admin_required"].includes(message) ? 401 : 400;
    return json({ error: message, job_id: jobId }, status);
  }
});
