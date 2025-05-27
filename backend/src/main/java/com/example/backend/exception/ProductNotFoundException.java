package com.example.backend.exception;

/**
 * Exception thrown when a requested Product is not found.
 * Inherits HTTP 404 status from NotFoundException.
 */
public class ProductNotFoundException extends NotFoundException {

  public ProductNotFoundException(Integer id) {
    super("Product not found with id: " + id);
  }

  public ProductNotFoundException(String message) {
    super(message);
  }

  public ProductNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  /**
   * Factory method for creating exception with product ID
   */
  public static ProductNotFoundException withId(Integer id) {
    return new ProductNotFoundException(id);
  }

  /**
   * Factory method for creating exception with product name
   */
  public static ProductNotFoundException withName(String name) {
    return new ProductNotFoundException("Product not found with name: " + name);
  }
}