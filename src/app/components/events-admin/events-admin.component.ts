import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements OnInit {
  events$: Observable<Event[]>;
  selectedEvent: Event | null = null;
  isEditing: boolean = false;

  // Form fields for new/edited event
  newEvent: Event = {
    id: 0, // Will be assigned by service
    title: '',
    date: '',
    location: '',
    description: ''
  };

  constructor(
    private eventService: EventService,
    private tenantService: TenantService // Needed for mock data logic
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events$ = this.eventService.getEventsForCurrentTenant();
  }

  editEvent(event: Event): void {
    this.selectedEvent = { ...event }; // Create a copy to avoid direct mutation
    this.newEvent = { ...event }; // Populate form with selected event data
    this.isEditing = true;
  }

  saveEvent(): void {
    if (this.isEditing && this.selectedEvent) {
      // Update existing event in mock data
      // In a real app, this would be an API call
      const currentTenant = this.tenantService.getCurrentTenant();
      // This is a simplified mock update. In a real service, you'd have an update method.
      // For now, we'll just reload to simulate a change.
      console.log('Updating event:', this.newEvent);
    } else {
      // Add new event to mock data
      // In a real app, this would be an API call
      this.newEvent.id = Math.floor(Math.random() * 100000) + 100; // Assign a mock ID
      console.log('Adding new event:', this.newEvent);
    }
    // Reset form and state
    this.resetForm();
    this.loadEvents(); // Reload to reflect changes (mock)
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      // In a real app, this would be an API call
      console.log('Deleting event with ID:', id);
      // Simulate deletion by filtering the observable (this is a hack for mock data)
      this.events$ = this.events$.pipe(
        of => of.filter(events => events.id !== id)
      );
      this.loadEvents(); // Reload to reflect changes (mock)
    }
  }

  resetForm(): void {
    this.selectedEvent = null;
    this.isEditing = false;
    this.newEvent = {
      id: 0,
      title: '',
      date: '',
      location: '',
      description: ''
    };
  }
}
