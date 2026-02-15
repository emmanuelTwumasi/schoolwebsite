package com.alumniconnect.service;

import com.alumniconnect.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
public class TenantIdGenerator {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    @Autowired
    private TenantRepository tenantRepository;

    public String generate(String displayName) {
        String noWhiteSpace = WHITESPACE.matcher(displayName).replaceAll("-");
        String normalized = Normalizer.normalize(noWhiteSpace, Normalizer.Form.NFD);
        String slug = NON_LATIN.matcher(normalized).replaceAll("");
        slug = slug.toLowerCase(Locale.ENGLISH);

        // Handle collisions
        int counter = 1;
        String uniqueSlug = slug;
        while (tenantRepository.existsByTenantId(uniqueSlug)) {
            counter++;
            uniqueSlug = slug + "-" + counter;
        }
        return uniqueSlug;
    }
}
