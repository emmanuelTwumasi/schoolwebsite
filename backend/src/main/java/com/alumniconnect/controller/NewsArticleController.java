package com.alumniconnect.controller;

import com.alumniconnect.entity.NewsArticle;
import com.alumniconnect.service.NewsArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/news")
public class NewsArticleController {

    @Autowired
    private NewsArticleService newsArticleService;

    @GetMapping
    public List<NewsArticle> getAllNewsArticles() {
        return newsArticleService.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public NewsArticle createNewsArticle(@RequestBody NewsArticle newsArticle) {
        return newsArticleService.save(newsArticle);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public NewsArticle updateNewsArticle(@PathVariable Long id, @RequestBody NewsArticle newsArticle) {
        // Additional logic to ensure the ID is set correctly
        newsArticle.setId(id);
        return newsArticleService.save(newsArticle);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteNewsArticle(@PathVariable Long id) {
        newsArticleService.deleteById(id);
    }
}
