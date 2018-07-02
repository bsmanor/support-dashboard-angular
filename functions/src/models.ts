export interface CallbackTicket {
  url: string;
  id: string;
  description: string;
  title: string;
}

export interface NotificationMessage {
  notification: Message;
}

export interface Message {
  title: string;
  body: string;
  icon: string;
}