import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // FormsModule import karein
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule], // Yahan FormsModule add karein
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
 loginData = {
   email: '',
   password:''
   };
  onLogin(data: any) {
    this.authService.login(data).subscribe({
      next: (res: any) => {
        alert("Login Successful!");
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        alert("Invalid Credentials!");
      }
    });
  }

onSubmit() {
  this.authService.login(this.loginData).subscribe({
    next: (response: any) => {
      // 1. Alert dikhayega
      alert("Login Successful!");

      // 2. Direct Home page par bhej dega (Yahi line missing hogi shayad)
      this.router.navigate(['/home']);

      console.log("Navigating to dashboard...");
    },
    error: (err) => {
      console.error(err);
      alert("Invalid Credentials! Please check email/password.");
    }
  });
}
}
