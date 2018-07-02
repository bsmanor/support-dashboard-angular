import { Agent } from './../models/agent';
import { MessagingService } from './../services/messaging.service';
import { ChatStatsService } from './../services/chat-stats.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgentsService } from '../services/agents.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  message;

  constructor(
    private agentsService: AgentsService,
    private chatStatsService: ChatStatsService,
    private msgService: MessagingService
  ) {
    this.agentsService.getGlobalUser();
  }

  verifyGlobalUser = () => {
    if (this.agentsService.user === undefined) {
      this.agentsService.getGlobalUser();
    }
  }


  getAgents = () => {
    const agentsRef = this.agentsService.getAgents();
    agentsRef.subscribe(agent => {
      console.log(agent.keys);
    });
  }

  // This functions checks if a user is logged in.
  // If a user is logged in, it'll send it's email to the agentsService "user" setter,
  // which will set the current user as the global user variable (acceable via the agentsService)

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    console.log(this.message);
  }

  ngAfterViewInit() {
  }

}
