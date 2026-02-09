import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { Theme } from './models/theme.model';
import { Observable } from 'rxjs';
import { AuthService, User } from './services/auth.service'; // Import AuthService and User model
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  theme$: Observable<Theme>;
  currentUser$: Observable<User | null>; // Observable for current user

  constructor(
    private themeService: ThemeService,
    private authService: AuthService, // Inject AuthService
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    this.theme$ = this.themeService.getTheme();
    this.currentUser$ = this.authService.currentUser; // Subscribe to currentUser changes
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
