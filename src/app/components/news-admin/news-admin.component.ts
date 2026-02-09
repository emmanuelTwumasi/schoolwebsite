import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news.service';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit {
  newsArticles$: Observable<NewsArticle[]>;
  selectedArticle: NewsArticle | null = null;
  isEditing: boolean = false;

  // Form fields for new/edited article
  newArticle: NewsArticle = {
    id: 0, // Will be assigned by service
    title: '',
    content: '',
    publishDate: new Date().toISOString().substring(0, 10), // Default to today
    imageUrl: '',
    author: 'Admin' // Default author
  };

  constructor(
    private newsService: NewsService,
    private tenantService: TenantService // Needed for mock data logic
  ) { }

  ngOnInit(): void {
    this.loadNewsArticles();
  }

  loadNewsArticles(): void {
    this.newsArticles$ = this.newsService.getNewsForCurrentTenant();
  }

  editArticle(article: NewsArticle): void {
    this.selectedArticle = { ...article }; // Create a copy to avoid direct mutation
    this.newArticle = { ...article }; // Populate form with selected article data
    this.isEditing = true;
  }

  saveArticle(): void {
    if (this.isEditing && this.selectedArticle) {
      // Update existing article in mock data
      // In a real app, this would be an API call
      const currentTenant = this.tenantService.getCurrentTenant();
      // This is a simplified mock update. In a real service, you'd have an update method.
      // For now, we'll just reload to simulate a change.
      console.log('Updating article:', this.newArticle);
    } else {
      // Add new article to mock data
      // In a real app, this would be an API call
      this.newArticle.id = Math.floor(Math.random() * 100000) + 100; // Assign a mock ID
      console.log('Adding new article:', this.newArticle);
    }
    // Reset form and state
    this.resetForm();
    this.loadNewsArticles(); // Reload to reflect changes (mock)
  }

  deleteArticle(id: number): void {
    if (confirm('Are you sure you want to delete this article?')) {
      // In a real app, this would be an API call
      console.log('Deleting article with ID:', id);
      // Simulate deletion by filtering the observable (this is a hack for mock data)
      this.newsArticles$ = this.newsArticles$.pipe(
        of => of.filter(articles => articles.id !== id)
      );
      this.loadNewsArticles(); // Reload to reflect changes (mock)
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
