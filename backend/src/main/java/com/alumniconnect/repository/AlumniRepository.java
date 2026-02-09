package com.alumniconnect.repository;

import com.alumniconnect.entity.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, Long> {
    List<Alumni> findByTenantId(String tenantId);
}
