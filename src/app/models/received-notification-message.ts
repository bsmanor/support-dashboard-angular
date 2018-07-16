export interface ReceivedNotificationMessage {
    from: string;
    notification: Notification;
}

interface Notification {
    title: string;
    body: string;
    idon: string;
}
