import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.scss'
})
export class NotificationModalComponent implements OnInit {
  @Input() notifications: string[] = [];
  @Input() showNotifications: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  hideNotificationModal() {
    this.showNotifications = false;
  }
}
