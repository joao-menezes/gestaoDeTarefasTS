import {Component, OnInit, ChangeDetectorRef, ViewChild, HostListener} from '@angular/core';
import { AuthService } from '../auth.service';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import { Menu } from 'primeng/menu';
import {NavigationEnd, Router} from '@angular/router';
import { NotificationService } from '../notification.service';
import {AppComponent} from "../app.component";
import {clearCanvas} from "chart.js/helpers";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = 'Elizabeth';

  userNotification: number = 0;
  notifications: string[] = [];
  showNotifications: boolean = false;

  items: MenuItem[] = [];
  @ViewChild('menu') menu: Menu | undefined;

  isDarkTheme: boolean = false;
  themeIcon: string = 'pi pi-sun';

  isLoginPage: boolean = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private notificationService: NotificationService,
    private appComponent: AppComponent,
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url.includes('/login');
      }
    });


    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      this.userNotification = notifications.length;
      this.cdr.detectChanges();
    });

    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['profile']);
        },
      },
      {
        label: 'Change Theme',
        icon: this.themeIcon,
        command: () => this.toggleTheme(),
      },
      {
        label: 'Change Language',
        icon: 'pi pi-language',
        items: [
          {
            label: 'English',
            icon: 'pi pi-globe',
            command: () => {
              // this.changeLanguage('en');
            },
          },
          {
            label: 'Português',
            icon: 'pi pi-globe',
            command: () => {
              // this.changeLanguage('pt');
            },
          },
          {
            label: 'Español',
            icon: 'pi pi-globe',
            command: () => {
              // this.changeLanguage('es');
            },
          },
        ],
      },
      {
        label: 'Release Notes',
        icon: 'pi pi-info-circle',
        command: () => this.openReleaseNotes(),
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      }
   ]
  }


  toggleMenu(event: Event): void {
    if (this.menu) {
      this.menu.toggle(event);
    }
  }

  getFormattedNotification(userNotification: number): string {
    return userNotification > 9 ? '+9' : userNotification.toString();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    this.themeIcon = this.isDarkTheme ? 'pi pi-moon' : 'pi pi-sun';
    this.updateThemeMenuItem();
  }

  updateThemeMenuItem() {
    const themeItem = this.items.find((item) => item.label === 'Change Theme');
    if (themeItem) {
      themeItem.icon = this.themeIcon;
    }
  }

  openReleaseNotes() {
    this.appComponent.displayReleaseNotes = true
  }

  clearAllNotifications(){
    this.notificationService.clearNotifications()
  }

  logout() {
    this.authService.logout();
  }

  toggleNotificationModal(): void {
    this.showNotifications = !this.showNotifications;
    if (!this.showNotifications) {
      this.notificationService.clearNotifications()
    }
  }

  displayFormattedNotification(): string {
    return this.notifications.length === 0 ? 'Nothing to Show' : '';
  }


  toggleNotifications(event: Event) {
    this.showNotifications = !this.showNotifications;
    event.stopPropagation();
  }

  onNotificationClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.showNotifications = false;
  }

  protected readonly clearCanvas = clearCanvas;

  isChecked = false;

  toggleIcon() {
    this.isChecked = !this.isChecked;
  }
}
