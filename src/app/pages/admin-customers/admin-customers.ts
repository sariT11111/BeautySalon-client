import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-customers.html',
  styleUrl: './admin-customers.scss'
})
export class AdminCustomers implements OnInit {

  customers: any[] = [];
  loading = true;
  errorMessage = '';

  successMessage = '';

newCustomer = {
  fullName: '',
  phone: '',
  email: ''
};

addingCustomer = false;
showAddForm = false;

  constructor(
    private api: ApiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.loadCustomers();
  }

  loadCustomers(): void {

    this.loading = true;
    this.errorMessage = '';

    this.api.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('CUSTOMERS ERROR:', err);
        this.errorMessage = 'Unable to load customers.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

addCustomer(): void {

  this.successMessage = '';
  this.errorMessage = '';

  if (!this.newCustomer.fullName || !this.newCustomer.phone) {
    this.errorMessage = 'Full name and phone are required.';
    return;
  }

  this.addingCustomer = true;

  this.api.addCustomer(this.newCustomer).subscribe({

    next: (customer) => {

      this.customers.push(customer);

      this.successMessage = 'Customer added successfully.';

      this.newCustomer = {
        fullName: '',
        phone: '',
        email: ''
      };

      this.addingCustomer = false;

      this.cdr.detectChanges();
    },

    error: (err) => {

      console.error('ADD CUSTOMER ERROR:', err);

      this.errorMessage = 'Unable to add customer.';

      this.addingCustomer = false;

      this.cdr.detectChanges();
    }

  });
}

  logout(): void {
    localStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/admin/login']);
  }
}