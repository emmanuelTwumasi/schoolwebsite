import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsArticles$: Observable<NewsArticle[]>;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsArticles$ = this.newsService.getNewsForCurrentTenant();
  }
}
