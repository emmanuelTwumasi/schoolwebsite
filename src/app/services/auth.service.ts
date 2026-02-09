import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  username: string;
  roles: string[];
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response && response.token) {
          const user: User = {
            id: response.id,
            username: response.username,
            roles: response.roles,
            token: response.token
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }
        return false;
      })
    );
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, password, role: ['user'] }).pipe(
      map(() => {
        // After successful registration, we can either auto-login or redirect to login page
        // For a better UX, let's auto-login
        return this.login(username, password).pipe(map(() => true));
      })
    );
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
    return this.currentUserSubject.value?.roles.includes('ROLE_ADMIN') ?? false;
  }
}
