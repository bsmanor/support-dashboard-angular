export interface AgentsStatus {
  name: string;
  permission: string;
  avatar: string;
  login: string;
  is_bot: boolean;
  group_ids?: (number | null)[] | null;
  status: string;
}
