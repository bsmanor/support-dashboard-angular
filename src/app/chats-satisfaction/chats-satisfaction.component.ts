import { Component, OnInit } from '@angular/core';
import { ChatStats } from './../models/chat-stats';
import { ChatStatsService } from './../services/chat-stats.service';
import { WebhooksListenersService } from './../services/webhooks-listeners.service';


@Component({
  selector: 'app-chats-satisfaction',
  templateUrl: './chats-satisfaction.component.html',
  styleUrls: ['./chats-satisfaction.component.css']
})
export class ChatsSatisfactionComponent implements OnInit {

  ratedGood: number;
  ratedBad: number;

  constructor(
    private chatStatsService: ChatStatsService,
    private webhooksListenersService: WebhooksListenersService
  ) { }

  subscribeToLivechatEvents() {
    this.webhooksListenersService.livechatEvents().subscribe((res) => {
      let event = res.event;
      if(event === 2) {
        this.getLiveChatDailyRatings();
      }
    })
  }

  getLiveChatDailyRatings() {
    this.chatStatsService.getLiveChatDailyRatings().subscribe((res) => {
      this.ratedGood = res['response'][this.chatStatsService.yyyymmdd(new Date())]['good']
      this.ratedBad = res['response'][this.chatStatsService.yyyymmdd(new Date())]['bad']      
    })
  }

  ngOnInit() {
    this.getLiveChatDailyRatings();
    this.subscribeToLivechatEvents();
  }

}
