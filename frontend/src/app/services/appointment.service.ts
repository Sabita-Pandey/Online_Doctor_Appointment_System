import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // <--- Yeh line add karna zaroori hai

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = "http://localhost:8080/api/appointments";

  constructor(private http: HttpClient) { }

  // 1. Purana function (Booking save karne ke liye)
  saveBooking(data: any) {
    return this.http.post(`${this.apiUrl}/book`, data);
  }

  // 2. Naya function (Booked appointments fetch karne ke liye)
  // Ise saveBooking ke niche yahan likhein:
  getPatientAppointments(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/booked/${id}`);
  }

deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

getAllDoctors(): Observable<any[]> {
  return this.http.get<any[]>("http://localhost:8080/api/doctors/all");
}

// Naya doctor database mein save karne ke liye
addDoctor(doctorObj: any): Observable<any> {
  return this.http.post("http://localhost:8080/api/doctors/save", doctorObj);
}

// Baki functions ke niche ise add karein
updateAppointmentStatus(id: number, status: string) {
  const url = `http://localhost:8080/api/appointments/${id}/status?status=${status}`;
  // 'responseType: text' add karne se Angular crash nahi hoga
  return this.http.put(url, {}, { responseType: 'text' });
}

}
