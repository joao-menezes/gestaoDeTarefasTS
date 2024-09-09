import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth.guard";
import {EditUserProfileComponent} from "./edit-user-profile/edit-user-profile.component";
import {SingupComponent} from "./singup/singup.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: EditUserProfileComponent, canActivate: [AuthGuard] },
  { path: 'sing-up', component: SingupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
