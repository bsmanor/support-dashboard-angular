import { ChatScheduleComponent } from './../chat-schedule/chat-schedule.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class ChatStatsService {

  date: any;

  constructor(private http: HttpClient) { 
    this.date = this.yyyymmdd(new Date());
  }

  yyyymmdd = (date) => {     // Function that returns a date in a YYYY-MM-DD format
    let yyyy = moment(date).format('YYYY');
    let mm = moment(date).format('MM');
    let dd = moment(date).format('DD');
    return `${yyyy}-${mm}-${dd}`;
  };

  getLiveChatDailyTotal() {
    return this.http.get('https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/liveChatTodayTotalChats');
  };
  getLiveChatDailyRatings() {
    return this.http.get('https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/liveChatTodayRatings');
  };

  getLiveChatQueuedVisitors() {
    return this.http.get('https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/liveChatQueuedVisitors');
  };

  getLiveChatChattingVisitors() {
    return this.http.get('https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/liveChatChattingVisitors');
  };

  getLiveChatAgentsStatus() {
    return this.http.get('https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/liveChatAgentsStatus');
  };

  // getLiveChatChatStartedWebhook() {
  //   return this.http.get('https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/liveChatChatStartedWebhook');
  // };
  // getLiveChatChatEndedWebhook() {
  //   return this.http.get('https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/liveChatChatEndedWebhook');
  // };
  // getLiveChatVisitorQueuedWebhook() {
  //   return this.http.get('https://us-central1-hasoffers-support-dashboard.cloudfunctions.net/liveChatVisitorQueuedWebhook');
  // };
}
