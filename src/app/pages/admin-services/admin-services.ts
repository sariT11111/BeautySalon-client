import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-services.html',
  styleUrl: './admin-services.scss'
})
export class AdminServices implements OnInit {

  services: any[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';

  showAddForm = false;
  addingService = false;

  newService = {
    name: '',
    price: null,
    durationMinutes: null,
    category: ''
  };

  constructor(
    private api: ApiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('SERVICES ERROR:', err);
        this.errorMessage = 'Unable to load services.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addService(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (
      !this.newService.name ||
      !this.newService.price ||
      !this.newService.durationMinutes ||
      !this.newService.category
    ) {
      this.errorMessage = 'Please fill in all service fields.';
      return;
    }

    this.addingService = true;

    this.api.addService(this.newService).subscribe({
      next: (service) => {
        this.services.push(service);

        this.successMessage = 'Service added successfully.';

        this.newService = {
          name: '',
          price: null,
          durationMinutes: null,
          category: ''
        };

        this.showAddForm = false;
        this.addingService = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ADD SERVICE ERROR:', err);
        console.error('ADD SERVICE ERROR BODY:', err.error);

        this.errorMessage = 'Unable to add service.';
        this.addingService = false;

        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    localStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/admin/login']);
  }
}