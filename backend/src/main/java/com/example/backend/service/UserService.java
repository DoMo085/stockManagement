package com.example.backend.service;

import com.example.backend.dto.RegistrationRequest;
import com.example.backend.exception.EmailExistsException;
import com.example.backend.model.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(RegistrationRequest registrationRequest) {
        if (userRepository.existsByEmail(registrationRequest.getEmail())) {
            throw new EmailExistsException("Email is already in use");
        }

        if (!registrationRequest.getPassword().equals(registrationRequest.getConfirmPassword())) {
            throw new RuntimeException("Passwords don't match");
        }

        User user = new User();
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setPhone(registrationRequest.getPhone());
        user.setActive(true); // For demo, activate immediately. In production, use email verification.

        // Assign default role (ROLE_USER)
        roleRepository.findByName(ERole.ROLE_USER).ifPresent(role -> user.getRoles().add(role));

        return userRepository.save(user);
    }
}