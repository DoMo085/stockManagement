package com.example.backend.dto;

import com.example.backend.validation.PasswordMatch;
import jakarta.validation.constraints.*;
import lombok.*;

@PasswordMatch // Custom validation annotation
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Username is required")
    @Pattern(regexp = "^[a-z0-9_]+$", message = "Username must be lowercase alphanumeric with underscores and no spaces")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Pattern(regexp = "^[^\\s]+$", message = "Email must not contain spaces")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^[^\\s]+$", message = "Password must not contain spaces")
    private String password;

    @NotBlank(message = "Confirm password is required")
    @Size(min = 8, message = "Confirm password must be at least 8 characters")
    @Pattern(regexp = "^[^\\s]+$", message = "Confirm password must not contain spaces")
    private String confirmPassword;

    @Pattern(regexp = "^\\+?\\d{9,15}$", message = "Phone number is invalid")
    private String phone;

    @AssertTrue(message = "You must accept the terms and conditions")
    private boolean acceptTerms;

    // Normalize input
    public void setUsername(String username) {
        this.username = username != null ? username.trim().toLowerCase() : null;
    }

    public void setEmail(String email) {
        this.email = email != null ? email.trim().toLowerCase() : null;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName != null ? firstName.trim() : null;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName != null ? lastName.trim() : null;
    }

    public void setPhone(String phone) {
        this.phone = phone != null ? phone.trim() : null;
    }
}
