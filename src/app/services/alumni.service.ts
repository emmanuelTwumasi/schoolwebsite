import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alumni } from '../models/alumni.model';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams

@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  private apiUrl = 'http://localhost:8080/api/alumni';

  constructor(private http: HttpClient) { }

  getAlumniForCurrentTenant(): Observable<Alumni[]> {
    return this.http.get<Alumni[]>(this.apiUrl);
  }

  getAlumnusById(id: number): Observable<Alumni | undefined> {
    return this.http.get<Alumni>(`${this.apiUrl}/${id}`);
  }

  updateAlumnus(updatedAlumnus: Alumni): Observable<Alumni> {
    return this.http.put<Alumni>(`${this.apiUrl}/${updatedAlumnus.id}`, updatedAlumnus);
  }

  updateAlumniStatus(id: number, status: 'pending' | 'approved' | 'rejected'): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      map(() => true)
    );
  }

  updateAlumniRole(id: number, role: 'alumni' | 'admin'): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/${id}/role`, { role }).pipe(
      map(() => true)
    );
  }

  searchAlumni(searchTerm: string): Observable<Alumni[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<Alumni[]>(this.apiUrl, { params });
  }
}
