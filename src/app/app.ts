import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { Theme } from './models/theme.model';
import { Observable, of } from 'rxjs';
import { AuthService, User } from './services/auth.service';
import { Router } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  theme$: Observable<Theme> = of();
  currentUser$: Observable<User | null> = of(null);

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.theme$ = this.themeService.getTheme();
    this.currentUser$ = this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
