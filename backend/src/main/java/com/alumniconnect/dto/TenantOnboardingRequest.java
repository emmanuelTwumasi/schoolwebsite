package com.alumniconnect.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class TenantOnboardingRequest {
    @NotBlank
    @Size(max = 100)
    private String displayName;

    @NotBlank
    @Size(min = 3, max = 20)
    private String adminUsername;

    @NotBlank
    @Size(max = 50)
    @Email
    private String adminEmail;

    @NotBlank
    @Size(min = 6, max = 40)
    private String adminPassword;
}
