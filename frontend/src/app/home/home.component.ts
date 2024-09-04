import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {

  }
  addNotification() {
    this.notificationService.addNotification('New notification at ' + new Date().toLocaleTimeString());
  }
}
