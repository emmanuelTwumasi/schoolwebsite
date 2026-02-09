package com.alumniconnect.service;

import com.alumniconnect.entity.NewsArticle;
import java.util.List;

public interface NewsArticleService {
    List<NewsArticle> findAll();
    NewsArticle save(NewsArticle newsArticle);
    void deleteById(Long id);
}
