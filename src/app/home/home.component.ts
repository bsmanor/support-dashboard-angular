import { ReceivedCloudMessaging } from './../models/received-cloud-messaging';
import { SnackbarComponent } from './../snackbar/snackbar.component';
import { NotificationMessage } from './../models/notification-message';
import { Agent } from './../models/agent';
import { MessagingService } from './../services/messaging.service';
import { ChatStatsService } from './../services/chat-stats.service';
import { Component, OnInit } from '@angular/core';
import { AgentsService } from '../services/agents.service';
import * as firebase from 'firebase';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message;

  constructor(
    private snackBar: MatSnackBar,
    private agentsService: AgentsService,
    private chatStatsService: ChatStatsService,
    private msgService: MessagingService
  ) {
    this.agentsService.getGlobalUser();
  }

  sendMessage() {
    console.log('clicked');
    const message: NotificationMessage = {
      title: 'Test Message',
      body: 'This is the notification body',
      icon: 'https://firebasestorage.googleapis.com/v0/b/hasoffers-support-dashboard.appspot.com/o/images%2FiconCallback.png?alt=media&token=7018b32c-0000-4cec-894c-0b6185b47b5c',
      topic: 'callbacks'
    };
    this.msgService.sendMessage(message);
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

  openSnackBar(message) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 10000,
      data: message
    })
  }

  // This functions checks if a user is logged in.
  // If a user is logged in, it'll send it's email to the agentsService "user" setter,
  // which will set the current user as the global user variable (acceable via the agentsService)

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    this.msgService.currentMessage.subscribe((message: ReceivedCloudMessaging) => {
      if (message) {
        this.openSnackBar(message.notification.title);
      }
    });
  }


}
