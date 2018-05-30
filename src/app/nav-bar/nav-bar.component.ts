import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
