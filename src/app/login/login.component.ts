import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Handle login functionality
  onLogin() {
    // Simple login check (this can be replaced with actual authentication logic)
    if (this.username === 'admin' && this.password === '12345') {
      // On successful login, navigate to the Employee Profile Management page
      this.router.navigate(['/employee-profile-management']);
    } else {
      alert('Invalid credentials'); // Show alert if login fails
    }
  }
}