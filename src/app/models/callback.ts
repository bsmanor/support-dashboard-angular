import { Agent } from './agent';
export interface Callback {
  username: string;
  networkId: string;
  date: string;
  time: string;
  assignee: string;
  agent?: Agent;
  ticketId: number;
  zendeskLink: string;
  status: string;
  statusMessage: string;
}
