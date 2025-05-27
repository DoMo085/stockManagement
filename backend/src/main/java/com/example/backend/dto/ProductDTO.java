package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDTO {

    private Integer productId;

    @NotBlank
    @Size(max = 100)
    private String productName;

    private String productDescription;

    @Positive
    private BigDecimal productPrice;

    @PositiveOrZero
    private Integer productQuantity;

    private String productImage;

    @NotNull
    private Integer categoryId;  // ID reference to ProductCategory
}
