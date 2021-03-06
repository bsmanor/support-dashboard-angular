import { FcmToken } from './../models/fcm-token';
import { NotificationMessage } from './../models/notification-message';
import { AgentsService } from './agents.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Agent } from '../models/agent';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private snackBarTrigger = new BehaviorSubject<any>('');
  snackBarTriggerRef = this.snackBarTrigger.asObservable();
  
  private fcmTokensRef: AngularFirestoreCollection<FcmToken>;
  fcmTokens: Observable<FcmToken[]>;
  
  private agentsRef: AngularFirestoreCollection<Agent>;
  agents: Observable<Agent[]>;
  
  private userRef: AngularFirestoreDocument<Agent>;
  user: Observable<Agent>;
  
  agent: Agent;
  
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  
  
  constructor(
    private agentsService: AgentsService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.agentsRef = this.afs.collection('agents');
    this.agents = this.agentsRef.valueChanges();
    this.fcmTokensRef = this.afs.collection('fcmTokens');
    this.fcmTokens = this.fcmTokensRef.valueChanges();
  }

  updateToken(token) {
    const notificationTopics = ['callbacks'];
    this.afAuth.authState.take(1).subscribe( async user => {
      if (!user) { return; }
      this.agentsService.updateAgentData(this.agent.id, 'token', token);
      this.fcmTokensRef.doc(this.agent.id).set({token: token});
      for (const topic of notificationTopics) {
        fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/subscribeToTopic/?token=${token}&topic=${topic}`);
      }
    });
  }

  async getPermission() {
    this.agent = await this.agentsService.user;
    this.messaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.');
      return this.messaging.getToken();
    })
    .then(token => {
      console.log(token);
      this.updateToken(token);
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
      // This is an additional setup for initializing snackbar message in the platform each time a new message is received.
      this.snackBarTrigger.next(payload);
    });
  }

  sendMessage(message: NotificationMessage) {
    this.afs.doc('messages/global').set({message: message})
    .then(() => {
      console.log('message updated');
    })
    .catch(err => {
      console.log(err);
    });
  }
}
