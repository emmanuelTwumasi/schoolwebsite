import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Event as AppEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events$: Observable<AppEvent[]> = of([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events$ = this.searchTermSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.eventService.searchEvents(term))
    );
    this.searchTermSubject.next(''); // Initial load
  }

  onSearch(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermSubject.next(inputElement.value);
  }
}
