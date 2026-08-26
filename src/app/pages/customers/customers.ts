import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Customer,
  CreateCustomer,
  CustomerService
} from '../../services/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss'
})
export class Customers implements OnInit {
  private readonly customerService = inject(CustomerService);

  customers: Customer[] = [];

  form: CreateCustomer = {
    fullName: '',
    phone: '',
    email: ''
  };

  editingId: number | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load customers.';
        this.loading = false;
      }
    });
  }

  saveCustomer(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.form.fullName.trim() || !this.form.phone.trim()) {
      this.errorMessage = 'Name and phone are required.';
      return;
    }

    if (this.editingId === null) {
      this.customerService.createCustomer(this.form).subscribe({
        next: () => {
          this.successMessage = 'Customer added successfully.';
          this.resetForm();
          this.loadCustomers();
        },
        error: () => {
          this.errorMessage = 'Could not create customer.';
        }
      });
    } else {
      const updatedCustomer: Customer = {
        id: this.editingId,
        fullName: this.form.fullName,
        phone: this.form.phone,
        email: this.form.email
      };

      this.customerService
        .updateCustomer(this.editingId, updatedCustomer)
        .subscribe({
          next: () => {
            this.successMessage = 'Customer updated successfully.';
            this.resetForm();
            this.loadCustomers();
          },
          error: () => {
            this.errorMessage = 'Could not update customer.';
          }
        });
    }
  }

  editCustomer(customer: Customer): void {
    this.editingId = customer.id;

    this.form = {
      fullName: customer.fullName,
      phone: customer.phone,
      email: customer.email ?? ''
    };

    this.successMessage = '';
    this.errorMessage = '';
  }

  deleteCustomer(id: number): void {
    const confirmed = confirm(
      'Are you sure you want to delete this customer?'
    );

    if (!confirmed) {
      return;
    }

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.successMessage = 'Customer deleted successfully.';
        this.loadCustomers();
      },
      error: () => {
        this.errorMessage = 'Could not delete customer.';
      }
    });
  }

  resetForm(): void {
    this.editingId = null;

    this.form = {
      fullName: '',
      phone: '',
      email: ''
    };
  }
}