import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  // Saare variables class ke shuruat mein
  doctorList: any[] = [];
  selectedDoctorDetails: any;

  bookingObj: any = {
    patientId: 1,
    patientName: '',
    doctorName: '',
    appointmentDate: '',
    timeSlot: '',
    locationType: 'Offline',
    allergies: '',
    paymentMethod: 'Cash',
    feesAmount: 500,
    specialization: '',
    department: '',
    status: 'Pending'
  };

  constructor(private appointSrv: AppointmentService, private router: Router) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.appointSrv.getAllDoctors().subscribe({
      next: (res: any) => {
        this.doctorList = res;
        console.log("Doctors loaded:", res);
      },
      error: (err: any) => {
        console.error("Error fetching doctors:", err);
      }
    });
  }

  // YE FUNCTION CLASS KE ANDAR HAI
  onDoctorChange(event: any) {
    const selectedName = event.target.value;
    this.selectedDoctorDetails = this.doctorList.find(doc => doc.name === selectedName);

    if (this.selectedDoctorDetails) {
      this.bookingObj.feesAmount = this.selectedDoctorDetails.consultationFee;
      this.bookingObj.specialization = this.selectedDoctorDetails.specialization;
      this.bookingObj.department = this.selectedDoctorDetails.department;
    }
  }

  // YE BHI CLASS KE ANDAR HAI
  onSave() {
    // Purane features ke saath naya logic
    if (this.bookingObj.paymentMethod === 'Cash') {
      this.bookingObj.status = 'Pending';
    } else {
      this.bookingObj.status = 'Confirmed';
    }

    this.appointSrv.saveBooking(this.bookingObj).subscribe({
      next: (res: any) => {
        alert(`Appointment Booked! Current Status: ${this.bookingObj.status}`);
        this.router.navigate(['/booked']);
      },
      error: (err) => alert("Booking failed!")
    });
  }

  // YE BHI CLASS KE ANDAR HAI
  goBack() {
    this.router.navigate(['/patient-form']);
  }

} // <--- Sabse aakhri bracket yahi hona chahiye
