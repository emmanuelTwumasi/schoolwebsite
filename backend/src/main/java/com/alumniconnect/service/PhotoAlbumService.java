package com.alumniconnect.service;

import com.alumniconnect.entity.PhotoAlbum;
import java.util.List;

public interface PhotoAlbumService {
    List<PhotoAlbum> findAll();
    PhotoAlbum save(PhotoAlbum photoAlbum);
    void deleteById(Long id);
}
