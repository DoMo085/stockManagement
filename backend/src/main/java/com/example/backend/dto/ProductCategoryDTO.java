package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductCategoryDTO {
    private Integer categoryId;

    @NotBlank
    @Size(max = 50)
    private String name;
}
