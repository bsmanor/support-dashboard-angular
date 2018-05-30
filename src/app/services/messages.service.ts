import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

interface Messages {
  message: string;
  createdBy: string;
}

@Injectable()
export class MessagesService {

  private messagesRef: AngularFirestoreCollection<Messages>;
  messages: Observable<Messages[]>

  constructor(private afs:AngularFirestore) {
    this.messagesRef = this.afs.collection<Messages>('messages');
    this.messages = this.messagesRef.valueChanges();
  }

  getMessages() {
    return this.messages;
  }

  setNoChatsMessage(message) {
    this.messagesRef.doc('noChats').set(message);
  }

}
