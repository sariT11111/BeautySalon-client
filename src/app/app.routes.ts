import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },

  {
    path: 'customers',
    loadComponent: () =>
      import('./pages/customers/customers').then(m => m.Customers)
  },

  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services').then(m => m.Services)
  },

  {
    path: 'staff',
    loadComponent: () =>
      import('./pages/staff/staff').then(m => m.Staff)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.Register)
  },

  {
    path: 'appointments',
    loadComponent: () =>
      import('./pages/appointments/appointments')
        .then(m => m.Appointments)
  }

];