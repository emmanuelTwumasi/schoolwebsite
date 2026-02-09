import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiUrl = 'http://localhost:8080/api/forum';

  constructor(private http: HttpClient) { }

  getPostsForCurrentTenant(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
