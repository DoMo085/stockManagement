package com.example.backend.mapper;

import com.example.backend.dto.ProductCategoryDTO;
import com.example.backend.entities.ProductCategory;

public class ProductCategoryMapper {

    public static ProductCategoryDTO toDTO(ProductCategory category) {
        ProductCategoryDTO dto = new ProductCategoryDTO();
        dto.setCategoryId(category.getId());
        dto.setName(category.getName());
        return dto;
    }

    public static void updateEntityFromDTO(ProductCategory category, ProductCategoryDTO dto) {
        category.setName(dto.getName());
    }
}
