import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  appointmentHistory: any[] = [];
  searchText: string = '';

  // Modal aur Review ke liye variables
  isModalOpen: boolean = false;
  selectedAppt: any = null;

  // Review Object jo backend jayega
  reviewObj = {
    rating: 0,
    comment: '',
    doctorId: null,
    patientId: 1 // Baad mein logged-in user ki ID se replace karein
  };

  // Right side display ke liye dummy reviews
  reviews: any[] = [
    { doctorName: 'Dr. Satish', rating: 5, comment: 'Very experienced and polite.', date: '2026-04-01' },
    { doctorName: 'Dr. Priya', rating: 4, comment: 'Good consultation!', date: '2026-03-25' }
  ];

  constructor(private appointSrv: AppointmentService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    // Patient ID 1 ke liye history fetch karna
    this.appointSrv.getPatientAppointments(1).subscribe({
      next: (res: any) => {
        this.appointmentHistory = res;
      },
      error: (err) => {
        console.error("Error fetching history:", err);
      }
    });
  }

  // Search Filter Logic
  filteredHistory() {
    if (!this.searchText) {
      return this.appointmentHistory;
    }
    return this.appointmentHistory.filter(item =>
      item.doctorName?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // --- Modal Logic ---

  openRateModal(appt: any) {
    this.selectedAppt = appt;
    this.reviewObj.doctorId = appt.doctorId;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetReviewObj();
  }

  resetReviewObj() {
    this.reviewObj = {
      rating: 0,
      comment: '',
      doctorId: null,
      patientId: 1
    };
  }

  submitReview() {
    if (this.reviewObj.rating === 0) {
      alert("Please select at least one star! ⭐");
      return;
    }

    // Backend call (Example - make sure this exists in your service)
    // this.appointSrv.saveReview(this.reviewObj).subscribe({
    //   next: (res) => {
        alert("Thank you! Review submitted for " + this.selectedAppt.doctorName);

        // Naya review list mein dikhane ke liye (Local update)
        this.reviews.unshift({
          doctorName: this.selectedAppt.doctorName,
          rating: this.reviewObj.rating,
          comment: this.reviewObj.comment,
          date: new Date().toISOString().split('T')[0]
        });

        this.closeModal();
    //   }
    // });
  }
}
