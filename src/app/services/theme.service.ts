import { Injectable } from '@angular/core';
import { TenantService } from './tenant.service';
import { Theme } from '../models/theme.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themes: Map<string, Theme> = new Map([
    ['stmarys', {
      name: 'stmarys',
      logoUrl: 'assets/logos/stmarys-logo.png',
      colorPrimary: '#003366', // Dark Blue
      colorSecondary: '#FFD700', // Gold
      bannerImageUrl: 'assets/banners/stmarys-banner.jpg'
    }],
    ['northwoodhigh', {
      name: 'northwoodhigh',
      logoUrl: 'assets/logos/northwood-logo.png',
      colorPrimary: '#006400', // Dark Green
      colorSecondary: '#FFFFFF', // White
      bannerImageUrl: 'assets/banners/northwood-banner.jpg'
    }],
    ['default', {
      name: 'default',
      logoUrl: 'assets/logos/default-logo.png',
      colorPrimary: '#4A4A4A', // Grey
      colorSecondary: '#FFFFFF', // White
    }]
  ]);

  constructor(private tenantService: TenantService) { }

  getTheme(): Observable<Theme> {
    const tenant = this.tenantService.getCurrentTenant();
    const theme = this.themes.get(tenant) || this.themes.get('default');
    return of(theme as Theme);
  }
}
