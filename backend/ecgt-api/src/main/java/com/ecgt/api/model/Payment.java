package com.ecgt.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Payment
 * -------
 * Registro de pago asociado a una orden.
 * Permanente: corresponde a la tabla "payment".
 */
@Entity
@Table(name = "payment")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Orden asociada
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    //  Usuario que realizó el pago
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //  Monto total
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal monto;

    //  Método de pago (TARJETA)
    @Column(length = 50)
    private String metodo;

    //  Estado del pago (COMPLETADO, FALLIDO, etc.)
    @Column(length = 20)
    private String estado = "COMPLETADO";

    //  Fecha de pago
    @Column(name = "fecha_pago")
    private OffsetDateTime fechaPago = OffsetDateTime.now();
}
