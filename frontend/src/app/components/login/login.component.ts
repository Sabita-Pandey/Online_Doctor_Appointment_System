import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // loginData.email dono kaam karega: Login ke liye bhi aur Forgot Password ke liye bhi
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  // Yeh function "Login" button ke liye hai
  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        alert("Login Successful!");
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert("Invalid credentials. Please try again.");
      }
    });
  }

  // Yeh naya function "Forget Password?" link ke liye hai
  onForgotPassword() {
    if (!this.loginData.email) {
      alert("Write your email address in the first email box!");
      return;
    }

    this.authService.forgotPassword(this.loginData.email).subscribe({
      next: (response) => {
        console.log('Email sent!', response);
        alert('"The password reset link has been sent to your email. Please check your inbox!');
      },
      error: (err) => {
        console.error('Error!', err);
        alert('Error: The email is either not registered or there is a server issue.');
      }
    });
  }
}
