package com.example.backend.service;

import com.example.backend.dto.ProductCategoryDTO;
import com.example.backend.entities.ProductCategory;
import com.example.backend.mapper.ProductCategoryMapper;
import com.example.backend.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {

    private final ProductCategoryRepository repository;

    public List<ProductCategoryDTO> findAll() {
        return repository.findAll().stream()
                .map(ProductCategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProductCategoryDTO findById(Integer id) {
        ProductCategory category = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return ProductCategoryMapper.toDTO(category);
    }

    public ProductCategoryDTO create(ProductCategoryDTO dto) {
        if (repository.existsByName(dto.getName())) {
            throw new RuntimeException("Category with this name already exists.");
        }

        ProductCategory category = new ProductCategory();
        category.setName(dto.getName());

        return ProductCategoryMapper.toDTO(repository.save(category));
    }

    public ProductCategoryDTO update(Integer id, ProductCategoryDTO dto) {
        ProductCategory category = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(dto.getName());

        return ProductCategoryMapper.toDTO(repository.save(category));
    }

    public void delete(Integer id) {
        ProductCategory category = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getProducts().isEmpty()) {
            throw new RuntimeException("Cannot delete category with assigned products.");
        }

        repository.delete(category);
    }
}
