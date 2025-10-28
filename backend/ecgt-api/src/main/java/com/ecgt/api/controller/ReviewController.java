package com.ecgt.api.controller;

import com.ecgt.api.dto.review.CreateReviewRequest;
import com.ecgt.api.dto.review.ReviewResponse;
import com.ecgt.api.model.Product;
import com.ecgt.api.model.ProductReview;
import com.ecgt.api.model.User;
import com.ecgt.api.repository.ProductRepository;
import com.ecgt.api.repository.ReviewRepository;
import com.ecgt.api.repository.UserRepository;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * ReviewController
 * ----------------
 * Controlador REST para gestionar reseñas de productos.
 * Permite listar y crear reseñas asociadas a un producto.
 */
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

  private final ReviewRepository reviewRepo;
  private final ProductRepository productRepo;
  private final UserRepository userRepo;

  public ReviewController(ReviewRepository reviewRepo, ProductRepository productRepo, UserRepository userRepo) {
    this.reviewRepo = reviewRepo;
    this.productRepo = productRepo;
    this.userRepo = userRepo;
  }

  /**
   * 🔹 Listar reseñas de un producto
   */
  @GetMapping("/{productId}")
  public List<ReviewResponse> listByProduct(@PathVariable UUID productId) {
    List<ProductReview> reviews = reviewRepo.findByProductId(productId);
    return reviews.stream()
        .map(r -> new ReviewResponse(
            r.getId(),
            r.getUser().getName(),
            r.getRating(),
            r.getComment(),
            r.getCreatedAt()))
        .collect(Collectors.toList());
  }

  /**
   * Crear una nueva reseña (solo usuarios autenticados)
   */

  @PostMapping("/{productId}")
public ReviewResponse create(
        @PathVariable UUID productId,
        @RequestBody CreateReviewRequest req,
        Authentication authentication) {

    Object principal = authentication.getPrincipal();
    String email;

    // Si el filtro guardó un User completo
    if (principal instanceof com.ecgt.api.model.User u) {
        email = u.getEmail();
    }
    // Si guardó un UserDetails estándar
    else if (principal instanceof org.springframework.security.core.userdetails.UserDetails ud) {
        email = ud.getUsername();
    }
    // Si guardó solo un string
    else {
        email = principal.toString();
    }

    User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + email));

    Product product = productRepo.findById(productId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    ProductReview review = ProductReview.builder()
            .user(user)
            .product(product)
            .rating(req.rating())
            .comment(req.comment())
            .createdAt(LocalDateTime.now())
            .build();

    reviewRepo.save(review);

    return new ReviewResponse(
            review.getId(),
            user.getName(),
            req.rating(),
            req.comment(),
            review.getCreatedAt()
    );
}




}
