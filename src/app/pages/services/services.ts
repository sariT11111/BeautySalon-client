import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements OnInit {

  services: any[] = [];

  newService = {
    name: '',
    price: 0,
    durationMinutes: 30,
    category: ''
  };

  loading = false;
  message = '';
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.error = '';

    this.api.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Could not load services.';
        this.loading = false;
      }
    });
  }

  addService(): void {
    if (!this.newService.name || !this.newService.category) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    if (this.newService.price <= 0) {
      this.error = 'Price must be greater than 0.';
      return;
    }

    this.error = '';
    this.message = '';

    this.api.addService(this.newService).subscribe({
      next: (service) => {
        this.services.push(service);

        this.newService = {
          name: '',
          price: 0,
          durationMinutes: 30,
          category: ''
        };
        this.loading = false;
        this.message = 'Service added successfully!';
      },
      error: (err) => {
        console.error(err);
        this.error = 'Could not add service.';
      }
    });
  }
}