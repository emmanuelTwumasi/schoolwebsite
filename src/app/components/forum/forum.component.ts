import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.posts$ = this.forumService.getPostsForCurrentTenant();
  }
}
