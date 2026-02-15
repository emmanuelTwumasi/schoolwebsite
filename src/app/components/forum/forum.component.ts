import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/post.model';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.posts$ = this.forumService.getPostsForCurrentTenant();
  }
}
