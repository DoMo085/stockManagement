package com.example.backend.controller;

import com.example.backend.dto.RegisterRequest;
import com.example.backend.entities.User;
import com.example.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend URL
public class RegisterController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegisterController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        // Check if the email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        // Hash the password before saving it
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Create a new user object
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(hashedPassword)  // Store hashed password
                .phone(request.getPhone())
                .acceptTerms(request.isAcceptTerms())
                .build();

        // Save the user to the database
        userRepository.save(user);

        // Return a success message
        return ResponseEntity.ok("User registered successfully.");
    }
}
