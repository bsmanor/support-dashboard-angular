import { AgentsService } from './agents.service';
import { Injectable, OnInit } from '@angular/core';
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
export class MessagingService implements OnInit {

  private agentsRef: AngularFirestoreCollection<Agent>;
  agents: Observable<Agent[]>;
  private userRef: AngularFirestoreDocument<Agent>;
  user: Observable<Agent>;

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
  }

  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) { return; }
        this.user.subscribe(e => {
          console.log(e);
        });
      const data = { [user.uid]: token };
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
    this.agentsService.verifyGlobalUser()
    .then(() => {
      console.log('user verified');
      this.user.subscribe(res => {
        console.log(res);
      });
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
    });
  }

  receiveMessage() {
      this.messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

  ngOnInit() {
    this.userRef = this.afs.doc(`agents/${this.agentsService.user}`);
    this.user = this.userRef.valueChanges();
  }

}
