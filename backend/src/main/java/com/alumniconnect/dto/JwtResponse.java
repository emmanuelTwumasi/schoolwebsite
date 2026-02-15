package com.alumniconnect.dto;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String tenantId;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, String tenantId, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.tenantId = tenantId;
        this.roles = roles;
    }
}
