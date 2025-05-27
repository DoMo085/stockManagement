package com.example.backend.dto;

import jakarta.validation.constraints.*;

public record ProductRequest(
        Double productId,

        @NotBlank(message = "Name is required")
        String productName,

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        Double productPrice,
        String productDescription,
        int productQuantity,
        String productImage

) {}
