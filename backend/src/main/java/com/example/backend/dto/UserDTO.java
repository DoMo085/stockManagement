package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({ "username", "email", "firstName", "lastName", "phone", "role" })
public class UserDTO {
    @Pattern(
            regexp = "^[a-z0-9_]+$",
            message = "Username must be lowercase alphanumeric with underscores"
    )
    private String username;

    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String role;
}
