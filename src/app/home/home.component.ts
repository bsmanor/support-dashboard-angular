import { MessagingService } from './../services/messaging.service';
import { ChatStatsService } from './../services/chat-stats.service';
import { Component, OnInit } from '@angular/core';
import { AgentsService } from '../services/agents.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message;

  constructor(
    private agentsService: AgentsService,
    private chatStatsService: ChatStatsService,
    private msgService: MessagingService
  ) { }


  getAgents = () => {
    const agentsRef = this.agentsService.getAgents();
    agentsRef.subscribe(agent => {
      console.log(agent.keys);
    });
  }

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

}
