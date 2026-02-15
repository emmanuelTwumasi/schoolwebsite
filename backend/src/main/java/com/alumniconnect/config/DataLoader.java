package com.alumniconnect.config;

import com.alumniconnect.entity.ERole;
import com.alumniconnect.entity.Role;
import com.alumniconnect.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            roleRepository.save(new Role(null, ERole.ROLE_USER));
        }
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(null, ERole.ROLE_ADMIN));
        }
        if(roleRepository.findByName(ERole.ROLE_SUPER_ADMIN).isEmpty()){
            roleRepository.save(new Role(null, ERole.ROLE_SUPER_ADMIN));
        }
    }
}
