import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { BookingComponent } from './components/booking/booking.component';
import { HistoryComponent } from './components/history/history.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SpecialtyListComponent } from './specialty-list/specialty-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Shuruat mein Login khulega
    { path: 'login', component: LoginComponent },
     { path: 'home', component: HomeComponent },
     { path: 'all-specialties', component: SpecialtyListComponent },
      { path: 'patient-form', component: PatientFormComponent },
      { path: 'doctor-form', component: DoctorFormComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'booked', component: DoctorAppointmentsComponent},
      { path:'', redirectTo: 'booking', pathMatch: 'full'},
      { path: 'doctor-appointments', component: DoctorAppointmentsComponent },// Naya
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent }, // Naya
      { path: 'prescription', component: PrescriptionComponent },
      { path: 'about-us', component: AboutUsComponent }
];

