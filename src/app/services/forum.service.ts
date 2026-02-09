import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private allPosts: Post[] = [
    // St. Mary's Posts
    {
      id: 1,
      author: 'John Smith',
      title: 'Memories from the 2010 Graduation',
      content: 'Does anyone remember the hilarious speech by Professor Davis? Good times!',
      timestamp: '2024-03-10T10:00:00',
      comments: [
        { id: 101, author: 'Jane Doe', content: 'Oh yes! I still laugh thinking about it.', timestamp: '2024-03-10T10:30:00' },
        { id: 102, author: 'Peter Jones', content: 'He was the best! Miss those days.', timestamp: '2024-03-10T11:00:00' },
      ]
    },
    {
      id: 2,
      author: 'Alumni Admin',
      title: 'Seeking Volunteers for Annual Gala',
      content: 'We are looking for enthusiastic alumni to help organize our upcoming annual gala. Please reach out if interested!',
      timestamp: '2024-03-05T14:00:00',
      comments: []
    },
    // Northwood High Posts
    {
      id: 3,
      author: 'Emily White',
      title: 'Who\'s coming to the Homecoming game?',
      content: 'Excited for Homecoming! Let\'s meet up before the game!',
      timestamp: '2024-03-12T09:00:00',
      comments: [
        { id: 301, author: 'Michael Brown', content: 'I\'ll be there! Looking forward to it.', timestamp: '2024-03-12T09:45:00' },
      ]
    },
  ];

  private tenantPostMap: Map<string, number[]> = new Map([
    ['stmarys', [1, 2]],
    ['northwoodhigh', [3]]
  ]);

  constructor(private tenantService: TenantService) { }

  getPostsForCurrentTenant(): Observable<Post[]> {
    const tenant = this.tenantService.getCurrentTenant();
    const postIds = this.tenantPostMap.get(tenant) || [];

    const filteredPosts = this.allPosts.filter(post => postIds.includes(post.id));

    return of(filteredPosts);
  }
}
