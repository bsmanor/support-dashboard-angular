import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Agent } from '../models/agent';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private mq = new BehaviorSubject<boolean>(true);
  mqRef = this.mq.asObservable();
  private desktop: MediaQueryList = window.matchMedia('(min-width:701px)');

  private userRef = new BehaviorSubject<Agent>(null);
  user = this.userRef.asObservable();

  constructor() {
    this.desktop.addListener(this.mqListener);
    this.mqListener(this.desktop);
  }

  mqListener(mediaQuery: MediaQueryList) {
    this.mq.next(mediaQuery.matches);
  }

}

