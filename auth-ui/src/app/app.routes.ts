import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Admin } from './dashboard/admin/admin';
import { User } from './dashboard/user/user';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'admin/dashboard', component: Admin, canActivate: [authGuard] },
  { path: 'user/dashboard', component: User, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];

