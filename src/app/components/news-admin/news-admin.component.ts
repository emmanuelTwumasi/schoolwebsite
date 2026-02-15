import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit {
  newsArticles$: Observable<NewsArticle[]> = of([]);
  selectedArticle: NewsArticle | null = null;
  isEditing: boolean = false;

  newArticle: NewsArticle = {
    id: 0,
    title: '',
    content: '',
    publishDate: new Date().toISOString().substring(0, 10),
    imageUrl: '',
    author: 'Admin'
  };

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNewsArticles();
  }

  loadNewsArticles(): void {
    this.newsArticles$ = this.newsService.getNewsForCurrentTenant();
  }

  editArticle(article: NewsArticle): void {
    this.selectedArticle = { ...article };
    this.newArticle = { ...article };
    this.isEditing = true;
  }

  saveArticle(): void {
    // In a real app, this would be a POST/PUT request
    console.log('Saving article (mock):', this.newArticle);
    this.resetForm();
    this.loadNewsArticles();
  }

  deleteArticle(id: number): void {
    if (confirm('Are you sure you want to delete this article?')) {
      console.log('Deleting article with ID (mock):', id);
      this.newsArticles$ = this.newsArticles$.pipe(
        map(articles => articles.filter(article => article.id !== id))
      );
    }
  }

  resetForm(): void {
    this.selectedArticle = null;
    this.isEditing = false;
    this.newArticle = {
      id: 0,
      title: '',
      content: '',
      publishDate: new Date().toISOString().substring(0, 10),
      imageUrl: '',
      author: 'Admin'
    };
  }
}
