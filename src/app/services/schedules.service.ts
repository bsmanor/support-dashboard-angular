import { Callback } from './../models/callback';
import { Element } from './../chat-schedule/chat-schedule.component';
import { ChatSchedule } from './../models/chat-schedule';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import axios from 'axios';


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

  constructor( 
    private afs: AngularFirestore,
    private http: HttpClient
  ) {
    this.chatsRef = afs.collection<ChatSchedule>('chats');
    this.chats = this.chatsRef.valueChanges();

    this.callbacksRef = afs.collection<Callback>('callbacks');
    this.callbacks = this.callbacksRef.valueChanges();
  }

  // ----------      Chat Related -----------------------

  setChatSchedule(chat: ChatSchedule) {
    this.chatsRef.doc(`${chat.year.toString()}/${chat.weekOfYear.toString()}/${chat.dayOfYear.toString()}`)
    .set({content: JSON.stringify(chat.tableContent)})
      .then(() => {console.log('chat uploaded successfully');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getDailyChatSchedule = (date: Date) => {
    const dailyChat = this.afs.doc(`chats/${date.year}/${date.week}/${date.dayOfYear}`);
    return dailyChat.valueChanges();
  }

  // ---------  Callbacks Related ---------------

  setCallback = (callback: Callback) => {
    this.callbacksRef.add(callback)
    .then(() => {{console.log('callback uploaded successfully'); }})
    .catch((err) => {console.log(err); });
  }

  getAllCallbacks() {
    return this.callbacks;
  }

  getUpcomingCallbacks = (date: string, limit: number) => {
    return this.afs.collection<Callback>('callbacks', ref => ref.where('date', '==', date)).valueChanges();
  }

  updateCallback = (id, action) => {
    this.afs.doc(`callbacks/${id}`).update({status: action});
  }

  deleteCallback = (id) => {
    this.afs.doc(`callbacks/${id}`).delete()
    .then(res => {
      return 'success';
    })
    .catch(err => {
      return err;
    })
  }

  zendeskAssignAgentToTicket(assigneeEmail, ticketId) {
    this.http.get(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskAssignAgentToTicket/?assignee_email=${assigneeEmail}&ticketId=${ticketId}`).subscribe().unsubscribe();
  }
}
