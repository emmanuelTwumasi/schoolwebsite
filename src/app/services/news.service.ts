import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../models/news-article.model';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private allNewsArticles: NewsArticle[] = [
    // St. Mary's News
    {
      id: 1,
      title: 'Principal\'s Message: A New Academic Year',
      content: 'Welcome back, alumni! The new academic year is off to a great start...',
      publishDate: '2024-09-01',
      imageUrl: 'assets/news/stmarys-principal.jpg',
      author: 'Principal Jane Doe'
    },
    {
      id: 2,
      title: 'Alumni Fundraiser Exceeds Expectations!',
      content: 'Thanks to your generous contributions, our annual fundraiser has surpassed its goal...',
      publishDate: '2024-08-20',
      imageUrl: 'assets/news/stmarys-fundraiser.jpg',
      author: 'Alumni Relations Office'
    },
    // Northwood High News
    {
      id: 3,
      title: 'Northwood High Celebrates 50 Years!',
      content: 'Join us in celebrating half a century of excellence. Details on upcoming events inside!',
      publishDate: '2024-07-15',
      imageUrl: 'assets/news/northwood-50years.jpg',
      author: 'Northwood High Administration'
    },
  ];

  private tenantNewsMap: Map<string, number[]> = new Map([
    ['stmarys', [1, 2]],
    ['northwoodhigh', [3]]
  ]);

  constructor(private tenantService: TenantService) { }

  getNewsForCurrentTenant(): Observable<NewsArticle[]> {
    const tenant = this.tenantService.getCurrentTenant();
    const newsIds = this.tenantNewsMap.get(tenant) || [];

    const filteredNews = this.allNewsArticles.filter(article => newsIds.includes(article.id));

    return of(filteredNews);
  }
}
