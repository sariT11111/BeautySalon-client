import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  },
  {
    path: 'customers',
    loadComponent: () =>
      import('./pages/customers/customers').then(m => m.Customers)
  }
];