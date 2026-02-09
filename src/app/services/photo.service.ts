import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PhotoAlbum } from '../models/photo-album.model';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private allPhotoAlbums: PhotoAlbum[] = [
    // St. Mary's Albums
    {
      id: 1,
      title: 'St. Mary\'s Grand Reunion 2023',
      description: 'Photos from the fantastic 2023 Grand Reunion!',
      coverPhotoUrl: 'assets/galleries/stmarys-reunion-2023-cover.jpg',
      photos: [
        { id: 101, url: 'assets/galleries/stmarys-reunion-2023-1.jpg', caption: 'Group photo at the entrance' },
        { id: 102, url: 'assets/galleries/stmarys-reunion-2023-2.jpg', caption: 'Dinner speeches' },
        { id: 103, url: 'assets/galleries/stmarys-reunion-2023-3.jpg', caption: 'Alumni catching up' },
      ]
    },
    {
      id: 2,
      title: 'St. Mary\'s Sports Day 2022',
      description: 'Memories from the annual sports day.',
      coverPhotoUrl: 'assets/galleries/stmarys-sports-2022-cover.jpg',
      photos: [
        { id: 201, url: 'assets/galleries/stmarys-sports-2022-1.jpg', caption: 'Football match' },
        { id: 202, url: 'assets/galleries/stmarys-sports-2022-2.jpg', caption: 'Award ceremony' },
      ]
    },
    // Northwood High Albums
    {
      id: 3,
      title: 'Northwood High Prom Night 2015',
      description: 'Throwback to a memorable prom!',
      coverPhotoUrl: 'assets/galleries/northwood-prom-2015-cover.jpg',
      photos: [
        { id: 301, url: 'assets/galleries/northwood-prom-2015-1.jpg', caption: 'Prom King and Queen' },
        { id: 302, url: 'assets/galleries/northwood-prom-2015-2.jpg', caption: 'Dancing the night away' },
      ]
    },
  ];

  private tenantAlbumMap: Map<string, number[]> = new Map([
    ['stmarys', [1, 2]],
    ['northwoodhigh', [3]]
  ]);

  constructor(private tenantService: TenantService) { }

  getPhotoAlbumsForCurrentTenant(): Observable<PhotoAlbum[]> {
    const tenant = this.tenantService.getCurrentTenant();
    const albumIds = this.tenantAlbumMap.get(tenant) || [];

    const filteredAlbums = this.allPhotoAlbums.filter(album => albumIds.includes(album.id));

    return of(filteredAlbums);
  }

  getPhotoAlbumById(id: number): Observable<PhotoAlbum | undefined> {
    const tenant = this.tenantService.getCurrentTenant();
    const albumIds = this.tenantAlbumMap.get(tenant) || [];

    const album = this.allPhotoAlbums.find(a => a.id === id && albumIds.includes(a.id));
    return of(album);
  }
}
