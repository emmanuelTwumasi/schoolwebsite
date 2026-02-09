package com.alumniconnect.repository;

import com.alumniconnect.entity.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {
    List<NewsArticle> findByTenantId(String tenantId);

    // New search method
    List<NewsArticle> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String content, String author);
}
