import { Agent } from './agent';
export interface Callback {
  username: string;
  networkId: string;
  dateTime: string;
  assignee: string;
  description: string;
  agent?: Agent;
  ticketId: string;
  zendeskLink: string;
  status: string;
  statusMessage: string;
  email: string;
  phone: string;
  skype: string;
  issueSummary: string;
}
