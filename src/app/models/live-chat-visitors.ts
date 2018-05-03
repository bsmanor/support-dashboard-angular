export interface LiveChatVisitors {
  response: Data[];
};

export interface Data {
  browser: string;
  group: number;
  visit_path?: (VisitPathEntity)[] | null;
  page_title: string;
  page_address: string;
  invitation: string;
  chat: Chat;
  page_views: number;
  host: string;
  id: string;
  ip: string;
  language: string;
  last_visit: string;
  page_time: string;
  queue_start_time: number;
  referrer: string;
  state: string;
  custom_variables: string;
  visits: number;
  chats: number;
  latitude: string;
  longitude: string;
  country: string;
  country_code: string;
  region: string;
  city: string;
  timezone: string;
  page_current: string;
  chat_id: string;
  chat_start_time: string;
  chat_start_time_ts: number;
  greetings_accepted: number;
  greetings_all: number;
  greetings_refused: number;
  name: string;
  page_entered_ts: number;
  page_time_ts: number;
  last_visit_ts: number;
  page_entered: string;
  operators?: (AgentsEntityOrOperatorsEntity)[] | null;
  prechat_survey?: (null)[] | null;
};
export interface VisitPathEntity {
  page: string;
  title: string;
  invitation: string;
  time: string;
  time_ref: number;
  time_ts: number;
}
export interface Chat {
  id: string;
  chat_room: number;
  start_time: number;
  agents?: (AgentsEntityOrOperatorsEntity)[] | null;
};
export interface AgentsEntityOrOperatorsEntity {
  id: string;
  display_name: string;
};
