import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SpecialtyService } from '../../services/specialty.service'; // Path sahi check kar lena
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Aapka purana extension .scss tha toh wahi rehne dein
})
export class HomeComponent implements OnInit {

searchQuery: string = '';

showData: boolean = false;

toggleData() {
    this.showData = !this.showData;
  }

  // 1. Purana Doctors Data (As it is)
  doctors = [
    { name: 'Dr. Rahul Sharma', spec: 'Cardiologist', exp: '10 years', img: 'assets/doc1.png' },
    { name: 'Dr. Priya Verma', spec: 'Dermatologist', exp: '8 years', img: 'assets/doc2.png' },
    { name: 'Dr. Amit Gupta', spec: 'Neurologist', exp: '12 years', img: 'assets/doc3.png' },
    { name: 'Dr. Sneha Kapoor', spec: 'Pediatrician', exp: '5 years', img: 'assets/doc4.png' },
    { name: 'Dr. Vikash Singh', spec: 'Orthopedic', exp: '15 years', img: 'assets/doc5.png' }
  ];

  // 2. Naya Specialties Array
  specialties = [
    { name: 'Cardiology', icon: 'fa-heart', color: 'red' },
    { name: 'Neurology', icon: 'fa-brain', color: 'purple' },
    { name: 'Pediatrics', icon: 'fa-child', color: 'blue' },
    { name: 'Ophthalmology', icon: 'fa-eye', color: 'green' }
  ];
  // 3. Dono Services ko Constructor mein inject karein
  constructor(
    private router: Router,
    private specialtyService: SpecialtyService
  ) {}

onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      console.log('Searching for:', query);
      // Example: Agar 'cardiology' search kiya toh Specialties page par bhej dega
      this.router.navigate(['/all-specialties']);
    } else {
      alert('Please enter a doctor name or specialty!');
    }
  }

  // 4. Page load hote hi specialties fetch karein
  ngOnInit(): void {
    this.loadSpecialties();
  }

  loadSpecialties(): void {
    this.specialtyService.getAllSpecialties().subscribe({
      next: (data) => {
        // Sirf top 4 specialties dikhayenge
        this.specialties = data.slice(0, 4);
      },
      error: (err) => {
        console.error('Error fetching specialties', err);
      }
    });
  }


  // 5. Purana Function (As it is)
  goToPatientForm() {
    this.router.navigate(['/patient-form']);
  }
}
