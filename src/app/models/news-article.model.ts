export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  publishDate: string; // Using string for simplicity, can be Date object
  imageUrl?: string;
  author?: string;
}
