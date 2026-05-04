import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID); // Platform ID check karne ke liye

  if (authService.isLoggedIn()) {
    return true; // Agar logged in hai toh jaane do
  } else {
    // Check karein ki kya hum browser mein hain
    if (isPlatformBrowser(platformId)) {
      alert("Please login first!"); // Server par ye line skip ho jayegi
    }

    router.navigate(['/login']);
    return false;
  }
};
