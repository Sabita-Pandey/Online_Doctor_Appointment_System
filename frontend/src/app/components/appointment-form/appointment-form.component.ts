import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent {
  book(data: any) {
    console.log("Appointment Data:", data);
    alert("Appointment booked locally! Backend integration pending.");
  }
}
