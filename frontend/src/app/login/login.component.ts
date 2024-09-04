import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) { }

  // onSubmit(): void {
  //   if (this.authService.login(this.username, this.password)) {
  //     this.router.navigate(['home']);
  //   } else {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials' });
  //   }
  // }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['home']),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials' })
    });
  }

  loginWithGoogle(){

  }

}
