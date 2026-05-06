import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = "http://localhost:8080/api/auth";

  // PLATFORM_ID ko inject kiya taaki hum browser vs server check kar sakein
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Sirf browser mein localStorage use karein
        if (response && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(response));
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // Ye method har device par session check karega
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Browser environment mein session check karein
      return !!localStorage.getItem('user');
    }
    // Server environment (SSR) mein false return karein taaki app crash na ho
    return false;
  }

  // Logout functionality
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }
forgotPassword(email: string) {
  // Backend endpoint ka URL sahi hona chahiye
  return this.http.post('http://localhost:8080/api/auth/forgot-password', { email });
}

}
