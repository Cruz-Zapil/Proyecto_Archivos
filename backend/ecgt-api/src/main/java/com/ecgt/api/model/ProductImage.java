package com.ecgt.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

/**
 * ProductImage
 * ------------
 * Imagen asociada a un producto.
 * Permanente: mapea a "product_images".
 */
@Entity
@Table(name = "product_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "image_url", columnDefinition = "TEXT", nullable = false)
    private String imageUrl;

    @Column(name = "order_index")
    private Integer orderIndex = 0;
}
