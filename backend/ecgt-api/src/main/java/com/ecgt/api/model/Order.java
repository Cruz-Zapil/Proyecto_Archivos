package com.ecgt.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.*;

/**
 * Order
 * -----
 * Representa una orden de compra generada al pagar un carrito.
 * Permanente: corresponde a la tabla "orders".
 */
@Entity
@Table(name = "orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    //  Usuario que realizó la orden
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    //  Estado: EN_CURSO | ENTREGADO
    @Column(length = 20, nullable = false)
    private String estado = "EN_CURSO";

    // Fechas importantes
    @Column(name = "fecha_creacion")
    private OffsetDateTime fechaCreacion;

    @Column(name = "fecha_entrega_estimada")
    private OffsetDateTime fechaEntregaEstimada;

    @Column(name = "fecha_entregado")
    private OffsetDateTime fechaEntregado;

    //  Ítems de la orden
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    //  Pago asociado (opcional)
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Payment payment;
}
