import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsArticle } from '../../models/news-article.model';
import { Event as AppEvent } from '../../models/event.model';
import { Post } from '../../models/post.model';
import { NewsService } from '../../services/news.service';
import { EventService } from '../../services/event.service';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  recentNews$: Observable<NewsArticle[]> = of([]);
  upcomingEvents$: Observable<AppEvent[]> = of([]);
  recentForumPosts$: Observable<Post[]> = of([]);

  constructor(
    private newsService: NewsService,
    private eventService: EventService,
    private forumService: ForumService
  ) { }

  ngOnInit(): void {
    this.recentNews$ = this.newsService.getNewsForCurrentTenant().pipe(
      map(articles => articles.slice(0, 3))
    );
    this.upcomingEvents$ = this.eventService.getEventsForCurrentTenant().pipe(
      map(events => events.filter(event => new Date(event.date) >= new Date()).slice(0, 3))
    );
    this.recentForumPosts$ = this.forumService.getPostsForCurrentTenant().pipe(
      map(posts => posts.slice(0, 3))
    );
  }
}
