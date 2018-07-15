export interface CallbackTicket {
  url: string;
  id: string;
  description: string;
  title: string;
}

export interface NotificationMessage {
  title: string;
  body: string;
  icon: string;
  topic?: string;
  agent?: string;
}


