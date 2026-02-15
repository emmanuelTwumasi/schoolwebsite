import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
          this.router.navigate(['/dashboard']);
        } else {
          this.registrationError = true;
          this.errorMessage = 'Registration failed. Username might already exist.';
        }
      },
      () => {
        this.registrationError = true;
        this.errorMessage = 'An unexpected error occurred during registration.';
      }
    );
  }
}
