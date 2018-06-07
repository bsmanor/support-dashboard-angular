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
    });
  }

  openAddCallbackDialog() {
    const dialogRef = this.dialog.open(SettingsCallbacksComponent, {
      width: '500px'
    });
  }

  getCallbacks() {
    this.schedulesService.getUpcomingCallbacks(this.today, 3).subscribe(res => {
      this.upcomingCallbacks = res;
      for(let callback of this.upcomingCallbacks) {
        this.agentsService.getAgent(callback.assignee).subscribe(agent => {
          callback.agent = agent;
        });
      }
    });

    this.schedulesService.getAllCallbacks().subscribe(res => {
      this.allCallbacks = res;
      for(let callback of this.allCallbacks) {
        this.agentsService.getAgent(callback.assignee).subscribe(agent => {
          callback.agent = agent;
        });
        let hour: string;
        // checks if the hour is am or pm and setting the hour variable acordingly
        if(callback.dateTime.indexOf('pm') === -1) {
          callback.hour = callback.dateTime.slice(0, callback.dateTime.indexOf('am'))
        } else {
          callback.hour = callback.dateTime.slice(0, callback.dateTime.indexOf('pm'))
          callback.hour = `${parseInt(callback.hour.slice(0,2)) + 12}${callback.hour.slice(2,5)}`;         
          //console.log(callback.hour);
          
        }
        
        // Creating a unix timestamp of the scheduled callback date
        let date = moment(`${callback.dateTime.slice(callback.dateTime.indexOf(',') + 2 - callback.dateTime.length)}, ${callback.hour}`).format('X');
        //let unix = moment(date).unix()
        console.log(date)
        //console.log(unix);
        
        callback.dateTimeUnixTimestamp = `${moment(callback.dateTime).format('MMM')} ${moment(callback.dateTime).format('D')}`;
      }
    });
  }

  subscribeToZendeskCallbackEvents() {
    this.webhooksListenersService.zendeskEvent.subscribe((snap) => {
      console.log('Zendesk event occurred');
    });
  }

  ngOnInit() {
    this.getCallbacks();
    console.log(this.allCallbacks);
  }

}
