package com.ecgt.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

/**
 * OrderItem
 * ----------
 * Detalle de producto dentro de una orden.
 * Permanente: corresponde a la tabla "order_items".
 */
@Entity
@Table(name = "order_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    //  Orden a la que pertenece
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    //  Producto comprado
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    //  Cantidad y precio en el momento de la compra
    @Column(nullable = false)
    private int quantity;

    @Column(name = "price_at_purchase", precision = 12, scale = 2, nullable = false)
    private BigDecimal priceAtPurchase;
}
