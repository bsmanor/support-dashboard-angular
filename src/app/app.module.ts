import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// FIrebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
// services
import { ChatStatsService } from './services/chat-stats.service';
import { SchedulesService } from './services/schedules.service';
import { AgentsService } from './services/agents.service';
import { MatDialogService } from './services/mat-dialog.service';
import { MessagesService } from './services/messages.service';
import { WebhooksListenersService } from './services/webhooks-listeners.service';
// Angular-Material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

// Importing components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { AgentsComponent } from './agentsPanel/agents.component';
import { ChatStatsComponent } from './chat-stats/chat-stats.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { AgentsSettingsComponent } from './settings-agents/agents-settings.component';
import { ChatsTotalComponent } from './chats-total/chats-total.component';
import { ChatsSatisfactionComponent } from './chats-satisfaction/chats-satisfaction.component';
import { ChatsOnlineComponent } from './chats-online/chats-online.component';
import { ChatsQueuedComponent } from './chats-queued/chats-queued.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatScheduleComponent } from './chat-schedule/chat-schedule.component';
import { CallbacksScheduleComponent } from './callbacks-schedule/callbacks-schedule.component';
import { SettingsChatComponent } from './settings-chat/settings-chat.component';
import { SettingsCallbacksComponent } from './settings-callbacks/settings-callbacks.component';
import { DialogChatMessageComponent } from './dialog-chat-message/dialog-chat-message.component';
import { DialogCallbacksHistoryComponent } from './dialog-callbacks-history/dialog-callbacks-history.component';
import { ChatScheduleWeeklyComponent } from './chat-schedule-weekly/chat-schedule-weekly.component';
// Importing pipes
import { LimitTextPipe } from './pipes/limit-text.pipe';

// Router routes
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'settings/agents', component: AgentsSettingsComponent },
  { path: 'settings/chat', component: SettingsChatComponent },
  { path: 'settings/callbacks', component: SettingsCallbacksComponent },
  { path: 'callbacks/history', component: DialogCallbacksHistoryComponent },
  { path: '', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    SettingsComponent,
    AgentsComponent,
    ChatStatsComponent,
    SchedulesComponent,
    AgentsSettingsComponent,
    ChatsTotalComponent,
    ChatsSatisfactionComponent,
    ChatsOnlineComponent,
    ChatsQueuedComponent,
    MessagesComponent,
    ChatScheduleComponent,
    CallbacksScheduleComponent,
    SettingsChatComponent,
    SettingsCallbacksComponent,
    DialogCallbacksHistoryComponent,
    ChatScheduleWeeklyComponent,
    DialogChatMessageComponent,
    LimitTextPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // Router initialization
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule, MatCheckboxModule,MatMenuModule,MatToolbarModule,MatChipsModule,MatDividerModule,
    MatSidenavModule,MatCardModule,MatIconModule,MatFormFieldModule,MatInputModule,
    MatListModule,MatTableModule,MatSelectModule,MatProgressSpinnerModule,MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [AgentsService, SchedulesService, AngularFireAuth, MessagesService, ChatStatsService, WebhooksListenersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
