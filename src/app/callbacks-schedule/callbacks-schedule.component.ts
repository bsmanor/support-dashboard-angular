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
    let dialogRef = this.dialog.open(DialogCallbacksHistoryComponent, {
      width: '500px',
    })
  };

  openAddCallbackDialog() {
    let dialogRef = this.dialog.open(SettingsCallbacksComponent, {
      width: '500px'
    })
  }

  getCallbacks() {
    this.schedulesService.getUpcomingCallbacks(this.today, 3).subscribe(res => {
      this.upcomingCallbacks = res;
      for(let callback of this.upcomingCallbacks){
        this.agentsService.getAgent(callback.assignee).subscribe(agent => {
          callback.agent = agent;
        })
      }
    });

    this.schedulesService.getCallbacksMeta().subscribe(res => {      
      this.allCallbacks = res;
      for(let callback of this.allCallbacks){
        this.agentsService.getAgent(callback.assignee).subscribe(agent => {
          callback.agent = agent;
        });        
        callback.date = `${moment(callback.date).format('MMM')} ${moment(callback.date).format('D')}`;
      }
    });
  }
  
  ngOnInit() {
    this.getCallbacks();
    console.log(this.allCallbacks);
  }

}
