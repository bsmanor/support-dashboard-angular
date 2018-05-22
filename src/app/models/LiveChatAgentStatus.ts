export interface LiveChatAgentStatusModel {
  response: AgentStatusResponse;
}
export interface AgentStatusResponse {
  login: string;
  name: string;
  login_status: string;
  permission: string;
  daily_summary: number;
  ticket_notifications: number;
  inactive_notifications: string;
  job_title: string;
  avatar: string;
  notifications: Notifications;
  max_chats_count: number;
  mute_all_sounds: number;
  repeat_sound_notifications: number;
  bot: number;
  timezone: string;
  design_version: number;
  groups?: (GroupsEntity)[] | null;
  status: string;
  last_logout: number;
  api_key: string;
  license_id: number;
}
export interface Notifications {
  new_visitor: number;
  returning_visitor: number;
  queued_visitor: number;
  visitor_is_typing: number;
  new_goal: number;
  incoming_chat: number;
  unassigned_chats: number;
  unassigned_chat_messages: number;
}
export interface GroupsEntity {
  id: number;
  name: string;
}