import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.html',
  styleUrl: './appointments.scss'
})
export class Appointments implements OnInit {

  customers: any[] = [];
  services: any[] = [];
  staff: any[] = [];
  appointments: any[] = [];

  selectedService: any = null;

  newAppointment = {
    customerId: 0,
    staffId: 0,
    appointmentDate: '',
    appointmentTime: '',
    status: 'Scheduled',
    totalPrice: 0,
    notes: ''
  };

  loading = true;
  booking = false;

  message = '';
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.api.getCustomers().subscribe({
      next: (data) => {
  this.customers = data;

  // Automatically select the newly registered customer
  const savedCustomerId = localStorage.getItem('registeredCustomerId');

  if (savedCustomerId) {
    this.newAppointment.customerId = Number(savedCustomerId);

    // Remove it after using it
    localStorage.removeItem('registeredCustomerId');
  }
},
      error: (err) => {
        console.error('CUSTOMERS ERROR:', err);
        this.error = 'Could not load customers.';
      }
    });

    this.api.getServices().subscribe({
      next: (data) => {
        console.log('SERVICES:', data);
        this.services = data;
      },
      error: (err) => {
        console.error('SERVICES ERROR:', err);
        this.error = 'Could not load services.';
      }
    });

    this.api.getStaff().subscribe({
      next: (data) => {
        console.log('STAFF:', data);
        this.staff = data;
      },
      error: (err) => {
        console.error('STAFF ERROR:', err);
        this.error = 'Could not load staff.';
      }
    });

    this.api.getAppointments().subscribe({
      next: (data) => {
        console.log('APPOINTMENTS:', data);
        this.appointments = data;

        // Stop loading
        this.loading = false;
      },
      error: (err) => {
        console.error('APPOINTMENTS ERROR:', err);
        this.error = 'Could not load appointments.';
        this.loading = false;
      }
    });
  }

  selectService(service: any): void {
    this.selectedService = service;
    this.newAppointment.totalPrice = service.price;
  }

  bookAppointment(): void {

    this.message = '';
    this.error = '';

    if (!this.newAppointment.customerId) {
      this.error = 'Please select a customer.';
      return;
    }

    if (!this.selectedService) {
      this.error = 'Please select a service.';
      return;
    }

    if (!this.newAppointment.staffId) {
      this.error = 'Please select a staff member.';
      return;
    }

    if (!this.newAppointment.appointmentDate) {
      this.error = 'Please select an appointment date.';
      return;
    }

    if (!this.newAppointment.appointmentTime) {
      this.error = 'Please select an appointment time.';
      return;
    }

    const localDateTime =
      `${this.newAppointment.appointmentDate}T${this.newAppointment.appointmentTime}:00`;

    const appointmentDate =
      new Date(localDateTime).toISOString();

    const appointment = {

      customerId: this.newAppointment.customerId,

      staffId: this.newAppointment.staffId,

      appointmentDate: appointmentDate,

      status: 'Scheduled',

      totalPrice: this.selectedService.price,

      notes: this.newAppointment.notes,

      appointmentServices: [
        {
          serviceId: this.selectedService.id,
          price: this.selectedService.price
        }
      ]
    };

    console.log('SENDING APPOINTMENT:', appointment);

    this.booking = true;

    this.api.addAppointment(appointment).subscribe({

      next: (result) => {

        console.log('BOOKING SUCCESS:', result);

        this.booking = false;

        this.message =
          'Your appointment has been booked successfully!';

        this.appointments.push(result);

        this.resetForm();
      },

      error: (err) => {

        console.error('BOOKING ERROR:', err);

        this.booking = false;

        this.error =
          err?.error ||
          'Could not book the appointment. Please try again.';
      }
    });
  }

  resetForm(): void {

    this.newAppointment = {

      customerId: 0,

      staffId: 0,

      appointmentDate: '',

      appointmentTime: '',

      status: 'Scheduled',

      totalPrice: 0,

      notes: ''
    };

    this.selectedService = null;
  }
}