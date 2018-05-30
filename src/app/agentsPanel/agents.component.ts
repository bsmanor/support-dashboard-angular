import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AgentsService } from './../services/agents.service';
import { Agent } from './../models/agent';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  
  agents: Observable<Agent[]>;
  constructor(private agentsService: AgentsService) {
    this.agents = this.agentsService.getAgents();
  }

  
  
  
  ngOnInit() {
  }

}
