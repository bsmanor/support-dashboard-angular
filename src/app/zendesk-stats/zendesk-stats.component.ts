import { AgentsService } from './../services/agents.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private agentsService: AgentsService) { }

  getZendeskTicketsStats()  {
    console.log(this.agentsService.user);
    const group = 25906657; // HO Suport Zendesk Group ID
    // Get open tickets
    fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${group}&status=open`)
    .then(res => {return res.json()} )
    .then(res => { this.openTickets = res.response; });
    // Get new tickets
    fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${group}&status=new`)
    .then(res => {return res.json()} )
    .then(res => { this.newTickets = res.response; });
    // Get user's open tickets
    fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${group}&status=open`)
    .then(res => {return res.json()} )
    .then(res => { this.userOpenTickets = res.response; });
    // Get user's pending tickets
    fetch(`https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/zendeskTicketsStats/?group=${group}&status=pending`)
    .then(res => {return res.json()} )
    .then(res => { this.pendingTickets = res.response; });
  }

  ngOnInit() {
    this.getZendeskTicketsStats();
  }

}
