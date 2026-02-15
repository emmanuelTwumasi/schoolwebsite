package com.alumniconnect.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tenants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false)
    private String tenantId; // e.g., "acme-corp" - stable and unique

    @Column(nullable = false)
    private String name; // e.g., "Acme Corporation" - can be changed

    public Tenant(String tenantId, String name) {
        this.tenantId = tenantId;
        this.name = name;
    }
}
