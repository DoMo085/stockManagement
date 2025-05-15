package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data // Combines @Getter, @Setter, @ToString, @EqualsAndHashCode
@NoArgsConstructor // Adds default constructor
@AllArgsConstructor // Adds constructor with all fields

public class LoginRequest {

    @NotBlank(message = "Username or email is required")
    private String identifier;

    @NotBlank(message = "Password is required")
    private String password;

    // Getters & Setters or Lombok @Data/@Getter/@Setter
}
