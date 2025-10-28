package com.ecgt.api.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ecgt.api.model.ProductReview;
import com.ecgt.api.repository.ProductRepository;
import com.ecgt.api.repository.ProductReviewRepository;
import com.ecgt.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
  
  private final ProductReviewRepository repo;
  private final ProductRepository productRepo;
  private final UserRepository userRepo;

  public List<ProductReview> getReviews(UUID productId) {
    return repo.findByProductId(productId);
  }

  public ProductReview addReview(UUID userId, UUID productId, int rating, String comment) {
    var user = userRepo.findById(userId).orElseThrow();
    var product = productRepo.findById(productId).orElseThrow();
    var review = ProductReview.builder()
        .user(user)
        .product(product)
        .rating(rating)
        .comment(comment)
        .build();
    return repo.save(review);
  }
}