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
import { authGuard } from './auth.guard';

export const routes: Routes = [
  // Public Routes (Bina login ke dikhenge)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about-us', component: AboutUsComponent },

  // Protected Routes (Sirf login ke baad dikhenge)
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'all-specialties', component: SpecialtyListComponent, canActivate: [authGuard] },
  { path: 'patient-form', component: PatientFormComponent, canActivate: [authGuard] },
  { path: 'doctor-form', component: DoctorFormComponent, canActivate: [authGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [authGuard] },
  { path: 'doctor-appointments', component: DoctorAppointmentsComponent, canActivate: [authGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'prescription', component: PrescriptionComponent, canActivate: [authGuard] },
  { path: 'booked', component: DoctorAppointmentsComponent, canActivate: [authGuard] },

  // Default Route (Jab site khule toh login par jaye)
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Wildcard Route (Agar koi galat URL dale toh login par bheje)
  { path: '**', redirectTo: 'login' }
];
