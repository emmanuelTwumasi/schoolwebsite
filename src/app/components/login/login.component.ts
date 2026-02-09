import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loginError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // If already logged in, redirect to news or home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/news']);
    }
  }

  onSubmit(): void {
    this.loginError = false;
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/news']); // Redirect to news page on successful login
        } else {
          this.loginError = true;
        }
      },
      error => {
        console.error('Login error:', error);
        this.loginError = true;
      }
    );
  }
}
