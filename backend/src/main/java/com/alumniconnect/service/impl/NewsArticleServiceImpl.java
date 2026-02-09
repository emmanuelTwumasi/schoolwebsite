package com.alumniconnect.service.impl;

import com.alumniconnect.entity.NewsArticle;
import com.alumniconnect.repository.NewsArticleRepository;
import com.alumniconnect.service.NewsArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsArticleServiceImpl implements NewsArticleService {

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    @Override
    public List<NewsArticle> findAll() {
        return newsArticleRepository.findAll();
    }

    @Override
    public NewsArticle save(NewsArticle newsArticle) {
        return newsArticleRepository.save(newsArticle);
    }

    @Override
    public void deleteById(Long id) {
        newsArticleRepository.deleteById(id);
    }
}
