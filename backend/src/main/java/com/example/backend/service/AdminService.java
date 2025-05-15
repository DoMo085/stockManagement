package com.example.backend.service;

import com.example.backend.entities.Role;
import com.example.backend.entities.User;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    @Transactional
    public void updateUserRole(String username, Role newRole) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        user.setRole(newRole.name());  // Update role string from enum
        // No need to explicitly save if entity is managed and transaction commits
    }
}

