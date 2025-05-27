package com.example.backend.repository;

import com.example.backend.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Page<Product> findByProductNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Product> findByProductCategory_Id(Integer categoryId, Pageable pageable);

    Page<Product> findByProductNameContainingIgnoreCaseAndProductCategory_Id(String name, Integer categoryId, Pageable pageable);

}
