package com.example.backend.exception;

/**
 * Exception thrown when a requested Category is not found.
 * Inherits HTTP 404 status from NotFoundException.
 */
public class CategoryNotFoundException extends NotFoundException {

    public CategoryNotFoundException(Integer id) {
        super("Category not found with id: " + id);
    }

    public CategoryNotFoundException(String message) {
        super(message);
    }

    public CategoryNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Factory method for creating exception with category ID
     */
    public static CategoryNotFoundException withId(Integer id) {
        return new CategoryNotFoundException(id);
    }

    /**
     * Factory method for creating exception with category name
     */
    public static CategoryNotFoundException withName(String name) {
        return new CategoryNotFoundException("Category not found with name: " + name);
    }
}