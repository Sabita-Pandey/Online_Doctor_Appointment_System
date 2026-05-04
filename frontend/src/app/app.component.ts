import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // 1. RouterModule import karein
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Imports array mein RouterModule zaroor daalein warna router-outlet nahi chalega
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


 constructor(private router: Router) {}

  onLogout() {
      // Session clear karne ka logic (agar hai toh)
      alert("Logged out successfully!");

      this.router.navigate(['/login']);
    }
  addAccount() {
    this.router.navigate(['/register']);
  }

  }

