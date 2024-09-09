// auth.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {HttpService} from "../HttpService";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router, private httpService: HttpService) { }

  login(email: string, password: string): Observable<any> {
    return this.httpService.login(email, password).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.isLoggedInSubject.next(true);
          localStorage.setItem('userName', response.name);
          console.log(response);

        }
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
