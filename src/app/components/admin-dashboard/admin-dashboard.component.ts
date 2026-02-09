import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../models/theme.model';
import { ThemeService } from '../../services/theme.service';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentTheme$: Observable<Theme>;
  alumniMembers$: Observable<Alumni[]>;
  selectedAdminView: 'theme' | 'members' | 'news' | 'events' | 'photos' | 'email' = 'theme'; // Added 'email' view

  constructor(
    private themeService: ThemeService,
    private alumniService: AlumniService
  ) { }

  ngOnInit(): void {
    this.currentTheme$ = this.themeService.getTheme();
    this.alumniMembers$ = this.alumniService.getAlumniForCurrentTenant();
  }

  selectView(view: 'theme' | 'members' | 'news' | 'events' | 'photos' | 'email'): void {
    this.selectedAdminView = view;
  }
}
