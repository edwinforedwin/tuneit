import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password/forgot-password-page.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TicketCreatePageComponent } from './pages/ticket-create-page/ticket-create-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  {
    path: 'user',
    component: UserHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'tickets', component: TicketCreatePageComponent },
      { path: 'profile', component: ProfilePageComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
