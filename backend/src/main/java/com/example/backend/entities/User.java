package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String username;
    private String email;

    @Column(nullable = false)
    private String password;  // This should store the hashed password

    private String phone;
    private boolean acceptTerms;

    // Getters and setters omitted for brevity

    @Builder
    public User(String firstName, String lastName, String username, String email, String password, String phone, boolean acceptTerms) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.acceptTerms = acceptTerms;
    }
}
