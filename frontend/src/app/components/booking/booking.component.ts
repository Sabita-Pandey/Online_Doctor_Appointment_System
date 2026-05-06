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
    paymentMethod: 'Cash', // Default 'Cash'
    feesAmount: 500,
    specialization: '',
    department: '',
    status: 'Pending',
    transactionId: '', // Naya field backend ke liye
    cardNumber: '',    // Sirf UI validation ke liye
    expiryDate: '',
    cvv: ''
  };

  constructor(private appointSrv: AppointmentService, private router: Router) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.appointSrv.getAllDoctors().subscribe({
      next: (res: any) => {
        this.doctorList = res;
      },
      error: (err: any) => console.error(err)
    });
  }

  onDoctorChange(event: any) {
    const selectedName = event.target.value;
    this.selectedDoctorDetails = this.doctorList.find(doc => doc.name === selectedName);
    if (this.selectedDoctorDetails) {
      this.bookingObj.feesAmount = this.selectedDoctorDetails.consultationFee;
      this.bookingObj.specialization = this.selectedDoctorDetails.specialization;
      this.bookingObj.department = this.selectedDoctorDetails.department;
    }
  }

onModeChange() {
  // Agar 'Online' mode hai aur 'Cash' selected hai, toh use UPI par shift kar do
  if (this.bookingObj.locationType === 'Online' && this.bookingObj.paymentMethod === 'Cash') {
    this.bookingObj.paymentMethod = 'UPI';
  }
}

  // Payment Method change handle karne ke liye
  onPaymentMethodChange(event: any) {
    this.bookingObj.paymentMethod = event.target.value;
  }

 onSave() {
   // 1. UPI Validation
   if (this.bookingObj.paymentMethod === 'UPI') {
     if (!this.bookingObj.transactionId || this.bookingObj.transactionId.trim().length < 6) {
       alert("Error: Please enter a valid Transaction ID.");
       return;
     }
     // Online Payment = Confirmed Status
     this.bookingObj.paymentStatus = "Paid";
     this.bookingObj.status = "Confirmed";
   }

   // 2. Card Validation (CVV validation ke saath)
   else if (this.bookingObj.paymentMethod === 'Card') {
     if (!this.bookingObj.cardNumber || this.bookingObj.cardNumber.length < 16) {
       alert("Error: Please enter a valid 16-digit Card Number.");
       return;
     }
     // CVV check zaroori hai real project ke liye
     if (!this.bookingObj.cvv || this.bookingObj.cvv.length < 3) {
       alert("Error: Please enter a valid CVV.");
       return;
     }
     // Online Payment = Confirmed Status
     this.bookingObj.paymentStatus = "Paid";
     this.bookingObj.status = "Confirmed";
   }

   // 3. Cash Case
   else if (this.bookingObj.paymentMethod === 'Cash') {
     // Cash Payment = Pending Status
     this.bookingObj.paymentStatus = "Unpaid";
     this.bookingObj.status = "Pending";
   }

   // Final Save Logic
   this.appointSrv.saveBooking(this.bookingObj).subscribe({
     next: (res: any) => {
       const msg = this.bookingObj.status === 'Confirmed'
         ? "Payment Received! Appointment Confirmed."
         : "Appointment Booked! Status: Pending (Pay at Clinic).";
       alert(msg);
       this.router.navigate(['/booked']); // Direct navigation to History/Booked tab
     },
     error: (err) => {
       console.error("Save Error:", err);
       alert("Database Error: Booking failed.");
     }
   });
 }
  goBack() {
    this.router.navigate(['/patient-form']);
  }
}
