import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {
  }

  navigateToUpload() {
    this.router.navigate(['/upload']).catch(error => {
      console.error('Navigation error to upload:', error);
    });
  }
}