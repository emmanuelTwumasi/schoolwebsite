package com.alumniconnect.controller;

import com.alumniconnect.dto.MessageResponse;
import com.alumniconnect.dto.TenantOnboardingRequest;
import com.alumniconnect.entity.ERole;
import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.Tenant;
import com.alumniconnect.entity.User;
import com.alumniconnect.exception.ResourceNotFoundException;
import com.alumniconnect.repository.RoleRepository;
import com.alumniconnect.repository.TenantRepository;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.service.TenantIdGenerator;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private TenantIdGenerator tenantIdGenerator;

    @PostMapping("/onboard")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> onboardTenant(@Valid @RequestBody TenantOnboardingRequest request) {
        if (userRepository.existsByUsername(request.getAdminUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Admin username is already taken!"));
        }

        if (userRepository.existsByEmail(request.getAdminEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Admin email is already in use!"));
        }

        // Generate the tenantId from the display name
        String tenantId = tenantIdGenerator.generate(request.getDisplayName());

        // Create the new tenant (but don't save it yet)
        Tenant tenant = new Tenant(tenantId, request.getDisplayName());

        // Create the admin user for the new tenant
        User adminUser = new User();
        adminUser.setUsername(request.getAdminUsername());
        adminUser.setEmail(request.getAdminEmail());
        adminUser.setPassword(encoder.encode(request.getAdminPassword()));
        adminUser.setTenant(tenant); // Associate the unsaved tenant

        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        Set<Role> roles = new HashSet<>();
        roles.add(adminRole);
        adminUser.setRoles(roles);

        // Save the user. Hibernate will automatically save the tenant first due to the cascade.
        userRepository.save(adminUser);

        return ResponseEntity.ok(new MessageResponse("Tenant onboarded successfully with ID: " + tenantId));
    }

    @GetMapping("/my-tenant/details")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @Parameter(name = "X-Tenant-ID", in = ParameterIn.HEADER, required = true, description = "The tenant identifier (e.g., acme-corp)")
    public ResponseEntity<Tenant> getMyTenantDetails(@RequestHeader("X-Tenant-ID") String tenantId) {
        Tenant tenant = tenantRepository.findByTenantId(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Tenant not found with id: " + tenantId));
        return ResponseEntity.ok(tenant);
    }
}
