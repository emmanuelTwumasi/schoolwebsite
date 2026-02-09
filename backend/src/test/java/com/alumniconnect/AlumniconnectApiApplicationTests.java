package com.alumniconnect;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class AlumniconnectApiApplicationTests {

    @Test
    void contextLoads() {
        // This test simply checks if the Spring application context can start successfully.
        // With the @ActiveProfiles("test") annotation, it will do so using the H2 database.
    }

}
