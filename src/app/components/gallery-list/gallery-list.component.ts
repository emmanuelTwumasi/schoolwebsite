import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PhotoAlbum } from '../../models/photo-album.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-gallery-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  photoAlbums$: Observable<PhotoAlbum[]> = of([]);

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoAlbums$ = this.photoService.getPhotoAlbumsForCurrentTenant();
  }
}
