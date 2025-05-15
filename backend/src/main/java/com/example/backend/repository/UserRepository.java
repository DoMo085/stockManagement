package com.example.backend.repository;

import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Standard queries
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // Combined exists check (for registration)
    boolean existsByUsernameOrEmail(String username, String email);

    // Optimized login query (single DB call)
    @Query("SELECT u FROM User u WHERE u.username = :identifier OR u.email = :identifier")
    Optional<User> findByIdentifier(@Param("identifier") String identifier);

    // Case-insensitive version (if needed)
    @Query("SELECT u FROM User u WHERE LOWER(u.username) = LOWER(:identifier) OR LOWER(u.email) = LOWER(:identifier)")
    Optional<User> findByIdentifierIgnoreCase(@Param("identifier") String identifier);
}