import { AgentsService } from './../services/agents.service';
import { Agent } from './../models/agent';
import { SchedulesService } from './../services/schedules.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

interface DailyChatResponse {
  content: string;
}

@Component({
  selector: 'app-chat-schedule-weekly',
  templateUrl: './chat-schedule-weekly.component.html',
  styleUrls: ['./chat-schedule-weekly.component.css']
})
export class ChatScheduleWeeklyComponent implements OnInit {

  displayedColumns = ['agent', 'start', 'end'];
  dataSource: Element[];

  constructor(
    private schedulesService: SchedulesService,
    private agentsService: AgentsService,
  ) { }

  ngOnInit() {

    let now = {
      year: moment().format('YYYY'),
      week: moment().format('w'),
      dayOfYear: moment().format('DDD')
    };
    this.schedulesService.getDailyChatSchedule(now).subscribe((res: DailyChatResponse) => {
      if(res) {
        let dailyChatRes: Element[] = JSON.parse(res.content);
        for(let row of dailyChatRes) {
          let agent = this.agentsService.getAgentById(row.agent).subscribe((agent: Agent) => {
            row.agent = agent.given_name;
          })
        }
        this.dataSource = dailyChatRes;
      }
    })

  }

}

export interface Element {
  agent: string;
  start: string;
  end: string;
}
