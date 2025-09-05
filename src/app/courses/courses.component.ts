import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importando o Router para navegação
import { MatToolbarModule } from '@angular/material/toolbar';  // Módulo de toolbar do Angular Material
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatToolbarModule,CommonModule
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  constructor(private router: Router){}
  onClick() {
    this.router.navigate(['loginUser']);}
}
