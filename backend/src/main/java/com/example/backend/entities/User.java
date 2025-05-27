package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"username"}),
                @UniqueConstraint(columnNames = {"email"})
        },
        indexes = {
                @Index(name = "idx_user_email", columnList = "email"),
                @Index(name = "idx_user_username", columnList = "username")
        }
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    public enum Role {
        USER,
        ADMIN,
        MODERATOR
    }

    // Identification
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Personal Info
    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    // Case-sensitive username
    @Column(
            nullable = false,
            unique = true,
            columnDefinition = "VARCHAR(255) COLLATE utf8mb4_bin"
    )
    private String username;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @Size(min = 8)
    @Column(
            nullable = false,
            columnDefinition = "VARCHAR(255) COMMENT 'Should be stored encrypted'"
    )
    private String password;

    // Optional phone
    private String phone;

    // Required Terms Agreement
    @Column(nullable = false)
    private boolean acceptTerms;

    // Role enum
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Auditing
    @CreatedDate
    @Column(updatable = false)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime updatedAt;

    // Optimistic Locking
    @Version
    private Integer version;
}
