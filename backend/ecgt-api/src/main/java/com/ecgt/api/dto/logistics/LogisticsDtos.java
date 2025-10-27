package com.ecgt.api.dto.logistics;

import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

/** DTO plano para logística: evita proxys LAZY y ciclos */
public class LogisticsDtos {

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class UserMinDTO {
        private String name;
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class ProductMinDTO {
        private String name;
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class OrderItemDTO {
        private Integer quantity;
        private Double priceAtPurchase;      // BigDecimal -> double
        private ProductMinDTO product;       // { name }
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class OrderDTO {
        private UUID id;
        private String estado;                       // EN_CURSO | ENTREGADO
        private OffsetDateTime fechaCreacion;
        private OffsetDateTime fechaEntregaEstimada;
        private OffsetDateTime fechaEntregado;
        private UserMinDTO user;                     // { name }
        private List<OrderItemDTO> orderItems;       // items
    }
}
