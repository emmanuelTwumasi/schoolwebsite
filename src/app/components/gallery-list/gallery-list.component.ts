import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoAlbum } from '../../models/photo-album.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {
  photoAlbums$: Observable<PhotoAlbum[]>;

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoAlbums$ = this.photoService.getPhotoAlbumsForCurrentTenant();
  }
}
