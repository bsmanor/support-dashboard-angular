import { Component, OnInit } from '@angular/core';
import { SettingsCard } from '../models/settings-card';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  settingsCards: SettingsCard[] = [
    {
      title: 'Manage Agents',
      subTitle: '',
      route: '/settings/agents',
      actionButtonText: 'Go',
      backGroundImage: ''
    },
    {
      title: 'Chats',
      subTitle: '',
      route: '/settings/chat',
      actionButtonText: 'Go',
      backGroundImage: ''
    },
    {
      title: 'Callbacks',
      subTitle: '',
      route: '/settings/callbacks',
      actionButtonText: 'Go',
      backGroundImage: ''
    },
    {
      title: 'Messages',
      subTitle: '',
      route: '',
      actionButtonText: 'Go',
      backGroundImage: ''
    }
  ]


  ngOnInit() {
  }

}
