import { Routes } from '@angular/router';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'applications', pathMatch: 'full' },
  { path: 'applications', component: ApplicationsListComponent },
  { path: '**', redirectTo: 'applications' }
];
