import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PhotoAlbum } from '../../models/photo-album.model';
import { PhotoService } from '../../services/photo.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album$: Observable<PhotoAlbum | undefined>;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      switchMap(params => {
        const albumId = Number(params.get('id'));
        return this.photoService.getPhotoAlbumById(albumId);
      })
    );
  }
}
