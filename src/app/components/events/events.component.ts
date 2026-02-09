import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events$: Observable<Event[]>;
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events$ = this.searchTermSubject.pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Only emit if value is different from previous value
      switchMap((term: string) => this.eventService.searchEvents(term))
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermSubject.next(inputElement.value);
  }
}
