package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Username or email is required")
    private String identifier;  // username or email

    @NotBlank(message = "Password is required")
    private String password;

    public void setIdentifier(String identifier) {
        this.identifier = identifier != null ? identifier.trim().toLowerCase() : null;
    }
}
