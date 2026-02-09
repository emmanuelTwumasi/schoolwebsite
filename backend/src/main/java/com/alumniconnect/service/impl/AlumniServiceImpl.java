package com.alumniconnect.service.impl;

import com.alumniconnect.entity.Alumni;
import com.alumniconnect.repository.AlumniRepository;
import com.alumniconnect.service.AlumniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumniServiceImpl implements AlumniService {

    @Autowired
    private AlumniRepository alumniRepository;

    @Override
    public List<Alumni> findAll() {
        return alumniRepository.findAll();
    }

    @Override
    public Alumni save(Alumni alumni) {
        return alumniRepository.save(alumni);
    }

    @Override
    public void deleteById(Long id) {
        alumniRepository.deleteById(id);
    }
}
