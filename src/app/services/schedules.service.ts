
import {map} from 'rxjs/operators';
import { Callback } from './../models/callback';
import { Element } from './../chat-schedule/chat-schedule.component';
import { ChatSchedule } from './../models/chat-schedule';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

interface Date {
  year: string;
  week: string;
  dayOfYear: string;
}

interface Item {
  content: string;
}

@Injectable()
export class SchedulesService {

  private chatsRef: AngularFirestoreCollection<ChatSchedule>;
  chats: Observable<ChatSchedule[]>;
  getDailyChat: Function;

  private callbacksRef: AngularFirestoreCollection<Callback>;
  callbacks: Observable<Callback[]>;
  CallbacksMeta: Observable<DocumentChangeAction[]>;

  constructor( private afs: AngularFirestore ) {

    this.chatsRef = afs.collection<ChatSchedule>('chats');
    this.chats = this.chatsRef.valueChanges();

    this.callbacksRef = afs.collection<Callback>('callbacks');
    this.callbacks = this.callbacksRef.valueChanges();
    this.CallbacksMeta = this.callbacksRef.snapshotChanges();
  }

  setChatSchedule(chat:ChatSchedule) {
    this.chatsRef.doc(`${chat.year.toString()}/${chat.weekOfYear.toString()}/${chat.dayOfYear.toString()}`).set({content:JSON.stringify(chat.tableContent)})
    .then(() => {console.log('chat uploaded successfully')})
    .catch((err) => {
      console.log(err)
    })
  }

  getDailyChatSchedule = (date: Date) => {
    let dailyChat = this.afs.doc(`chats/${date.year}/${date.week}/${date.dayOfYear}`);
    return dailyChat.valueChanges();
  }

  setCallback = (callback:Callback) => {
    this.callbacksRef.add(callback)
    .then(() => {{console.log('callback uploaded successfully')}})
    .catch((err) => {console.log(err)})
  };

  getCallbacksMeta() {
    return this.CallbacksMeta.pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Callback;
        const id = a.payload.doc.id;
        return { id, ...data };
      }).filter(callback => {return callback.status === 'Pending'})
    }))
  };

  getAllCallbacks() {
    return this.callbacks;
  }

  getUpcomingCallbacks = (date:string, limit:number) => {
    return this.afs.collection<Callback>('callbacks', ref => ref.where('date', '==', date)).valueChanges();
  }

  updateCallback = (id, action) => {
    this.afs.doc(`callbacks/${id}`).update({status: action});
  }
  deleteCallback = (id) => {
    this.afs.doc(`callbacks/${id}`).delete();
  }
}
