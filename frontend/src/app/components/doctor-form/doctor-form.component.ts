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
   consultationFee: 500, // Number bhejein
   qrCodeUrl: ''
 };

  private dataService = inject(DataService);
  private router = inject(Router);
  private appointSrv = inject(AppointmentService);

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.doctorObj.qrCodeUrl = reader.result as string; // Base64 string save ho jayegi
      };
      reader.readAsDataURL(file);
    }
  }

  saveDoctorAndNext() {

    this.appointSrv.addDoctor(this.doctorObj).subscribe({
      next: (res: any) => {
        alert("Doctor Details Saved Successfully!");
        // Ab hum direct 'booked' wale page par navigate karenge
        this.router.navigate(['/booked']);
      },
      error: (err: any) => {
        console.error("Save error:", err);
        alert("Details save karne mein error aaya!");
      }
    });
  }

  goBack() {
    this.router.navigate(['/patient-form']);
  }
} // Yeh class ka aakhri bracket hai
