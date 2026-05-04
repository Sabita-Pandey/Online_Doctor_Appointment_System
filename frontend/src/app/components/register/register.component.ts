import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Validation messages ke liye
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister(data: any) {
    // Backend default values (ERD status: Active)
    const payload = { ...data, status: 'Active' };

    this.authService.register(payload).subscribe({
      next: (res) => {
        alert("Registration Successful! Now you can Login.");
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Error details:", err);
        alert("Registration Failed! Please check if your Backend is running.");
      }
    });
  }
}
