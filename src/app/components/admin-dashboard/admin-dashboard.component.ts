import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../models/theme.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentTheme$: Observable<Theme>;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.currentTheme$ = this.themeService.getTheme();
  }
}
