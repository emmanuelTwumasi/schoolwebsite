import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alumni } from '../models/alumni.model';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  // Mock data for different tenants
  private allAlumni: Alumni[] = [
    // St. Mary's Alumni
    { id: 1, name: 'John Smith', graduationYear: 2010, email: 'john.smith@example.com', currentCity: 'New York, NY', profilePictureUrl: 'assets/profiles/john-smith.jpg' },
    { id: 2, name: 'Jane Doe', graduationYear: 2012, email: 'jane.doe@example.com', currentCity: 'Los Angeles, CA' },
    { id: 3, name: 'Peter Jones', graduationYear: 2010, email: 'peter.jones@example.com', currentCity: 'Chicago, IL', profilePictureUrl: 'assets/profiles/peter-jones.jpg' },

    // Northwood High Alumni
    { id: 4, name: 'Emily White', graduationYear: 2015, email: 'emily.white@example.com', currentCity: 'Houston, TX' },
    { id: 5, name: 'Michael Brown', graduationYear: 2016, email: 'michael.brown@example.com', currentCity: 'Phoenix, AZ', profilePictureUrl: 'assets/profiles/michael-brown.jpg' },
  ];

  // A mapping to associate alumni with tenants
  private tenantAlumniMap: Map<string, number[]> = new Map([
    ['stmarys', [1, 2, 3]],
    ['northwoodhigh', [4, 5]]
  ]);

  constructor(private tenantService: TenantService) { }

  getAlumniForCurrentTenant(): Observable<Alumni[]> {
    const tenant = this.tenantService.getCurrentTenant();
    const alumniIds = this.tenantAlumniMap.get(tenant) || [];

    const filteredAlumni = this.allAlumni.filter(alumni => alumniIds.includes(alumni.id));

    return of(filteredAlumni);
  }
}
