import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:8080/api";

  savePatient(patientData: any) {
    return this.http.post(`${this.baseUrl}/patients/save`, patientData);
  }

  saveDoctor(doctorData: any) {
    return this.http.post(`${this.baseUrl}/doctors/save`, doctorData);
  }
}
