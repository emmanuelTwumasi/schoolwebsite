import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  registrationError = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.registrationError = false;
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.registrationError = true;
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.register(this.username, this.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/news']); // Redirect to news page on successful registration and login
        } else {
          this.registrationError = true;
          this.errorMessage = 'Registration failed. Username might already exist.';
        }
      },
      error => {
        console.error('Registration error:', error);
        this.registrationError = true;
        this.errorMessage = 'An unexpected error occurred during registration.';
      }
    );
  }
}
