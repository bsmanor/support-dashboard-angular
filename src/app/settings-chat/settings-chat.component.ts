import { ChatSchedule } from './../models/chat-schedule';
import { SchedulesService } from './../services/schedules.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {AgentsService} from '../services/agents.service';
import {Agent} from '../models/agent';
import {MatTableDataSource} from '@angular/material';

interface Element {
  agent: string;
  start: string;
  end: string;
}

interface Day {
  momentObj: moment.Moment; 
  dayOfWeek: number;
  isSelected: boolean;
}

interface DailyChatResponse {
  content: string;
}

class TableToUpload {
  year: number;
  weekOfYear: number;
  dayOfYear: number;
  tableContent: Element[];
  constructor(year:number, week:number, day:number, content:Element[]) {
    this.year = year;
    this.weekOfYear = week;
    this.dayOfYear = day;
    this.tableContent = content;
  }
}

@Component({
  selector: 'app-settings-chat',
  templateUrl: './settings-chat.component.html',
  styleUrls: ['./settings-chat.component.css']
})

export class SettingsChatComponent implements OnInit {
  
  weekDays: Day[] = [];
  weeksFromNow = 0;

  agents: Observable<Agent[]>;
  chat: Observable<ChatSchedule[]>

  chatStartTime = moment(); 
  chatEndTime = moment(); 
  numOfAgents: number;
  duration:  number;
  subDuration: number;
  viewTable = false;

  displayedColumns = ['agent', 'start', 'end'];
  dataSource: Element[];
  dataSourceAgents = [];
  
  constructor(
    private agentsService: AgentsService,
    private schedulesService: SchedulesService
  ) 
  {
    this.agents = this.agentsService.getAgents();    
  }
  
  addWeek() {
    this.weeksFromNow++;
    this.weekDays = [];
    for(let i = 0; i < 7; i++) {
      this.weekDays.push({
        momentObj: moment().add(this.weeksFromNow, 'w').weekday(i),
        dayOfWeek: i,
        isSelected: false
      })
    };
  };
  
  subWeek() {
    this.weeksFromNow--;
    this.weekDays = [];
    for(let i = 0; i < 7; i++) {
      this.weekDays.push({
        momentObj: moment().add(this.weeksFromNow, 'w').weekday(i),
        dayOfWeek: i,
        isSelected: false
      })
    };
  };
  
  updateDay(day: Day) {
    this.weekDays[day.dayOfWeek].isSelected = !this.weekDays[day.dayOfWeek].isSelected
    console.log(this.weekDays[day.dayOfWeek].isSelected);
  }

  addRow(start, end) {
    this.numOfAgents++;
    this.tableInit(start, end, this.numOfAgents);
  }
  
  // Get the start and end time, along with the number of agents participating
  // Calculate the whole chat duration time in minutes
  // Calculate the chat time per agent
  tableInit(start: string, end: string, numOfAgents: number) {
    let startHour = parseInt(start.slice(0,2));
    let startMin = parseInt(start.slice(3,5));
    let endHour = parseInt(end.slice(0,2));
    let endMin = parseInt(end.slice(3,5));
    let startTime = moment().hour(startHour).minutes(startMin);
    let endTime = moment().hour(endHour).minutes(endMin);
    let duration =  moment.duration(endTime.diff(startTime, 'minute')).milliseconds();
    let subDuration = duration / numOfAgents;
    
    this.chatStartTime = startTime;
    this.chatEndTime = endTime;
    this.numOfAgents = numOfAgents;
    this.duration = duration;
    this.subDuration = subDuration;
    
    this.buildTable();        
  }
  
  buildTable() {
    let tempDataSource: Element[] = [];
    // Creating number of rows as the number of agents
    for(let i = 0; i < this.numOfAgents; i++) {
      // Calculate the timeframe of the specific row
      
      let chatStartTime = moment(this.chatStartTime);
      let chatEndTime = moment(this.chatEndTime);
      
      let start = `${moment(this.chatStartTime).add(this.subDuration * i, 'm').format('H')}:${moment(this.chatStartTime).add(this.subDuration * i, 'm').format('mm')}`;
      let end = `${moment(this.chatStartTime).add(this.subDuration * (i+1), 'm').format('H')}:${moment(this.chatStartTime).add(this.subDuration * (i+1), 'm').format('mm')}`;
      
      tempDataSource.push({
        agent: this.dataSourceAgents[i],
        start: start,
        end: end
      });
    }
    this.dataSource = tempDataSource;    
  };

  
  
  printTable(table) {
    let now = {
      year: moment().format('YYYY'),
      week: moment().format('w'),
      dayOfYear: moment().format('DDD')
    };
    this.schedulesService.getDailyChatSchedule(now).subscribe((res: DailyChatResponse) => {
      let chat = res;
      console.log(JSON.parse(chat.content));
    })
  }

  
  
  
  saveTable(table: Element[]) {
    for(let day of this.weekDays) {
      if(day.isSelected) {
        let tableToUpload = new TableToUpload(
          day.momentObj.year(),
          day.momentObj.week(),
          day.momentObj.dayOfYear(),
          table
        )
        this.schedulesService.setChatSchedule(tableToUpload);
      }
    }
  }
  
  ngOnInit() {
    for(let i = 0; i < 7; i++) {
      this.weekDays.push({
        momentObj: moment().add(this.weeksFromNow, 'w').weekday(i),
        dayOfWeek: i,
        isSelected: false
      })
    };
  }
}

