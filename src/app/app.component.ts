import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesRoutingModule } from "./courses/courses-routing.module";

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, CoursesRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-spring';

  }

