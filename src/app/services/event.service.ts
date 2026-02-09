import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private allEvents: Event[] = [
    // St. Mary's Events
    { id: 1, title: 'Annual Grand Reunion 2024', date: '2024-10-26T18:00:00', location: 'Grand Hotel Ballroom', description: 'Join us for our biggest event of the year!' },
    { id: 2, title: 'Class of 2010: 15-Year Reunion', date: '2025-08-15T19:00:00', location: 'The Downtown Club', description: 'A special night for the class of 2010.' },

    // Northwood High Events
    { id: 3, title: 'Homecoming Tailgate Party', date: '2024-09-20T15:00:00', location: 'Northwood High Parking Lot', description: 'Cheer on the Eagles and catch up with old friends.' },
  ];

  private tenantEventMap: Map<string, number[]> = new Map([
    ['stmarys', [1, 2]],
    ['northwoodhigh', [3]]
  ]);

  constructor(private tenantService: TenantService) { }

  getEventsForCurrentTenant(): Observable<Event[]> {
    const tenant = this.tenantService.getCurrentTenant();
    const eventIds = this.tenantEventMap.get(tenant) || [];

    const filteredEvents = this.allEvents.filter(event => eventIds.includes(event.id));

    return of(filteredEvents);
  }
}
