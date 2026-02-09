import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private currentTenant: string;

  constructor() {
    this.currentTenant = this.getTenantFromHost();
  }

  private getTenantFromHost(): string {
    const hostname = window.location.hostname;
    // For a real domain like 'stmarys.alumniconnect.com', the tenant is 'stmarys'
    const parts = hostname.split('.');
    if (parts.length >= 3) {
      return parts[0];
    }

    // Fallback for development (e.g., 'localhost')
    // You can simulate a tenant using a query parameter like: http://localhost:4200?tenant=stmarys
    const urlParams = new URLSearchParams(window.location.search);
    const tenantFromParam = urlParams.get('tenant');
    if (tenantFromParam) {
      return tenantFromParam;
    }

    return 'default'; // A fallback for when no tenant is detected
  }

  getCurrentTenant(): string {
    return this.currentTenant;
  }
}
