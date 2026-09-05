import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
 imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  customer = {
    fullName: '',
    phone: '',
    email: ''
  };

  loading = false;
  message = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  registerCustomer(): void {
    this.message = '';
    this.error = '';

    if (
      !this.customer.fullName.trim() ||
      !this.customer.phone.trim() ||
      !this.customer.email.trim()
    ) {
      this.error = 'Please fill in all fields.';
      return;
    }

    this.loading = true;

    const newCustomer = {
      fullName: this.customer.fullName,
      phone: this.customer.phone,
      email: this.customer.email
    };

    this.api.addCustomer(newCustomer).subscribe({
     next: (savedCustomer) => {
  this.loading = false;

  // Remember the newly registered customer
  localStorage.setItem(
    'registeredCustomerId',
    savedCustomer.id.toString()
  );

  // Go directly to booking
  this.router.navigate(['/appointments']);
},

      error: (err) => {
        console.error('Registration error:', err);
        this.loading = false;
        this.error = 'Could not complete registration. Please try again.';
      }
    });
  }
}