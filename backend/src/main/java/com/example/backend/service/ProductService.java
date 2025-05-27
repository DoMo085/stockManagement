package com.example.backend.service;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entities.Product;
import com.example.backend.entities.ProductCategory;
import com.example.backend.exception.CategoryNotFoundException;
import com.example.backend.exception.ProductNotFoundException;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.ProductCategoryRepository;
import com.example.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

import static com.example.backend.mapper.ProductMapper.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)  // read-only for all methods by default
public class ProductService {
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;
    private final ProductCategoryRepository categoryRepository;

    public Page<ProductDTO> findAll(Pageable pageable) {
        log.debug("Fetching all products with pagination: {}", pageable);
        return productRepository.findAll(pageable).map(ProductMapper::toDTO);
    }

    public ProductDTO findById(Integer id) {
        log.debug("Fetching product by id: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return toDTO(product);
    }

    @Transactional  // overrides class-level readOnly = true for write operations
    public ProductDTO create(ProductDTO dto) {
        Objects.requireNonNull(dto, "ProductDTO cannot be null");
        log.debug("Creating new product: {}", dto.getProductName());

        ProductCategory category = getCategoryById(dto.getCategoryId());

        Product product = new Product();
        updateEntityFromDTO(product, dto, category);
        return toDTO(productRepository.save(product));
    }

    @Transactional
    public ProductDTO update(Integer id, ProductDTO dto) {
        Objects.requireNonNull(dto, "ProductDTO cannot be null");
        log.debug("Updating product with id: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        ProductCategory category = getCategoryById(dto.getCategoryId());

        updateEntityFromDTO(product, dto, category);
        return toDTO(productRepository.save(product));
    }

    @Transactional
    public void delete(Integer id) {
        log.debug("Deleting product with id: {}", id);
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }

    private ProductCategory getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
    }
}
