package com.ecgt.api.repository;

import com.ecgt.api.model.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

/**
 * ReviewRepository
 * ----------------
 * Acceso a datos de reseñas de productos.
 * Permanente: se conecta a la tabla "product_reviews".
 */
public interface ReviewRepository extends JpaRepository<ProductReview, UUID> {
    List<ProductReview> findByProductId(UUID productId);
}
