import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const isLoggedIn = this.authService.login(this.username, this.password);
    if (isLoggedIn) {
      this.router.navigate(['/home']).catch(error => {
        console.error('Navigation error to home:', error);
      });
    } else {
      alert('Invalid credentials');
    }
  }
}
