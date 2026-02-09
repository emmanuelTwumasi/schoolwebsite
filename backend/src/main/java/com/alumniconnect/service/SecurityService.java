package com.alumniconnect.service;

import com.alumniconnect.entity.Alumni;
import com.alumniconnect.repository.AlumniRepository;
import com.alumniconnect.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("securityService")
public class SecurityService {

    @Autowired
    private AlumniRepository alumniRepository;

    public boolean isOwner(Authentication authentication, Long alumniId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof UserDetailsImpl)) {
            return false; // Not a UserDetailsImpl, cannot determine ownership
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) principal;
        Long authenticatedUserId = userDetails.getId();

        Optional<Alumni> alumniOptional = alumniRepository.findById(alumniId);
        if (alumniOptional.isEmpty()) {
            return false; // Alumni not found
        }

        Alumni alumni = alumniOptional.get();
        // Check if the authenticated user's ID matches the user_id associated with the alumni profile
        return alumni.getUser() != null && alumni.getUser().getId().equals(authenticatedUserId);
    }
}
