import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {

  customers: any[] = [];
  services: any[] = [];
  staff: any[] = [];
  appointments: any[] = [];

  loading = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.loadDashboard();
  }

  loadDashboard(): void {

    this.api.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('CUSTOMERS ERROR:', err);
      }
    });

    this.api.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('SERVICES ERROR:', err);
      }
    });

    this.api.getStaff().subscribe({
      next: (data) => {
        this.staff = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('STAFF ERROR:', err);
      }
    });

    this.api.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('APPOINTMENTS ERROR:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {

    localStorage.removeItem('adminLoggedIn');

    this.router.navigate(['/admin/login']);
  }
}