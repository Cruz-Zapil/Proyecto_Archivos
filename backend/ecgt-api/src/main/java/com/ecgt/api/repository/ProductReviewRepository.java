package com.ecgt.api.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecgt.api.model.ProductReview;

public interface ProductReviewRepository extends JpaRepository<ProductReview, UUID> {
  List<ProductReview> findByProductId(UUID productId);
}