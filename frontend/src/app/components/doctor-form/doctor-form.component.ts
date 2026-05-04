import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.scss'
})
export class DoctorFormComponent {

  // doctorObj mein colon (:) ka use karein, semi-colon (;) ka nahi
 doctorObj: any = {
   name: '',
   specialization: '',
   userId: 1, // Ensure karein ki users table mein ID 1 wala user 'Active' ho
   experience: 0, // Number bhejein
   qualification: '',
   department: 'OPD',
   availabilityStatus: 'Available',
   licenseNumber: '',
   consultationFee: 500 // Number bhejein
 };

  private dataService = inject(DataService);
  private router = inject(Router);
  private appointSrv = inject(AppointmentService);

  saveDoctorAndNext() {
    console.log("Sending Doctor Data to DB:", this.doctorObj);

    this.appointSrv.addDoctor(this.doctorObj).subscribe({
      next: (res: any) => {
        alert("Doctor Profile Saved Successfully in Database!");
        this.router.navigate(['/booking']);
      },
      error: (err) => {
        console.error("Save failed", err);
        alert("Database error! Check if Backend is running.");
      }
    });
  } // Is bracket ko check karein

  goBack() {
    this.router.navigate(['/patient-form']);
  }
} // Yeh class ka aakhri bracket hai
