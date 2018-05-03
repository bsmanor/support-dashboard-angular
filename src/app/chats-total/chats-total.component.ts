import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ChatStatsService } from './../services/chat-stats.service';
import { ChatStats } from './../models/chat-stats';
import { WebhooksListenersService } from './../services/webhooks-listeners.service';

@Component({
  selector: 'app-chats-total',
  templateUrl: './chats-total.component.html',
  styleUrls: ['./chats-total.component.css']
})
export class ChatsTotalComponent implements OnInit {

  totalChats: number;
  showTotalsBar = false;  

  constructor(
    private chatStatsService: ChatStatsService,
    private webhooksListenersService: WebhooksListenersService
  ) {}

  subscribeToLivechatEvents() {
    this.webhooksListenersService.livechatEvents().subscribe((res) => {
      let event = res.event;
      if(event === 2) {
        this.getLiveChatDailyTotal();
      }
    })
  }
    
  getLiveChatDailyTotal() {
    let date = this.chatStatsService.yyyymmdd(new Date());
    this.chatStatsService.getLiveChatDailyTotal().subscribe((res) => {
      this.totalChats = res['response'][date].chats;
    })  
  }

  toggleShowTotalsBar() {
    this.showTotalsBar = !this.showTotalsBar;
  }
  
  ngOnInit() {
    this.getLiveChatDailyTotal();
    this.subscribeToLivechatEvents();
  }

}
