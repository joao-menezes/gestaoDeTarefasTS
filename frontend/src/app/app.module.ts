import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import { TopBarComponent } from './top-bar/top-bar.component';
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EditUserProfileComponent} from "./edit-user-profile/edit-user-profile.component";
import {CardModule} from "primeng/card";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {BadgeModule} from "primeng/badge";
import {MessagesModule} from "primeng/messages";
import {DialogModule} from "primeng/dialog";
import {ReleaseNotesComponent} from "./release-notes/release-notes.component";
import {BottomInfoComponent} from "./bottom-info/bottom-info.component";
import {TaskStatisticsComponent} from "./task-statistics/task-statistics.component";
import {NotificationModalComponent} from "./notification-modal/notification-modal.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {CheckboxModule} from "primeng/checkbox";
import {MessageService} from "primeng/api";
import {DividerModule} from "primeng/divider";
import {TieredMenuModule} from "primeng/tieredmenu";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TopBarComponent,
    EditUserProfileComponent,
    NotificationModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    CardModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    BadgeModule,
    MessagesModule,
    DialogModule,
    ReleaseNotesComponent,
    BottomInfoComponent,
    TaskStatisticsComponent,
    InputSwitchModule,
    CheckboxModule,
    DividerModule,
    TieredMenuModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
