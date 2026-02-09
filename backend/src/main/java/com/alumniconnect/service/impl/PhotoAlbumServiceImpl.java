package com.alumniconnect.service.impl;

import com.alumniconnect.entity.PhotoAlbum;
import com.alumniconnect.repository.PhotoAlbumRepository;
import com.alumniconnect.service.PhotoAlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoAlbumServiceImpl implements PhotoAlbumService {

    @Autowired
    private PhotoAlbumRepository photoAlbumRepository;

    @Override
    public List<PhotoAlbum> findAll() {
        return photoAlbumRepository.findAll();
    }

    @Override
    public PhotoAlbum save(PhotoAlbum photoAlbum) {
        return photoAlbumRepository.save(photoAlbum);
    }

    @Override
    public void deleteById(Long id) {
        photoAlbumRepository.deleteById(id);
    }
}
