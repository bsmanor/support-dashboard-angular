import { Component, OnInit } from '@angular/core';
import { ChatStatsService } from './../services/chat-stats.service';
import { LiveChatVisitors } from './../models/live-chat-visitors';
import { WebhooksListenersService } from './../services/webhooks-listeners.service';

interface Queued {
  response: {}[];
}

@Component({
  selector: 'app-chats-queued',
  templateUrl: './chats-queued.component.html',
  styleUrls: ['./chats-queued.component.css']
})
export class ChatsQueuedComponent implements OnInit {

  queued: any;

  constructor(
    private chatStatsService: ChatStatsService,
    private webhooksListenersService: WebhooksListenersService,
  ) { }

  subscribeToLivechatEvents() {
    this.webhooksListenersService.livechatEvents().subscribe((res) => {
      let event = res.event;
      this.getLiveChatQueuedVisitors();
    })
  }

  getLiveChatQueuedVisitors() {
    this.chatStatsService.getLiveChatQueuedVisitors().subscribe((res: Queued) => {
      this.queued = res.response.length;
    })
  }

  ngOnInit() {
    this.getLiveChatQueuedVisitors();
    this.subscribeToLivechatEvents();
  }
}
