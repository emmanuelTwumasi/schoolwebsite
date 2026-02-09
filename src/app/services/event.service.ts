import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) { }

  getEventsForCurrentTenant(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  searchEvents(searchTerm: string): Observable<Event[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<Event[]>(this.apiUrl, { params });
  }
}
