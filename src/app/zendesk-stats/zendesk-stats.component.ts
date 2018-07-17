import { WebhooksListenersService } from './../services/webhooks-listeners.service';
import { AgentsService } from './../services/agents.service';
import { Component, OnInit } from '@angular/core';
import { Agent } from '../models/agent';

@Component({
  selector: 'app-zendesk-stats',
  templateUrl: './zendesk-stats.component.html',
  styleUrls: ['./zendesk-stats.component.css']
})
export class ZendeskStatsComponent implements OnInit {

  openTickets;
  newTickets;
  pendingTickets;
  userOpenTickets;

  constructor(
    private agentsService: AgentsService,
    private webhooksListenersService: WebhooksListenersService
  ) { }

  getZendeskTicketsStats()  {
    const group = 25906657; // HO Suport Zendesk Group ID
    let assignee: string;
    this.agentsService.user.then(user => {
      assignee = user.email;
      fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${group}&status=open`)
      .then(res => { return res.json() } )
      .then(res => { this.openTickets = res.response; });
      // Get new tickets
      fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${group}&status=new`)
      .then(res => { return res.json() } )
      .then(res => { this.newTickets = res.response; });
      // Get user's open tickets
      fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${group}&status=open&assignee=${assignee}`)
      .then(res => { return res.json() } )
      .then(res => { this.userOpenTickets = res.response; });
      // Get user's pending tickets
      fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${group}&status=pending&assignee=${assignee}`)
      .then(res => { return res.json() } )
      .then(res => { this.pendingTickets = res.response; });
    })
  }

  ngOnInit() {
    this.getZendeskTicketsStats();
    this.webhooksListenersService.zendeskEvents().subscribe(event => {
      this.getZendeskTicketsStats();
    })
  }

}
