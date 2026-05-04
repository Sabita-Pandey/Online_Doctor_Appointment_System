import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss'
})
export class PatientFormComponent {
  // Patient data object
  patientObj = {
    patientId: 1,
    age: null,
    gender: 'Male',
    address: '',
    aadhaarNo: '',
    bloodGroup: 'A+',
    emergencyContact: '',
    symptoms: '',
    medicalIssue: '',
    previousHistory: ''
  };

constructor(
  private dataService: DataService, // DataService bhi yahan add kar sakte hain
      private router: Router
  ){}

goBackHome() {
  this.router.navigate(['/home']);
}

saveAndNext()
{
  console.log("Patient Data Saved", this.patientObj);

  alert("Patient Details Saved! Moving to Doctor Selection.");
  this.router.navigate(['doctor-form']);
  }

  onSavePatient() {
    console.log("Saving Patient Data:", this.patientObj);
    // Yahan hum AuthService call karke data backend bhejenge
    alert("Patient details saved locally! Ab hum ise database se connect karenge.");
  }
}
