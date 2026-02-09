import { Comment } from './comment.model';

export interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: string; // Using string for simplicity
  comments: Comment[];
}
