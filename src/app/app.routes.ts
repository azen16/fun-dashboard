import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Sports } from './components/sports/sports';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'sports', component: Sports }
];
