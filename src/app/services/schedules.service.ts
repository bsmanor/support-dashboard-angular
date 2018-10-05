import { Agent } from './../models/agent';
import { AgentsService } from './agents.service';
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
import { DateAdapter } from '@angular/material';
import * as moment from 'moment';

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

  get callbacSchedulekStartDate(): string {
    const date = `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`;
    return moment(date).format('X');
  }

  private chatsRef: AngularFirestoreCollection<ChatSchedule>;
  chats: Observable<ChatSchedule[]>;
  getDailyChat: Function;

  private callbacksRef: AngularFirestoreCollection<Callback>;
  callbacks: Observable<Callback[]>;

  private futureCallbacksRef: AngularFirestoreCollection<Callback>;
  futureCallbacks: Observable<Callback[]>;

  constructor(
    private agentsService: AgentsService,
    private afs: AngularFirestore,
    private http: HttpClient
  ) {
    this.chatsRef = afs.collection<ChatSchedule>('chats');
    this.chats = this.chatsRef.valueChanges();

    this.callbacksRef = afs.collection<Callback>('callbacks', ref => ref.orderBy('dateTimeUnixTimestamp'));
    this.callbacks = this.callbacksRef.valueChanges();

    this.futureCallbacksRef = afs.collection<Callback>('callbacks',
      ref => ref.where('dateTimeUnixTimestamp', '>=', this.callbacSchedulekStartDate)
                .orderBy('dateTimeUnixTimestamp')
    );
    this.futureCallbacks = this.futureCallbacksRef.valueChanges();
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

  getFutureCallbacks() {
    return this.futureCallbacks;
  }

  updateCallback = (id, property, value) => {
    this.callbacksRef.doc(id).update({[property]: value})
    .then(res => {
      console.log(`callback marked as ${status}`);
    })
    .catch(err => {
      return err;
    });
  }

  deleteCallback = (id) => {
    this.afs.doc(`callbacks/${id}`).delete()
    .then(res => {
      return 'success';
    })
    .catch(err => {
      return err;
    });
  }

  updateHours() {
    // this.afs.collection('callbacks').valueChanges().subscribe((snap: Callback[]) => {
    //   for (let callback of snap) {
    //     this.afs.doc(`callbacks/${callback.ticketId}`).update({dateTimeUnixTimestamp: moment(callback.dateTimeUnixTimestamp).subtract(4, 'hours').format('X')})
    //   }
    // })
  }

  zendeskAssignAgentToTicket(agent: Agent, ticketId) {
    // 1. Send a get request to cloud functions that will send an API request to Zendesl API for assigning the ticket ID to the agent's email 
    this.http.get(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskAssignAgentToTicket/?assignee_email=${agent.email}&ticketId=${ticketId}`);
    // 2. Update DB. Set add the agent pbject and assignee email to the callback Ref.
    this.callbacksRef.doc(ticketId).update({
      agent: agent,
      assignee: agent.email
    });
  }
}
