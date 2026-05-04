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
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        alert("Login Successful!");
        // User ka data ya token save karein
        localStorage.setItem('user', JSON.stringify(res));
        // Ab user authorized hai, toh home par bhej dein
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert("Invalid credentials. Please try again.");
      }
    });
  }
}
