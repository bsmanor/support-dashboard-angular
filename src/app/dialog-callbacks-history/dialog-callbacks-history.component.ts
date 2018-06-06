import { AgentsService } from './../services/agents.service';
import { Callback } from './../models/callback';
import { SchedulesService } from './../services/schedules.service';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-callbacks-history',
  templateUrl: './dialog-callbacks-history.component.html',
  styleUrls: ['./dialog-callbacks-history.component.css']
})
export class DialogCallbacksHistoryComponent implements OnInit {

  callbacks: Callback[];

  constructor(
    private schedulesService: SchedulesService,
    private agentsService: AgentsService,
    public dialogRef: MatDialogRef<DialogCallbacksHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.schedulesService.getAllCallbacks().subscribe(callbacks => {
      console.log(callbacks);
      this.callbacks = callbacks;
      for(let callback of this.callbacks){
        this.agentsService.getAgent(callback.assignee).subscribe(agent => {
          callback.agent = agent;
        });
        callback.dateTime = `${moment(callback.dateTime).format('MMM')} ${moment(callback.dateTime).format('D')}`;
      }
    });
  }

}
