package com.example.backend.service;

import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.RegisterResponse;
import com.example.backend.dto.UserDTO;
import com.example.backend.entities.User;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.UnauthorizedException;
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

    // Register new user manually login
    public RegisterResponse register(RegisterRequest request) {
        validateRegistration(request);
        User user = createNewUser(request);
        userRepository.save(user);
        return buildRegisterResponse(user);
    }

    // Login user
    public AuthResponse login(LoginRequest request) {
        User user = authenticateUser(request);
        return buildAuthResponse(user);
    }

    // Refresh access token using refresh token only
    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtUtil.isTokenValid(refreshToken)) {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }
        String username = jwtUtil.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
        String newAccessToken = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        String newRefreshToken = jwtUtil.generateRefreshToken(user.getUsername());
        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .user(mapToUserDTO(user))
                .build();
    }

    private void validateRegistration(RegisterRequest request) {
        if (userRepository.existsByUsernameOrEmail(request.getUsername(), request.getEmail())) {
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
        User user = userRepository.findByIdentifier(request.getIdentifier().trim().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
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
                user.getUsername(),     // username
                user.getEmail(),        // email
                user.getFirstName(),    // firstName
                user.getLastName(),     // lastName
                user.getPhone(),        // phone
                user.getRole().name()   // role
        );
    }
}
