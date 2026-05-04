import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtyService } from '../services/specialty.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-specialty-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.scss']
})
export class SpecialtyListComponent implements OnInit {
  allSpecialties: any[] = [];

  constructor(private specialtyService: SpecialtyService) {}

  ngOnInit(): void {
    this.specialtyService.getAllSpecialties().subscribe({
      next: (data: any[]) => {
        this.allSpecialties = data; // Yahan poora data assign hoga
      },
      error: (err: any) => console.error(err)
    });
  }
}
