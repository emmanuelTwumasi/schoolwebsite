import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  username: string;
  role: 'alumni' | 'admin';
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Mock users for demonstration
  private mockUsers: User[] = [
    { username: 'alumniuser', role: 'alumni', token: 'mock-alumni-token' },
    { username: 'adminuser', role: 'admin', token: 'mock-admin-token' }
  ];

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    // In a real app, this would be an API call to authenticate
    const user = this.mockUsers.find(u => u.username === username && password === 'password'); // Simple mock password check

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(true);
    }
    return of(false);
  }

  register(username: string, password: string): Observable<boolean> {
    // In a real app, this would be an API call to register a new user
    if (this.mockUsers.some(u => u.username === username)) {
      console.warn('Registration failed: Username already exists.');
      return of(false); // Username already exists
    }

    const newUser: User = { username, role: 'alumni', token: `mock-${username}-token` };
    this.mockUsers.push(newUser);
    console.log('Mock user registered:', newUser);
    // Automatically log in the new user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    this.currentUserSubject.next(newUser);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }
}
