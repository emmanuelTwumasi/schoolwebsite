package com.alumniconnect.repository;

import com.alumniconnect.entity.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    Optional<Tenant> findByTenantId(String tenantId);
    Boolean existsByTenantId(String tenantId);
    Optional<Tenant> findByName(String name);
    Boolean existsByName(String name);
}
