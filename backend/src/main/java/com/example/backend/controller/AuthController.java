package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.exception.ConflictException;
import com.example.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // ========= LOGIN ==========
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // ========= REGISTER ==========
        @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
            try {
                // Delegate registration to AuthService
                AuthResponse response = authService.register(request);

                // Return success response after registration
                return new ResponseEntity<>(new ApiResponse("User registered successfully.", true), HttpStatus.CREATED);
            } catch (ConflictException e) {
                // Handle conflict (e.g., email or username already exists)
                return new ResponseEntity<>(new ApiResponse(e.getMessage(), false), HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                // Handle unexpected errors
                return new ResponseEntity<>(new ApiResponse("An unexpected error occurred.", false), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
}
