import { Agent } from './../models/agent';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AgentsService } from './../services/agents.service';
import { UserGoogleProfile } from './../models/user-google-profile';
import { reject } from 'q';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private agentsService: AgentsService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.login();
  }

  loginStatus = 0; // 0: authenticating; 1: login successful; 2: login failed;
  errorMessage: string;

    // This function initiate a google sign in process. the user variable will receive the current user's info
  async login() {
    let user: any;
    user = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch(err => {
      console.log(err);
      this.errorMessage = err.message;
      this.loginStatus = 1;
    });
    // check if the user's email is a @tune email or not.
    if (user.user.email.search(/@tune/) !== -1) {
      // check if user already exists
      // if user is already signed up
      if (!user.additionalUserInfo.isNewUser) {
          this.router.navigate(['/home']);
      } else {
        // if not exist, add new user to the DB
        // 1. create the user object
        const agent = {
          email: user.additionalUserInfo.profile.email,
          family_name: user.additionalUserInfo.profile.family_name,
          given_name: user.additionalUserInfo.profile.given_name,
          id: user.user.uid,
          locale: user.additionalUserInfo.profile.locale,
          name: user.additionalUserInfo.profile.name,
          picture: user.additionalUserInfo.profile.picture
        };
        // 2. add user as new agent to DB
        this.agentsService.addAgent(agent);
        // 3. redirect to the home page
        this.router.navigate(['/home']);
      }
      // if user's email isn't @tune, the user's account on firebase will be deleted
    } else {
      const currentUser = this.afAuth.auth.currentUser;
      currentUser.delete().then( res => {
        this.errorMessage = `Oops!\n Only @tune email domains can log in. Got one?`;
        this.loginStatus = 1;
      });
    }
  }

  ngOnInit() {
  }

}
