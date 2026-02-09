import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsArticles$: Observable<NewsArticle[]>;
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsArticles$ = this.searchTermSubject.pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Only emit if value is different from previous value
      switchMap((term: string) => this.newsService.searchNews(term))
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermSubject.next(inputElement.value);
  }
}
