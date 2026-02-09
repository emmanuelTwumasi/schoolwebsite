package com.alumniconnect.service;

import com.alumniconnect.entity.Event;
import java.util.List;

public interface EventService {
    List<Event> findAll();
    Event save(Event event);
    void deleteById(Long id);
}
