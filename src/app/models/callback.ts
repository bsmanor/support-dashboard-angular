import { Agent } from './agent';
export interface Callback {
  username: string;
  networkId: string;
  dateTime: string;
  dateTimeUnixTimestamp: string;
  hour?: string;
  assignee: string;
  description: string;
  agent?: Agent;
  ticketId: string;
  zendeskLink: string;
  status: string;
  statusMessage: string;
  email: string;
  contactInfo: string;
  issueSummary: string;
  emailBody?: string;
}
