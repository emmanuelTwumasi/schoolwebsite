import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoAlbum } from '../models/photo-album.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiUrl = 'http://localhost:8080/api/gallery';

  constructor(private http: HttpClient) { }

  getPhotoAlbumsForCurrentTenant(): Observable<PhotoAlbum[]> {
    return this.http.get<PhotoAlbum[]>(this.apiUrl);
  }

  getPhotoAlbumById(id: number): Observable<PhotoAlbum | undefined> {
    return this.http.get<PhotoAlbum>(`${this.apiUrl}/${id}`);
  }
}
