import { Agent } from './../models/agent';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AgentsService {

  private _user: Agent;
  get user(): Agent {
    return this._user;
  }
  set user(user: Agent) {
    this._user = user;
  }
  get userId(): string {
    return this._user.id;
  }

  private agentsRef: AngularFirestoreCollection<Agent>;
  agents: Observable<Agent[]>;
  private agentRef: AngularFirestoreDocument<Agent>;
  agent: Observable<Agent>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.setGlobalUser();
    this.agentsRef = afs.collection<Agent>('agents');
    this.agents = this.agentsRef.valueChanges();
  }

  setGlobalUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged( (user) => {
        if (user) {
          this.getAgentByEmail(user.email)
          .then((agent: Agent) => {
            this.user = agent;
            resolve(this.user);
          })
          .catch(err => {
            console.log(err);
          });
        }
      });
    });
  }

  verifyGlobalUser() {
    return new Promise((resolve, reject) => {
      if (this.user !== undefined) {
        console.log(this.user);
        resolve(this.user);
      } else {
        console.log('Wating for user to be set');
        setTimeout(() => {
          this.verifyGlobalUser();
        }, 1000);
      }
    });
  }

  getAgents = () => {
    return this.agents;
  }

  getAgentById = (id): Observable<Agent> => {
    const agentRef: AngularFirestoreDocument<Agent> = this.afs.doc<Agent>(`agents/${id}`);
    const agent: Observable<Agent> = agentRef.valueChanges();
    return agent;
  }
  getAgentByEmail = (email) => {
    return new Promise((resolve, reject) => {
      this.getAgents().subscribe(agents => {
        let isFound = false;
        for (const agent of agents) {
          if (agent.email === email) {
            isFound = true;
            resolve(agent);
          }
        }
        if (!isFound) {
          reject(`No matching users were found with address: ${email}`);
        }
      });
    });
  }


  addAgent(agent: Agent) {
    this.afs.collection<Agent>(`agents`).doc(agent.id).set({
      email: agent.email,
      family_name: agent.family_name,
      given_name: agent.given_name,
      id: agent.id,
      locale: agent.locale,
      name: agent.name,
      picture: agent.picture
    });
  }

  updateAgentData(id, property, val) {
    const data = {[property]: val};
    this.afs.doc(`agents/${id}/`).update(data);
    return this.afs.doc(`agents/${id}/`).valueChanges();
  }

}
