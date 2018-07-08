import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  desktop: boolean;
  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.globalService.mqRef.subscribe(mq => {
      console.log(mq);
      this.desktop = mq;
    });
  }
}
