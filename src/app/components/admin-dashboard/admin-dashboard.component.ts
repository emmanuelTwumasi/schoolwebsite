import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Theme } from '../../models/theme.model';
import { ThemeService } from '../../services/theme.service';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';
import { NewsAdminComponent } from '../news-admin/news-admin.component';
import { EventsAdminComponent } from '../events-admin/events-admin.component';
import { PhotoAdminComponent } from '../photo-admin/photo-admin.component';
import { MemberAdminComponent } from '../member-admin/member-admin.component';
import { EmailAdminComponent } from '../email-admin/email-admin.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NewsAdminComponent, EventsAdminComponent, PhotoAdminComponent, MemberAdminComponent, EmailAdminComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentTheme$: Observable<Theme> = of();
  alumniMembers$: Observable<Alumni[]> = of([]);
  selectedAdminView: 'theme' | 'members' | 'news' | 'events' | 'photos' | 'email' = 'theme';

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
