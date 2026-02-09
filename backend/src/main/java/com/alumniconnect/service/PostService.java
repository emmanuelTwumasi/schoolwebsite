package com.alumniconnect.service;

import com.alumniconnect.entity.Post;
import java.util.List;

public interface PostService {
    List<Post> findAll();
    Post save(Post post);
    void deleteById(Long id);
}
