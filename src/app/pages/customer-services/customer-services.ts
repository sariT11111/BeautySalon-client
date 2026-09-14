import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-services.html',
  styleUrl: './customer-services.scss'
})
export class CustomerServices implements OnInit {

  services: any[] = [];
  loading = true;
  errorMessage = '';

  private apiUrl = 'http://localhost:5162/api/services';
constructor(
  private http: HttpClient,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    console.log('Customer Services component started');
    console.log('Calling API:', this.apiUrl);

    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('SERVICES RECEIVED:', data);
this.services = data;
this.loading = false;

this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('SERVICE API ERROR:', error);

        this.loading = false;
        this.errorMessage =
          'Unable to load services. Please make sure the server is running.';
      }
    });
  }

  getServiceImage(category: string): string {
    const c = category?.toLowerCase() || '';

    if (c.includes('hair')) {
      return 'assets/images/hair.jpg';
    }

    if (c.includes('nail')) {
      return 'assets/images/nail.jpg';
    }

    if (c.includes('makeup') || c.includes('full')) {
      return 'assets/images/makeup.jpg';
    }

    return 'assets/images/hero.jpg';
  }
}