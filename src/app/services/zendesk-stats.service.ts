import { ZendeskStats } from './../models/zendesk-stats';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AgentsService } from './agents.service';
import { WebhooksListenersService } from './../services/webhooks-listeners.service';

@Injectable({
  providedIn: 'root'
})
export class ZendeskStatsService {

  get zendeskStats(): Observable<ZendeskStats> {
    return this.zendeskStatsObs
  }
  
  private zendeskStatsRef = new BehaviorSubject<ZendeskStats>(null);
  zendeskStatsObs = this.zendeskStatsRef.asObservable();
  
  HoSupportGroup = 25906657; // HO Suport Zendesk Group ID
  assignee: string;
  
  constructor(
    private agentsService: AgentsService,
    private webhooksListenersService: WebhooksListenersService
  ) {
    
    this.webhooksListenersService.zendeskEvents().subscribe(event => {
      console.log(event);
      this.getZendeskStats();
    })
  }
  
  getZendeskStats() {
    let zendeskStats: ZendeskStats = {
      teamOpens: null,
      teamNew: null,
      userOpens: null,
      userPendings: null
    }
    this.agentsService.user.then(user => {
      const assignee = user.email;
      fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${this.HoSupportGroup}&status=open`)
      .then(res => { return res.json() } )
      .then(res => { zendeskStats.teamOpens = res.response; });
      // Get new tickets
      fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${this.HoSupportGroup}&status=new`)
      .then(res => { return res.json() } )
      .then(res => { zendeskStats.teamNew = res.response; });
      // Get user's open tickets
      fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${this.HoSupportGroup}&status=open&assignee=${assignee}`)
      .then(res => { return res.json() } )
      .then(res => { zendeskStats.userOpens = res.response; });
      // Get user's pending tickets
      fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${this.HoSupportGroup}&status=pending&assignee=${assignee}`)
      .then(res => { return res.json() } )
      .then(res => { zendeskStats.userPendings = res.response;})
    })
    .then(() => {
      this.zendeskStatsRef.next(zendeskStats);
    })
  }
}
