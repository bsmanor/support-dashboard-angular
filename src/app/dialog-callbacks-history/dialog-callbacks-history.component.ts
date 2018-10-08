import { AgentsService } from './../services/agents.service';
import { Callback } from './../models/callback';
import { SchedulesService } from './../services/schedules.service';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { trigger, transition, useAnimation } from '@angular/animations';
import { flip, fadeIn, fadeOut, flipInX, bounceOutUp, bounceInUp } from 'ng-animate';
import { Observable } from 'rxjs';
import { Agent } from './../models/agent';

@Component({
  selector: 'app-dialog-callbacks-history',
  templateUrl: './dialog-callbacks-history.component.html',
  styleUrls: ['./dialog-callbacks-history.component.css'],
  animations: [
    trigger('fadeIn', [transition('void => *', useAnimation(fadeIn))]),
    trigger('fadeOut', [transition('* => void', useAnimation(fadeOut))]),
    trigger('flipInX', [transition('void => *', useAnimation(flipInX))]),
    trigger('flipInX', [transition('* => void', useAnimation(flipInX))]),
    trigger('bounceOutUp', [transition('* => void', useAnimation(bounceOutUp))]),
    trigger('bounceInUp', [transition('void => *', useAnimation(bounceInUp))]),
  ]
})
export class DialogCallbacksHistoryComponent {

  callbacks: any[];
  isEditMode = false;
  selectedCallback: Callback;
  agents: Observable<Agent[]>;

  constructor(
    private schedulesService: SchedulesService,
    private agentsService: AgentsService,
    public dialogRef: MatDialogRef<DialogCallbacksHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.agents = this.agentsService.getAgents();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  enterEditMode(callback: Callback) {
    this.agents = this.agentsService.getAgents();
    console.log(callback);
    this.selectedCallback = callback;
    this.isEditMode = true;
  }

  exitEditMode() {
    this.isEditMode = false;
  }

  updateCallback(id, property, value) {
    this.schedulesService.updateCallback(id, property, value);
  }

}
