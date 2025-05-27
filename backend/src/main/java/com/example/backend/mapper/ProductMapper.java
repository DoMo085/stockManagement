package com.example.backend.mapper;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entities.Product;
import com.example.backend.entities.ProductCategory;

public class ProductMapper {

    public static ProductDTO toDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setProductDescription(product.getProductDescription());
        dto.setProductPrice(product.getProductPrice());
        dto.setProductQuantity(product.getProductQuantity());
        dto.setProductImage(product.getProductImage());
        dto.setCategoryId(
                product.getProductCategory() != null ? product.getProductCategory().getId() : null
        );
        return dto;
    }

    public static void updateEntityFromDTO(Product product, ProductDTO dto, ProductCategory category) {
        product.setProductName(dto.getProductName());
        product.setProductDescription(dto.getProductDescription());
        product.setProductPrice(dto.getProductPrice());
        product.setProductQuantity(dto.getProductQuantity());
        product.setProductImage(dto.getProductImage());
        product.setProductCategory(category);
    }
}
