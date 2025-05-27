package com.example.backend.controller;

import com.example.backend.dto.ProductCategoryDTO;
import com.example.backend.service.ProductCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductCategoryController {

    private final ProductCategoryService service;

    @GetMapping
    public List<ProductCategoryDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCategoryDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProductCategoryDTO> create(@Valid @RequestBody ProductCategoryDTO dto) {
        ProductCategoryDTO created = service.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getCategoryId())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProductCategoryDTO> update(@PathVariable Integer id, @Valid @RequestBody ProductCategoryDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
