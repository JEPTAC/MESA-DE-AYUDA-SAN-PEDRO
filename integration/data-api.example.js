// Base de integración para @supabase/supabase-js v2.
// Este archivo reemplaza progresivamente arrays simulados/localStorage.

export function createMesaApi(supabase) {
  return {
    async getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },

    async getMyProfile() {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      const uid = authData.user?.id;
      if (!uid) return null;
      const { data, error } = await supabase.from('profiles').select('*').eq('id', uid).single();
      if (error) throw error;
      return data;
    },

    async getServiceCatalog() {
      const { data, error } = await supabase
        .from('services')
        .select(`
          id, code, name, description, service_type, routing_mode,
          requires_approval, requires_schedule, allows_requester_assignee_choice,
          icon, color,
          service_categories(id,code,name,icon,color),
          service_forms!service_forms_service_id_fkey(
            id,version,name,is_published,
            service_fields(
              id,field_key,label,field_type,placeholder,help_text,is_required,sort_order,validation,
              service_field_options(id,value,label,sort_order)
            )
          )
        `)
        .eq('is_active', true)
        .eq('is_published', true);
      if (error) throw error;
      return data;
    },

    async createTicket({ serviceCode, subject, description, priority = 'medium', fields = {}, departmentId = null }) {
      const { data, error } = await supabase.rpc('create_ticket', {
        p_service_code: serviceCode,
        p_subject: subject,
        p_description: description,
        p_priority: priority,
        p_field_values: fields,
        p_department_id: departmentId
      });
      if (error) throw error;
      return data;
    },

    async getMyTickets() {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *, services(id,code,name,icon,color),
          ticket_sla_instances(*, sla_targets(metric,target_minutes)),
          reservations(id,start_at,end_at,status,profile_id)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    async getTicket(ticketId) {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *, services(*), ticket_field_values(*), ticket_messages(*),
          ticket_attachments(*), ticket_status_history(*), ticket_tags(*,tags(*)),
          ticket_sla_instances(*,sla_targets(*)), reservations(*), ticket_assets(*,assets(*))
        `)
        .eq('id', ticketId)
        .single();
      if (error) throw error;
      return data;
    },

    async addMessage(ticketId, body, visibility = 'public') {
      const { data, error } = await supabase.rpc('add_ticket_message', {
        p_ticket_id: ticketId,
        p_body: body,
        p_visibility: visibility
      });
      if (error) throw error;
      return data;
    },

    async assignTicket(ticketId, assigneeId, teamId = null, reason = {}) {
      const { error } = await supabase.rpc('assign_ticket', {
        p_ticket_id: ticketId,
        p_assignee_id: assigneeId,
        p_team_id: teamId,
        p_method: 'manual',
        p_reason: reason
      });
      if (error) throw error;
    },

    async transitionTicket(ticketId, status, reason = null) {
      const { error } = await supabase.rpc('transition_ticket', {
        p_ticket_id: ticketId,
        p_new_status: status,
        p_reason: reason
      });
      if (error) throw error;
    },

    async getAssigneeSuggestions(serviceId, startAt = null, endAt = null, limit = 5) {
      const { data, error } = await supabase.rpc('get_assignee_suggestions', {
        p_service_id: serviceId,
        p_start_at: startAt,
        p_end_at: endAt,
        p_limit: limit
      });
      if (error) throw error;
      return data;
    },

    async reserveSlot(ticketId, profileId, startAt, endAt, title = null, location = null) {
      const { data, error } = await supabase.rpc('reserve_ticket_slot', {
        p_ticket_id: ticketId,
        p_profile_id: profileId,
        p_start_at: startAt,
        p_end_at: endAt,
        p_title: title,
        p_location: location
      });
      if (error) throw error;
      return data;
    },

    subscribeToTicket(ticketId, callback) {
      return supabase
        .channel(`ticket:${ticketId}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets', filter: `id=eq.${ticketId}` }, callback)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'ticket_messages', filter: `ticket_id=eq.${ticketId}` }, callback)
        .subscribe();
    },

    subscribeToMyNotifications(profileId, callback) {
      return supabase
        .channel(`notifications:${profileId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `profile_id=eq.${profileId}` }, callback)
        .subscribe();
    }
  };
}
