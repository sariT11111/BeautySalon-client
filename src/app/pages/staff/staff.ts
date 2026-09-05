import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff.html',
  styleUrl: './staff.scss'
})
export class Staff implements OnInit {

  staff: any[] = [];

  newStaff = {
    fullName: '',
    specialization: '',
    phone: '',
    experience: 0
  };

  loading = false;
  message = '';
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.loading = true;
    this.error = '';

    this.api.getStaff().subscribe({
      next: (data) => {
        this.staff = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Could not load staff.';
        this.loading = false;
      }
    });
  }

  addStaff(): void {

    // Clear old messages
    this.message = '';
    this.error = '';

    if (
      !this.newStaff.fullName.trim() ||
      !this.newStaff.specialization.trim() ||
      !this.newStaff.phone.trim()
    ) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    if (this.newStaff.experience < 0) {
      this.error = 'Experience cannot be negative.';
      return;
    }

    this.loading = true;

    this.api.addStaff(this.newStaff).subscribe({

      next: (staffMember) => {

        this.staff.push(staffMember);

        this.newStaff = {
          fullName: '',
          specialization: '',
          phone: '',
          experience: 0
        };

        this.loading = false;
        this.error = '';
        this.message = 'Staff member added successfully!';
      },

      error: (err) => {
        console.error(err);

        this.loading = false;
        this.message = '';
        this.error = 'Could not add staff member.';
      }

    });
  }
}