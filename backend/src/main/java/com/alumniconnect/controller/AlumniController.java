package com.alumniconnect.controller;

import com.alumniconnect.entity.Alumni;
import com.alumniconnect.service.AlumniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/alumni")
public class AlumniController {

    @Autowired
    private AlumniService alumniService;

    @GetMapping
    public List<Alumni> getAllAlumni() {
        return alumniService.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Alumni createAlumni(@RequestBody Alumni alumni) {
        return alumniService.save(alumni);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isOwner(authentication, #id)")
    public Alumni updateAlumni(@PathVariable Long id, @RequestBody Alumni alumni) {
        alumni.setId(id);
        return alumniService.save(alumni);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAlumni(@PathVariable Long id) {
        alumniService.deleteById(id);
    }
}
