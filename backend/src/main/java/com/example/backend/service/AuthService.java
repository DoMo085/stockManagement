package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entities.User;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public RegisterResponse register(RegisterRequest request) {
        validateRegistration(request);
        User user = createNewUser(request);
        userRepository.save(user);
        log.info("New user registered: {}", user.getUsername());
        return buildRegisterResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = authenticateUser(request);
        log.info("User logged in: {}", user.getUsername());
        return buildAuthResponse(user);
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtUtil.isTokenValid(refreshToken)) {
            log.warn("Invalid refresh token");
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        String username = jwtUtil.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        return buildAuthResponse(user);
    }

    // Helpers

    private void validateRegistration(RegisterRequest request) {
        if (userRepository.existsByUsernameOrEmail(request.getUsername(), request.getEmail())) {
            log.warn("Username or email already in use: {} / {}", request.getUsername(), request.getEmail());
            throw new ConflictException("Username or email already in use");
        }
    }

    private User createNewUser(RegisterRequest request) {
        return User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername().trim())
                .email(request.getEmail().trim().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .acceptTerms(request.isAcceptTerms())
                .role(User.Role.USER)
                .build();
    }

    private User authenticateUser(LoginRequest request) {
        String identifier = request.getIdentifier().trim().toLowerCase();
        User user = userRepository.findByIdentifier(identifier)
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Failed login for user: {}", identifier);
            throw new UnauthorizedException("Invalid credentials");
        }

        return user;
    }

    private AuthResponse buildAuthResponse(User user) {
        String accessToken = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(mapToUserDTO(user))
                .build();
    }

    private RegisterResponse buildRegisterResponse(User user) {
        return RegisterResponse.builder()
                .user(mapToUserDTO(user))
                .build();
    }

    private UserDTO mapToUserDTO(User user) {
        return new UserDTO(
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getRole().name()
        );
    }
}
