package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.entities.Role;
import com.example.backend.exception.NotFoundException;
import com.example.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PutMapping("/user/{username}/role")
    public ResponseEntity<ApiResponse> updateUserRole(
            @PathVariable("username") String username,
            @RequestParam("role") String roleStr) {

        try {
            Role newRole = Role.valueOf(roleStr.toUpperCase());
            adminService.updateUserRole(username, newRole);
            return ResponseEntity.ok(new ApiResponse("User role updated successfully", true));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse("Invalid role provided", false));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(e.getMessage(), false));
        } catch (Exception e) {
            // Log the exception if needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("An unexpected error occurred", false));
        }
    }
}

