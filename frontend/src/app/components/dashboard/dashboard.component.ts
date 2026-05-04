import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // RouterModule zaruri hai buttons ke liye

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule], // RouterLink kaam karne ke liye ye add karein
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user'); // User data clear karein
    alert("Logged out successfully!");
    this.router.navigate(['/']); // Login page par vapas bhejein
  }
}
