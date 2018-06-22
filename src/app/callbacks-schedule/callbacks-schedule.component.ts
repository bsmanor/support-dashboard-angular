import { WebhooksListenersService } from './../services/webhooks-listeners.service';
import { SettingsCallbacksComponent } from './../settings-callbacks/settings-callbacks.component';
import { Agent } from './../models/agent';
import { AgentsService } from './../services/agents.service';
import { Callback } from './../models/callback';
import { SchedulesService } from './../services/schedules.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogCallbacksHistoryComponent } from './../dialog-callbacks-history/dialog-callbacks-history.component';

@Component({
  selector: 'app-callbacks-schedule',
  templateUrl: './callbacks-schedule.component.html',
  styleUrls: ['./callbacks-schedule.component.css']
})
export class CallbacksScheduleComponent implements OnInit {

  allCallbacks: Callback[];
  upcomingCallbacks: Callback[];
  today = `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`.toString();
  agents: Agent[] = [];

  constructor(
    private schedulesService: SchedulesService,
    private agentsService: AgentsService,
    private webhooksListenersService: WebhooksListenersService,
    public dialog: MatDialog
  ) {}


  hovered(listItem) {
    console.log(listItem);
  }
  updateCallback = (id, action) => {
    this.schedulesService.updateCallback(id, action);
  }

  deleteCallback = (id) => {
    this.schedulesService.deleteCallback(id);
  }

  openCallabckHistoryDialog() {
    const dialogRef = this.dialog.open(DialogCallbacksHistoryComponent, {
      width: '500px',
      data: {allCallbacks: this.allCallbacks}
    });
  }

  openAddCallbackDialog() {
    const dialogRef = this.dialog.open(SettingsCallbacksComponent, {
      width: '500px'
    });
  }

  getCallbacks() {
    // this.schedulesService.getUpcomingCallbacks(this.today, 3).subscribe(res => {
    //   this.upcomingCallbacks = res;
    //   for(let callback of this.upcomingCallbacks) {
    //     this.agentsService.getAgent(callback.assignee).subscribe(agent => {
    //       callback.agent = agent;
    //     });
    //   }
    // });

    this.schedulesService.getAllCallbacks().subscribe(res => {
      this.allCallbacks = res;
      for(let callback of this.allCallbacks) {
        this.agentsService.getAgent(callback.assignee).subscribe(agent => {
          callback.agent = agent;
        });
      }
    });
  }

  assignAgentToCallback(agent: Agent, ticketId: string) {
    this.schedulesService.zendeskAssignAgentToTicket(agent.email, ticketId);
  }

  ngOnInit() {
    this.getCallbacks();
    this.agentsService.getAgents().subscribe(snap => {
      for(let agent of snap) {
        this.agents.push(agent)
      }
    })
  }

}
