package com.ecgt.api.repository;

import com.ecgt.api.model.Product;
import com.ecgt.api.model.User;
import com.ecgt.api.model.enums.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * ProductRepository
 * -----------------
 * Acceso a datos de productos.
 * Permanente: se conecta con la tabla "products".
 * 
 * Incluye consultas para:
 *  - listar productos del vendedor
 *  - listar productos por estado (aprobados, pendientes, etc.)
 *  - buscar producto por ID y dueño (para validación)
 */

public interface ProductRepository extends JpaRepository<Product, UUID> {

    /**
     * Listar productos por vendedor.
     */
    Page<Product> findBySeller(User seller, Pageable pageable);

    /**
     * Listar productos por estado de revisión (APPROVED, PENDING, REJECTED...).
     */
     Page<Product> findByReviewStatus(ProductStatus reviewStatus, Pageable pageable);

    /**
     * Buscar producto por ID y vendedor (para asegurar que sea suyo).
     */
    Optional<Product> findByIdAndSellerId(UUID id, UUID sellerId);

    /**
     * Contar cuántos productos tiene un vendedor.
     */
    long countBySeller(User seller);

    /**
     * Contar productos por estado (para reportes o estadísticas).
     */
    long countByReviewStatus(ProductStatus status);
}
