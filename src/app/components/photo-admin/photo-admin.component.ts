import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PhotoAlbum } from '../../models/photo-album.model';
import { PhotoService } from '../../services/photo.service';
import { TenantService } from '../../services/tenant.service'; // Needed for mock data logic

@Component({
  selector: 'app-photo-admin',
  templateUrl: './photo-admin.component.html',
  styleUrls: ['./photo-admin.component.css']
})
export class PhotoAdminComponent implements OnInit {
  photoAlbums$: Observable<PhotoAlbum[]>;
  selectedAlbum: PhotoAlbum | null = null;
  isEditing: boolean = false;

  // Form fields for new/edited album
  newAlbum: PhotoAlbum = {
    id: 0, // Will be assigned by service
    title: '',
    description: '',
    coverPhotoUrl: '',
    photos: []
  };

  constructor(
    private photoService: PhotoService,
    private tenantService: TenantService // Needed for mock data logic
  ) { }

  ngOnInit(): void {
    this.loadPhotoAlbums();
  }

  loadPhotoAlbums(): void {
    this.photoAlbums$ = this.photoService.getPhotoAlbumsForCurrentTenant();
  }

  editAlbum(album: PhotoAlbum): void {
    this.selectedAlbum = { ...album }; // Create a copy to avoid direct mutation
    this.newAlbum = { ...album }; // Populate form with selected album data
    this.isEditing = true;
  }

  saveAlbum(): void {
    if (this.isEditing && this.selectedAlbum) {
      // Update existing album in mock data
      // In a real app, this would be an API call
      const currentTenant = this.tenantService.getCurrentTenant();
      // This is a simplified mock update. In a real service, you'd have an update method.
      // For now, we'll just reload to simulate a change.
      console.log('Updating album:', this.newAlbum);
    } else {
      // Add new album to mock data
      // In a real app, this would be an API call
      this.newAlbum.id = Math.floor(Math.random() * 100000) + 100; // Assign a mock ID
      console.log('Adding new album:', this.newAlbum);
    }
    // Reset form and state
    this.resetForm();
    this.loadPhotoAlbums(); // Reload to reflect changes (mock)
  }

  deleteAlbum(id: number): void {
    if (confirm('Are you sure you want to delete this album?')) {
      // In a real app, this would be an API call
      console.log('Deleting album with ID:', id);
      // Simulate deletion by filtering the observable (this is a hack for mock data)
      this.photoAlbums$ = this.photoAlbums$.pipe(
        of => of.filter(albums => albums.id !== id)
      );
      this.loadPhotoAlbums(); // Reload to reflect changes (mock)
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
