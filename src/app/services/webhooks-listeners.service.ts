import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

interface LivechatEvent {
  event: number;
}

interface ZendeskEvent {
  event: number;
}

@Injectable()
export class WebhooksListenersService {

  private livechatWebhookRef: AngularFirestoreDocument<LivechatEvent>;
  livechatEvent: Observable<LivechatEvent>;

  private zendeskWebhookRef: AngularFirestoreDocument<ZendeskEvent>;
  zendeskEvent: Observable<ZendeskEvent>;

  constructor(private afs: AngularFirestore) {
    this.livechatWebhookRef = afs.doc<LivechatEvent>('webhooks/livechat');
    this.livechatEvent = this.livechatWebhookRef.valueChanges();
    this.zendeskWebhookRef = afs.doc<ZendeskEvent>('webhooks/zendesk');
    this.zendeskEvent = this.zendeskWebhookRef.valueChanges();
  }

  livechatEvents() {
    return this.livechatEvent;
  };

  zendeskEvents() {
    return this.zendeskEvent;
  }

}
