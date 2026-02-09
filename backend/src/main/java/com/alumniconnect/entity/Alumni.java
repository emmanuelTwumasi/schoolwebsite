package com.alumniconnect.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import javax.persistence.*;

@Entity
@Table(name = "alumni")
@Data
@NoArgsConstructor
@AllArgsConstructor
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = "string"))
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class Alumni {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private int graduationYear;

    @Column(unique = true)
    private String email;

    private String currentCity;

    private String profilePictureUrl;

    private String major;

    @Lob
    private String whatImDoingNow;

    @Enumerated(EnumType.STRING)
    private AlumniStatus status;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "tenant_id", nullable = false)
    private String tenantId;
}
