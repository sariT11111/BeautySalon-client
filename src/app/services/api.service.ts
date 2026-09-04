import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5162/api';

  constructor(private http: HttpClient) {}

  // Customers
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/customers`, customer);
  }

  // Services
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  addService(service: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services`, service);
  }

  // Staff
  getStaff(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff`);
  }

  addStaff(staff: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/staff`, staff);
  }

  // Appointments
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments`);
  }

  addAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/appointments`, appointment);
  }

  // Payments
  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payments`);
  }

  addPayment(payment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments`, payment);
  }
}