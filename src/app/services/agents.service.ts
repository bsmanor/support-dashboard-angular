import { Agent } from './../models/agent';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AgentsService {
  private agentsRef: AngularFirestoreCollection<Agent>;
  agents: Observable<Agent[]>;
  private agentRef: AngularFirestoreDocument<Agent>;
  agent: Observable<Agent>;
  
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) 
  {
    this.agentsRef = afs.collection<Agent>('agents');
    this.agents = this.agentsRef.valueChanges();
  }

  getAgents = () => {
    return this.agents;
  }

  getAgent = (id): Observable<Agent> => {
    let agentRef: AngularFirestoreDocument<Agent> = this.afs.doc<Agent>(`agents/${id}`);
    let agent: Observable<Agent> = agentRef.valueChanges();
    return agent; 

    // let agent: Agent;
    // let agentRef = this.afs.doc(`agents/${id}`);
    // return agentRef.valueChanges();
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
    })
  }

  updateAgentData(id, property, val) {
    //this.afs.doc(`agents/${id}/${property}`).update(data);
    const data = {[property]: val} 
    let sender;
    this.afs.doc(`agents/${id}/`).update(data)
    .then( () => {
      sender = this.afs.doc(`agents/${id}/`).valueChanges()
    })
    return sender;
  }

}
