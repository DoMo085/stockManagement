package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.UserRoleDTO;
import com.example.backend.entities.User;
import com.example.backend.exception.NotFoundException;
import com.example.backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Validated
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/users/{username}/role")
    public ResponseEntity<ApiResponse<Void>> updateUserRole(
            @PathVariable String username,
            @Valid @RequestBody UserRoleDTO roleUpdate) {

        try {
            log.info("Attempting to update role for user: {}", username);
            adminService.updateUserRole(username, roleUpdate.getRole());

            String message = String.format("Role updated to %s for user %s", roleUpdate.getRole(), username);
            return ResponseEntity.ok(ApiResponse.success(null, message));

        } catch (IllegalArgumentException e) {
            log.warn("Invalid role update attempt: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.failure(e.getMessage()));

        } catch (NotFoundException e) {
            log.warn("User not found: {}", username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.failure(e.getMessage()));

        } catch (Exception e) {
            log.error("Error updating role for user {}: {}", username, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.failure("Failed to update user role"));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users/{username}/role")
    public ResponseEntity<ApiResponse<User.Role>> getUserRole(@PathVariable String username) {
        try {
            User.Role role = adminService.getUserRole(username);
            return ResponseEntity.ok(ApiResponse.success(role, "User role fetched successfully"));
        } catch (NotFoundException e) {
            log.warn("User not found: {}", username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.failure(e.getMessage()));
        }
    }
}
