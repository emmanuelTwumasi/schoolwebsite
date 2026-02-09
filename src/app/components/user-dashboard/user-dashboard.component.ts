import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsArticle } from '../../models/news-article.model';
import { Event } from '../../models/event.model';
import { Post } from '../../models/post.model';
import { NewsService } from '../../services/news.service';
import { EventService } from '../../services/event.service';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  recentNews$: Observable<NewsArticle[]>;
  upcomingEvents$: Observable<Event[]>;
  recentForumPosts$: Observable<Post[]>;

  constructor(
    private newsService: NewsService,
    private eventService: EventService,
    private forumService: ForumService
  ) { }

  ngOnInit(): void {
    this.recentNews$ = this.newsService.getNewsForCurrentTenant().pipe(
      map(articles => articles.slice(0, 3)) // Get top 3 recent news
    );
    this.upcomingEvents$ = this.eventService.getEventsForCurrentTenant().pipe(
      map(events => events.filter(event => new Date(event.date) >= new Date()).slice(0, 3)) // Get top 3 upcoming events
    );
    this.recentForumPosts$ = this.forumService.getPostsForCurrentTenant().pipe(
      map(posts => posts.slice(0, 3)) // Get top 3 recent forum posts
    );
  }
}
