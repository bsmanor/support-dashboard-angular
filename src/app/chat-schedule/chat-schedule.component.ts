import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AgentsService } from './../services/agents.service';
import { MessagesService } from './../services/messages.service';
import { SettingsChatComponent } from './../settings-chat/settings-chat.component';
import { DialogChatMessageComponent } from './../dialog-chat-message/dialog-chat-message.component';
import { Agent } from './../models/agent';
import { SchedulesService } from './../services/schedules.service';
import * as moment from 'moment';

interface DailyChatResponse {
  content: string;
}

@Component({
  selector: 'app-chat-schedule',
  templateUrl: './chat-schedule.component.html',
  styleUrls: ['./chat-schedule.component.css']
})

export class ChatScheduleComponent implements OnInit{

  displayedColumns = ['agent', 'start', 'end']; // Mat table related
  dataSource: Element[]; // Mat table related

  dateOffset = 0;
  now = {
    year: moment().add(this.dateOffset, 'days').format('YYYY'),
    month: moment().add(this.dateOffset, 'days').format('MMMM'),
    week: moment().add(this.dateOffset, 'days').format('w'),
    dayOfYear: moment().add(this.dateOffset, 'days').format('DDD'),
    dayOfWeek: moment().add(this.dateOffset, 'days').format('dddd'),
    dayOfMonth: moment().add(this.dateOffset, 'days').format('DD'),
  };

  noChatsMessage = 'No chat schedule was set  for today';

  constructor(
    private schedulesService: SchedulesService,
    private agentsService: AgentsService,
    private messagesService: MessagesService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {

  }

  // ------------ Dialogs ----------------------
  openAddChatDialog() {
    const dialogRef = this.dialog.open(SettingsChatComponent, {
      width: '600px',
      height: 'auto'
    });
  }

  openWeeklyChatDialog() {
    const dialogRef = this.dialog.open(SettingsChatComponent, {
      width: '600px',
      height: 'auto'
    });
  }
  openNoChatMessageDialog() {
    const dialogRef = this.dialog.open(DialogChatMessageComponent, {
      width: '600px',
      height: '300px'
    });
  }
  // ------------ End of Dialogs ----------------------


  getChatSchedule(dateOffset) {
    const now = {
      year: moment().add(this.dateOffset, 'days').format('YYYY'),
      month: moment().add(this.dateOffset, 'days').format('MMMM'),
      week: moment().add(this.dateOffset, 'days').format('w'),
      dayOfYear: moment().add(this.dateOffset, 'days').format('DDD'),
      dayOfWeek: moment().add(this.dateOffset, 'days').format('dddd'),
      dayOfMonth: moment().add(this.dateOffset, 'days').format('DD'),
    };
    this.schedulesService.getDailyChatSchedule(now).subscribe((res: DailyChatResponse) => {
      if(res) {
        const dailyChatRes: Element[] = JSON.parse(res.content);
        for(let row of dailyChatRes) {
          let agent = this.agentsService.getAgent(row.agent).subscribe((agent: Agent) => {
            row.agent = agent.given_name;
          });
        }
        this.dataSource = dailyChatRes;
      } else {
        this.dataSource = null;
      }
    });
    this.now = now;
  }

  daysOffest(num: number) {
    this.dateOffset = this.dateOffset + num;
    this.getChatSchedule(this.daysOffest);
  }

  ngOnInit() {
    this.getChatSchedule(this.dateOffset);
  }

}
export interface Element {
  agent: string;
  start: string;
  end: string;
}



