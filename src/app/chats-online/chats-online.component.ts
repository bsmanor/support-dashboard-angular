import { AgentsStatus } from './../models/agents-status';
import { LiveChatVisitors } from './../models/live-chat-visitors';
import { ChatStatsService } from './../services/chat-stats.service';
import { ChatStats } from './../models/chat-stats';
import { Component, OnInit } from '@angular/core';
import { WebhooksListenersService } from './../services/webhooks-listeners.service';

class OnlineAgent {
  agentName: string;
  numOfChats: number;
  chats: Chat[];
  constructor(agent: Agent) {
    this.agentName = agent.agentName;
    this.numOfChats = agent.numOfChats;
    this.chats = agent.chats;
  }
};

interface OnlineAgents {
  agents: Agent[];
};

interface Agent {
  agentName: string;
  numOfChats: number;
  chats: Chat[];
  isAcceptingChats?: boolean;
};

interface Chat {
  clientName: string;
  startedAt: string;
  city: string;
  country: string;
};

interface AgentsStatusResponse {
  response: AgentsStatus[];
}

@Component({
  selector: 'app-chats-online',
  templateUrl: './chats-online.component.html',
  styleUrls: ['./chats-online.component.css']
})

export class ChatsOnlineComponent implements OnInit {

  online = [];
  onlineAgents: Agent[];
  agentsAcceptingChats = [];

  constructor(
    private chatStatsService: ChatStatsService,
    private webhooksListenersService: WebhooksListenersService
  ) {
    this.onlineAgents = [];
  }

  subscribeToLivechatEvents() {
    this.webhooksListenersService.livechatEvents().subscribe((res) => {
      this.onlineAgents = [];
      this.getLiveChatChattingVisitors();
      this.getLiveChatAgentsStatus();
    })
  }
  
  
  getLiveChatChattingVisitors() {
    this.onlineAgents.length = 0;
    this.chatStatsService.getLiveChatChattingVisitors().subscribe((res: LiveChatVisitors) => {
      for(let chat of res.response) {
        for(let agent of chat.chat.agents) {
          if(this.onlineAgents.length >= 1) {
            for(let i in this.onlineAgents) {
              
              if(this.onlineAgents[i].agentName === agent.display_name) {
                this.onlineAgents[i].numOfChats++;
                this.onlineAgents[i].chats.push({
                  clientName: chat.name,
                  startedAt: chat.chat_start_time,
                  city: chat.city,
                  country: chat.country
                })
              }
            }
          } else {
              let tempAgent: Agent = {
                agentName: agent.display_name,
                numOfChats: 1,
                chats: [{
                  clientName: chat.name,
                  startedAt: chat.chat_start_time,
                  city: chat.city,
                  country: chat.country
                }]
            }
            this.onlineAgents.push(new OnlineAgent(tempAgent));
          }
        }
      }
    })
    this.getLiveChatAgentsStatus();
  }
  
  getLiveChatAgentsStatus() {
    this.agentsAcceptingChats.length = 0;
    this.chatStatsService.getLiveChatAgentsStatus().subscribe((res: AgentsStatusResponse) => {
      for(let agent of res.response) {
        if(agent.status === 'accepting chats') {
          this.agentsAcceptingChats.push(agent);
          let isExist = false;
          for(let onlineAgent of this.onlineAgents) {
            if(agent.name === onlineAgent.agentName) {
              onlineAgent.isAcceptingChats = true;
              isExist = true;
              break;
            } 
          }
          if(!isExist) {
            let tmpAgent: Agent = {
              agentName: agent.name,
              numOfChats: 0,
              chats: [],
              isAcceptingChats: true
            }
            this.onlineAgents.push(tmpAgent);
          }
        }
      }
    })
  }

  ngOnInit() {
    //this.getLiveChatChattingVisitors();
    this.subscribeToLivechatEvents();
  }
  
}
