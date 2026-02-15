import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  alumnus$: Observable<Alumni | undefined> = of(undefined);
  isEditing = false;
  editableAlumnus: Alumni | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumniService: AlumniService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const loggedInUser = this.authService.currentUserValue;
    let profileId: number | null = null;

    if (loggedInUser) {
      if (loggedInUser.username === 'alumniuser') {
        profileId = 1;
      } else if (loggedInUser.username === 'adminuser') {
        profileId = 1;
      }
    }

    if (profileId) {
      this.alumnus$ = this.alumniService.getAlumnusById(profileId);
      this.alumnus$.subscribe(alumnus => {
        this.editableAlumnus = alumnus ? { ...alumnus } : undefined;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.editableAlumnus) {
      this.alumnus$.subscribe(alumnus => {
        this.editableAlumnus = alumnus ? { ...alumnus } : undefined;
      });
    }
  }

  saveProfile(): void {
    if (this.editableAlumnus) {
      this.alumniService.updateAlumnus(this.editableAlumnus).subscribe(
        updated => {
          this.alumnus$ = of(updated);
          this.isEditing = false;
        }
      );
    }
  }
}
