import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // 'of' ko yahan import zaroor karein

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private apiUrl = 'http://localhost:8080/api'; // Aapka backend URL

  constructor(private http: HttpClient) { }

  // Purana getAllSpecialties() agar hai toh use hata kar ye likhein:
  getAllSpecialties(): Observable<any[]> {
    // Jab tak backend ready nahi hai, ye dummy data kaam karega
    const dummy = [
      { name: 'Cardiology', iconUrl: 'assets/heart.png' },
      { name: 'Neurology', iconUrl: 'assets/brain.png' },
      { name: 'Pediatrics', iconUrl: 'assets/child.png' },
      { name: 'Ophthalmology', iconUrl: 'assets/eye.png' },
      { name: 'Orthopedic', iconUrl: 'assets/bone.png' },
      { name: 'Dermatology', iconUrl: 'assets/skin.png' }
    ];

    return of(dummy); // Yeh dummy array ko Observable mein badal deta hai
  }
}
