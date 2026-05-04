import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss']
})
export class DoctorAppointmentsComponent implements OnInit {

  appointments: any[] = [];
  todayConfirmed = 0;
  todayPending = 0;
  patientId = 1;

  constructor(private appointmentsService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentsService.getPatientAppointments(this.patientId).subscribe({
      next: (data: any) => {
        this.appointments = data;
        this.calculateStats();
        console.log("Appointments fetched:", data);
      },
      error: (err) => console.error("Fetch error:", err)
    });
  }

  calculateStats() {
    const today = new Date().toISOString().split('T')[0];
    this.todayConfirmed = this.appointments.filter(a =>
      a.appointmentDate === today && a.status === 'Confirmed'
    ).length;

    this.todayPending = this.appointments.filter(a =>
      a.status === 'Pending'
    ).length;
  }

  // 1. Cancel Logic
  cancelAppointment(id: any) {
    if (!id) {
      alert("System error: Appointment ID not found.");
      return;
    }

    const isConfirm = confirm("Are you sure you want to cancel this appointment?");
    if (isConfirm) {
      this.appointmentsService.updateAppointmentStatus(id, 'Cancelled').subscribe({
        next: (res: any) => {
          alert("Appointment Cancelled!");
          this.loadAppointments(); // List refresh
        },
        error: (err: any) => {
          console.error("Backend Error:", err);
          alert("Backend Error: Check if updateAppointmentStatus is ready.");
        }
      });
    }
  }

  // 2. Delete Logic
  deleteRecord(id: number) {
    const isConfirm = confirm("Kya aap is record ko hamesha ke liye delete karna chahte hain?");
    if (isConfirm) {
      this.appointmentsService.deleteAppointment(id).subscribe({
        next: (res) => {
          alert("Record deleted!");
          this.loadAppointments(); // List refresh
        },
        error: (err) => alert("Delete karne mein error aaya. Check if @DeleteMapping is ready.")
      });
    }
  }

  // 3. View Details Logic
  viewPatientDetails(item: any) {
    const info = `
      Patient Name: ${item.patientName || 'N/A'}
      Doctor: ${item.doctorName}
      Specialization: ${item.specialization || 'N/A'}
      Fees: ₹${item.feesAmount || 0}
      Allergies: ${item.allergies || 'None'}
      Mode: ${item.locationType}
    `;
    alert(info);
  }

  // 4. Status Styling
  getStatusClass(status: string) {
    return {
      'badge bg-success': status === 'Confirmed' || status === 'Completed',
      'badge bg-warning text-dark': status === 'Pending',
      'badge bg-danger': status === 'Cancelled'
    };
  }
} // Class ends here
