import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSource = new Subject<string[]>();
  notifications$ = this.notificationsSource.asObservable();

  private notifications: string[] = [];

  constructor() {}

  addNotification(message: string) {
    this.notifications.push(message);
    this.notificationsSource.next(this.notifications);
  }

  clearNotifications() {
    this.notifications = [];
    this.notificationsSource.next(this.notifications);
  }
}
