import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  // Password visibility toggles
  showPassword = false;
  showConfirmPassword = false;

  // We will map the form value directly to this method
  onRegister(formValue: any) {
    // 1. Check if passwords match before sending to API
    if (formValue.password !== formValue.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 2. Prepare payload (excluding the confirmPassword field)
    const payload = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      role: formValue.role,
      status: 'Active'
    };

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        alert("Registration successful!");
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error("Registration Error:", err);
        alert("Registration failed. Please try again.");
      }
    });
  }
}
