import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoAlbum } from '../../models/photo-album.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './photo-admin.component.html',
  styleUrls: ['./photo-admin.component.css']
})
export class PhotoAdminComponent implements OnInit {
  photoAlbums$: Observable<PhotoAlbum[]> = of([]);
  selectedAlbum: PhotoAlbum | null = null;
  isEditing: boolean = false;

  newAlbum: PhotoAlbum = {
    id: 0,
    title: '',
    description: '',
    coverPhotoUrl: '',
    photos: []
  };

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.loadPhotoAlbums();
  }

  loadPhotoAlbums(): void {
    this.photoAlbums$ = this.photoService.getPhotoAlbumsForCurrentTenant();
  }

  editAlbum(album: PhotoAlbum): void {
    this.selectedAlbum = { ...album };
    this.newAlbum = { ...album };
    this.isEditing = true;
  }

  saveAlbum(): void {
    console.log('Saving album (mock):', this.newAlbum);
    this.resetForm();
    this.loadPhotoAlbums();
  }

  deleteAlbum(id: number): void {
    if (confirm('Are you sure you want to delete this album?')) {
      console.log('Deleting album with ID (mock):', id);
      this.photoAlbums$ = this.photoAlbums$.pipe(
        map(albums => albums.filter(album => album.id !== id))
      );
    }
  }

  resetForm(): void {
    this.selectedAlbum = null;
    this.isEditing = false;
    this.newAlbum = {
      id: 0,
      title: '',
      description: '',
      coverPhotoUrl: '',
      photos: []
    };
  }
}
