package com.alumniconnect.service;

import com.alumniconnect.entity.Alumni;
import java.util.List;

public interface AlumniService {
    List<Alumni> findAll();
    Alumni save(Alumni alumni);
    void deleteById(Long id);
}
