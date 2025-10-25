package com.ecgt.api.model;

import com.ecgt.api.model.enums.ProductCondition;
import com.ecgt.api.model.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.*;

/**
 * Entidad Product
 * ---------------
 * Representa un producto publicado por un usuario.
 * Permanente: se conecta a la tabla "products" en PostgreSQL.
 */

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    /** Estado físico del producto: NUEVO o USADO */
    @Enumerated(EnumType.STRING)
    @Column(name = "status_product", length = 10)
    private ProductCondition condition; // Mapea 'status_product' (NEW / USED)

    /** Estado de revisión del producto: pendiente, aprobado, rechazado */
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private ProductStatus reviewStatus;

    /** Vendedor que publicó el producto */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vendedor", nullable = true)
    private User seller;

    /** Categorías (relación muchos a muchos) */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "product_categories",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    /** Imágenes asociadas al producto */
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ProductImage> images = new ArrayList<>();

    /** Fecha de creación */
    @Column(name = "created_at")
    private OffsetDateTime createdAt = OffsetDateTime.now();

    /** Fecha de actualización */
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    /** Actualiza la fecha cuando se modifica */
    @PreUpdate
    public void preUpdate() {
        updatedAt = OffsetDateTime.now();
    }
}
