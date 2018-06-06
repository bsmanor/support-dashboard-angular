import { Callback } from './../models/callback';
import { SchedulesService } from './../services/schedules.service';
import { AgentsService } from './../services/agents.service';
import { Agent } from './../models/agent';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-settings-callbacks',
  templateUrl: './settings-callbacks.component.html',
  styleUrls: ['./settings-callbacks.component.css']
})
export class SettingsCallbacksComponent implements OnInit {

  callback: Callback;
  agents: Agent[];

  constructor(
    private agentsService: AgentsService,
    private schedulesService: SchedulesService
  ) {
    agentsService.getAgents().subscribe(agentsRef => {
      this.agents = agentsRef;
    })
  }

  // saveCallback(username, networkId, date, time, assignee, ticketId) {
  //   console.log(username, networkId, date, time, assignee, ticketId);
  //   const callback: Callback = {
  //     username: username,
  //     networkId: networkId,
  //     dateTime: date,
  //     description: null,
  //     assignee: assignee,
  //     ticketId: ticketId,
  //     zendeskLink: `https://tune.zendesk.com/agent/tickets/${ticketId}`,
  //     status: 'Pending',
  //     statusMessage: 'No updates on this one'
  //   };
  //   this.schedulesService.setCallback(callback);
  // };

  ngOnInit() {
  }

}
