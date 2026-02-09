package com.alumniconnect.controller;

import com.alumniconnect.entity.PhotoAlbum;
import com.alumniconnect.service.PhotoAlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/gallery")
public class PhotoAlbumController {

    @Autowired
    private PhotoAlbumService photoAlbumService;

    @GetMapping
    public List<PhotoAlbum> getAllPhotoAlbums() {
        return photoAlbumService.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public PhotoAlbum createPhotoAlbum(@RequestBody PhotoAlbum photoAlbum) {
        return photoAlbumService.save(photoAlbum);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PhotoAlbum updatePhotoAlbum(@PathVariable Long id, @RequestBody PhotoAlbum photoAlbum) {
        photoAlbum.setId(id);
        return photoAlbumService.save(photoAlbum);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePhotoAlbum(@PathVariable Long id) {
        photoAlbumService.deleteById(id);
    }
}
