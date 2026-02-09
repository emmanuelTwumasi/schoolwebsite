import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsArticle } from '../models/news-article.model';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://localhost:8080/api/news';

  constructor(private http: HttpClient) { }

  getNewsForCurrentTenant(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(this.apiUrl);
  }

  searchNews(searchTerm: string): Observable<NewsArticle[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<NewsArticle[]>(this.apiUrl, { params });
  }
}
