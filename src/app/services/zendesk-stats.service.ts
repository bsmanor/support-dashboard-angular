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

  
  constructor(
    private agentsService: AgentsService,
    private webhooksListenersService: WebhooksListenersService
  ) {}
}
