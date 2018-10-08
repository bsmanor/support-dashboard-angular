import { Observable } from 'rxjs';
import { WebhooksListenersService } from './../services/webhooks-listeners.service';
import { SettingsCallbacksComponent } from './../settings-callbacks/settings-callbacks.component';
import { Agent } from './../models/agent';
import { AgentsService } from './../services/agents.service';
import { Callback } from './../models/callback';
import { SchedulesService } from './../services/schedules.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {MatDialog} from '@angular/material';
import { DialogCallbacksHistoryComponent } from './../dialog-callbacks-history/dialog-callbacks-history.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-callbacks-schedule',
  templateUrl: './callbacks-schedule.component.html',
  styleUrls: ['./callbacks-schedule.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'yellow', opacity: 0}),
        animate(1000)
      ])
    ])
  ]
})
export class CallbacksScheduleComponent implements OnInit {

  allCallbacks: Callback[];
  upcomingCallbacks: Callback[];
  today = `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`.toString();
  agents: Agent[];

  constructor(
    private schedulesService: SchedulesService,
    private agentsService: AgentsService,
    private webhooksListenersService: WebhooksListenersService,
    public dialog: MatDialog
  ) {
    this.agentsService.allAgents.subscribe(agents => {
      this.agents = agents;
    });
  }

  updateHours() {
    this.schedulesService.updateHours();
  }

  updateCallback = (id, property, value) => {
    this.schedulesService.updateCallback(id, property, value);
  }

  deleteCallback = (id) => {
    this.schedulesService.deleteCallback(id);
  }

  openCallabckHistoryDialog() {
    this.dialog.open(DialogCallbacksHistoryComponent, {
      width: '600px',
      height: '700px',
      data: {allCallbacks: this.allCallbacks}
    });
  }

  openAddCallbackDialog() {
    const dialogRef = this.dialog.open(SettingsCallbacksComponent, {
      width: '500px'
    });
  }

  getCallbacks() {
    this.schedulesService.getAllCallbacks().subscribe(res => {
      this.allCallbacks = res;
      for (const callback of this.allCallbacks) {
        if (callback.assignee) {
          this.agentsService.getAgentById(callback.assignee).subscribe(agent => {
            if (agent) { callback.agent = agent; }
          });
        }
      }
    });
  }

  getFutureCallbacks() {
    this.schedulesService.getFutureCallbacks().subscribe(res => {
      this.upcomingCallbacks = res;
      for (const callback of this.upcomingCallbacks) {
        callback.dateTimeUnixTimestamp = moment(callback.dateTimeUnixTimestamp, 'X').add(7, 'hours').format('X');
        if (callback.assignee !== 'Not Assigned') {
          this.agentsService.getAgentByEmail(callback.assignee).then(async (agent: Agent) => {
            callback.agent = await agent;
          });
        }
      }
    });
  }

  assignAgentToCallback(agent: Agent, ticketId: string) {
    this.schedulesService.zendeskAssignAgentToTicket(agent, ticketId);
  }

  ngOnInit() {
    this.getFutureCallbacks();
    this.getCallbacks();
  }

}
