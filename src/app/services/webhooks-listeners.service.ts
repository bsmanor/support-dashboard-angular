import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

interface LivechatEvent {
  event: number;
}

@Injectable()
export class WebhooksListenersService {

  private livechatWebhookRef: AngularFirestoreDocument<LivechatEvent>;
  livechatEvent: Observable<LivechatEvent>;

  constructor(private afs: AngularFirestore) {
    this.livechatWebhookRef = afs.doc<LivechatEvent>('webhooks/livechat');
    this.livechatEvent = this.livechatWebhookRef.valueChanges();
  }

  livechatEvents() {
    return this.livechatEvent;
  }

}
