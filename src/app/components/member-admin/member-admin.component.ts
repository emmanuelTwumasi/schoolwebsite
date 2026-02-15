import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-member-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-admin.component.html',
  styleUrls: ['./member-admin.component.css']
})
export class MemberAdminComponent implements OnInit {
  alumniMembers$: Observable<Alumni[]> = of([]);

  constructor(private alumniService: AlumniService) { }

  ngOnInit(): void {
    this.loadAlumniMembers();
  }

  loadAlumniMembers(): void {
    this.alumniMembers$ = this.alumniService.getAlumniForCurrentTenant();
  }

  approveMember(id: number): void {
    this.alumniService.updateAlumniStatus(id, 'approved').subscribe(() => {
      this.loadAlumniMembers();
    });
  }

  rejectMember(id: number): void {
    this.alumniService.updateAlumniStatus(id, 'rejected').subscribe(() => {
      this.loadAlumniMembers();
    });
  }

  changeRole(id: number, role: 'alumni' | 'admin'): void {
    this.alumniService.updateAlumniRole(id, role).subscribe(() => {
      this.loadAlumniMembers();
    });
  }
}
