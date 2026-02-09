import { Photo } from './photo.model';

export interface PhotoAlbum {
  id: number;
  title: string;
  description?: string;
  coverPhotoUrl?: string;
  photos: Photo[];
}
