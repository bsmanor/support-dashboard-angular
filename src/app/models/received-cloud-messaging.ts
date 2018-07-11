export interface ReceivedCloudMessaging {
  from: string;
  notification: Notification;
}

interface Notification {
  title: string;
  body: string;
  icon: string;
}