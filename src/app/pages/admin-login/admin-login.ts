import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss'
})
export class AdminLogin {

  username = '';
  password = '';

  errorMessage = '';

  constructor(private router: Router) {}

 login(): void {

  console.log('USERNAME:', this.username);
  console.log('PASSWORD LENGTH:', this.password.length);

  this.errorMessage = '';

    if (this.username === 'admin' && this.password === 'admin123') {

      localStorage.setItem('adminLoggedIn', 'true');

      this.router.navigate(['/admin/dashboard']);

    } else {

      this.errorMessage = 'Invalid username or password.';

    }
  }
}