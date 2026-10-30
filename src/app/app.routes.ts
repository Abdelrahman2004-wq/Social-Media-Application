import { Details } from './features/details/details';
import { Routes } from '@angular/router';
import { Auth } from './layout/auth/auth';
import { Main } from './layout/main/main';
import { authGuard } from './core/guard/auth-guard';
import { guestGuard } from './core/guard/guest-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/register', pathMatch: 'full' },

  {
    path: 'auth',
    component: Auth,
    canActivate:[guestGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'register',
        loadComponent: () => import('./core/auth/register/register').then((m) => m.Register),
      },
      {
        path: 'login',
        loadComponent: () => import('./core/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./core/auth/forgetpassword/forgetpassword').then((m) => m.Forgetpassword),
      },
    ],
  },

  {
    path: 'app',
    component: Main,
    canActivate:[authGuard],
    children: [
      { path: 'feed', loadComponent: () => import('./features/feed/feed').then((m) => m.Feed) },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notification/notification').then((m) => m.Notification),
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./features/details/details').then((m) => m.Details),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => import('./features/notfound/notfound').then((m) => m.Notfound),
  },
];
