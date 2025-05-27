package com.example.backend.service;

import com.example.backend.entities.User;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void updateUserRole(String username, User.Role newRole) {
        if (newRole == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found with username: " + username));

        user.setRole(newRole);
    }

    public User.Role getUserRole(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"))
                .getRole();
    }
}