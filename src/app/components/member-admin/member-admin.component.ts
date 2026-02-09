import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-member-admin',
  templateUrl: './member-admin.component.html',
  styleUrls: ['./member-admin.component.css']
})
export class MemberAdminComponent implements OnInit {
  alumniMembers$: Observable<Alumni[]>;

  constructor(private alumniService: AlumniService) { }

  ngOnInit(): void {
    this.loadAlumniMembers();
  }

  loadAlumniMembers(): void {
    this.alumniMembers$ = this.alumniService.getAlumniForCurrentTenant();
  }

  approveMember(id: number): void {
    this.alumniService.updateAlumniStatus(id, 'approved').subscribe(() => {
      this.loadAlumniMembers(); // Reload to reflect changes
    });
  }

  rejectMember(id: number): void {
    this.alumniService.updateAlumniStatus(id, 'rejected').subscribe(() => {
      this.loadAlumniMembers(); // Reload to reflect changes
    });
  }

  changeRole(id: number, role: 'alumni' | 'admin'): void {
    this.alumniService.updateAlumniRole(id, role).subscribe(() => {
      this.loadAlumniMembers(); // Reload to reflect changes
    });
  }
}
