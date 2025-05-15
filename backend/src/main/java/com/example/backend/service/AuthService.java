package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entities.User;
import com.example.backend.exception.*;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ========= REGISTER ==========
    public AuthResponse register(RegisterRequest request) {
        // Validate registration (username or email conflicts)
        validateRegistration(request);

        // Create and save new user
        User user = createNewUser(request);
        userRepository.save(user);

        // Return AuthResponse with JWT token
        return buildAuthResponse(user);
    }

    // ========= LOGIN ==========
    public AuthResponse login(LoginRequest request) {
        // Authenticate user (check username/email and password)
        User user = authenticateUser(request);

        // Generate JWT token and return the response
        return buildAuthResponse(user);
    }

    // ========= PRIVATE METHODS ==========
    private void validateRegistration(RegisterRequest request) {
        // Check if username or email is already in use
        if (userRepository.existsByUsernameOrEmail(request.getUsername(), request.getEmail())) {
            throw new ConflictException("Username or email already in use");
        }
    }

    private User createNewUser(RegisterRequest request) {
        // Create a new User object and hash the password
        return User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername().trim())
                .email(request.getEmail().trim().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword())) // Encrypt password
                .phone(request.getPhone())
                .acceptTerms(request.isAcceptTerms())
                .role("USER") // Default role, or this can be set dynamically
                .build();
    }

    private User authenticateUser(LoginRequest request) {
        // Check if the user exists and validate the password
        User user = userRepository.findByIdentifier(request.getIdentifier().trim().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));


        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return user;
    }

    private AuthResponse buildAuthResponse(User user) {
        // Generate JWT token and build AuthResponse
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

}
