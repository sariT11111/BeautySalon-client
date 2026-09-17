import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Customers } from './pages/customers/customers';
import { Services } from './pages/services/services';
import { Staff } from './pages/staff/staff';
import { Register } from './pages/register/register';
import { Appointments } from './pages/appointments/appointments';

import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { AdminCustomers } from './pages/admin-customers/admin-customers';
import { AdminServices } from './pages/admin-services/admin-services';
export const routes: Routes = [
  {
    path: '',
    component: Home
  },

  {
    path: 'customer-services',
    loadComponent: () =>
      import('./pages/customer-services/customer-services')
        .then(m => m.CustomerServices)
  },

  {
  path: 'admin/login',
  component: AdminLogin
},

{
  path: 'admin/dashboard',
  component: AdminDashboard
},

{
  path: 'admin/customers',
  component: AdminCustomers
},
{
  path: 'admin/services',
  component: AdminServices
},
  {
    path: 'customers',
    component: Customers
  },

  {
    path: 'services',
    component: Services
  },

  {
    path: 'staff',
    component: Staff
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'appointments',
    component: Appointments
  }
];