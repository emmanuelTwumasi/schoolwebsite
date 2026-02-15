import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event as AppEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements OnInit {
  events$: Observable<AppEvent[]> = of([]);
  selectedEvent: AppEvent | null = null;
  isEditing: boolean = false;

  newEvent: AppEvent = {
    id: 0,
    title: '',
    date: '',
    location: '',
    description: ''
  };

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events$ = this.eventService.getEventsForCurrentTenant();
  }

  editEvent(event: AppEvent): void {
    this.selectedEvent = { ...event };
    this.newEvent = { ...event };
    this.isEditing = true;
  }

  saveEvent(): void {
    console.log('Saving event (mock):', this.newEvent);
    this.resetForm();
    this.loadEvents();
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      console.log('Deleting event with ID (mock):', id);
      this.events$ = this.events$.pipe(
        map(events => events.filter(event => event.id !== id))
      );
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
