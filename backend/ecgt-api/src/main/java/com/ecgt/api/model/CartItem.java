package com.ecgt.api.model;

import java.util.UUID;
import jakarta.persistence.*;
import lombok.*;



@Entity
@Table(name = "cart_item")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor

public class CartItem {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private int quantity;
}
