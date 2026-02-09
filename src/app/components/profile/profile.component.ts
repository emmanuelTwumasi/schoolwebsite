import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  alumnus$: Observable<Alumni | undefined>;
  isEditing = false;
  editableAlumnus: Alumni | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumniService: AlumniService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // In a real app, the profile ID would come from the authenticated user
    // For now, we'll use a mock ID or a route parameter
    const loggedInUser = this.authService.currentUserValue;
    let profileId: number | null = null;

    if (loggedInUser) {
      // This is a simplification. In a real app, the user object from auth
      // would contain their alumni ID or we'd fetch it based on username.
      // For mock purposes, we'll assume 'alumniuser' maps to ID 1, 'adminuser' to ID 1 (or another admin ID)
      if (loggedInUser.username === 'alumniuser') {
        profileId = 1; // Mock ID for alumniuser
      } else if (loggedInUser.username === 'adminuser') {
        profileId = 1; // Mock ID for adminuser (can view/edit their own profile if they are also an alumnus)
      }
    }

    if (profileId) {
      this.alumnus$ = this.alumniService.getAlumnusById(profileId);
      this.alumnus$.subscribe(alumnus => {
        this.editableAlumnus = alumnus ? { ...alumnus } : undefined; // Clone for editing
      });
    } else {
      // If no logged-in user or no matching mock profile, redirect or show error
      this.router.navigate(['/login']); // Redirect to login if no profile can be determined
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.editableAlumnus) {
      // If cancelling edit, revert changes from the original alumnus$
      this.alumnus$.subscribe(alumnus => {
        this.editableAlumnus = alumnus ? { ...alumnus } : undefined;
      });
    }
  }

  saveProfile(): void {
    if (this.editableAlumnus) {
      this.alumniService.updateAlumnus(this.editableAlumnus).subscribe(
        updated => {
          console.log('Profile updated successfully (mock):', updated);
          this.alumnus$ = of(updated); // Update the observable with the new data
          this.isEditing = false;
        },
        error => {
          console.error('Error updating profile (mock):', error);
          // Handle error (e.g., show a message to the user)
        }
      );
    }
  }
}
