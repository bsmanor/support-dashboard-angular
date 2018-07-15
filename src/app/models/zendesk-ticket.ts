export interface ZendeskTicket {
  results?: (ResultsEntity)[] | null;
  facets?: null;
  next_page?: null;
  previous_page?: null;
  count: number;
}
export interface ResultsEntity {
  url: string;
  id: number;
  external_id?: null;
  via: Via;
  created_at: string;
  updated_at: string;
  type: string;
  subject: string;
  raw_subject: string;
  description: string;
  priority?: string | null;
  status: string;
  recipient?: string | null;
  requester_id: number;
  submitter_id: number;
  assignee_id?: number | null;
  organization_id?: number | null;
  group_id: number;
  collaborator_ids?: (number | null)[] | null;
  follower_ids?: (number | null)[] | null;
  email_cc_ids?: (null)[] | null;
  forum_topic_id?: null;
  problem_id?: null;
  has_incidents: boolean;
  is_public: boolean;
  due_at?: null;
  tags?: (string)[] | null;
  custom_fields?: (CustomFieldsEntity)[] | null;
  satisfaction_rating: SatisfactionRating;
  sharing_agreement_ids?: (null)[] | null;
  fields?: (FieldsEntity)[] | null;
  followup_ids?: (null)[] | null;
  brand_id: number;
  allow_channelback: boolean;
  allow_attachments: boolean;
  result_type: string;
}
export interface Via {
  channel: string;
  source: Source;
}
export interface Source {
  from: FromOrTo;
  to: FromOrTo;
  rel?: string | null;
}
export interface FromOrTo {
  address?: string | null;
  name?: string | null;
  formatted_phone?: string | null;
  phone?: string | null;
}
export interface CustomFieldsEntity {
  id: number;
  value?: boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string;
}
export interface SatisfactionRating {
  score: string;
}
export interface FieldsEntity {
  id: number;
  value?: boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string | boolean | string;
}
