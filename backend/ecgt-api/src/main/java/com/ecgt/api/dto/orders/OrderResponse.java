package com.ecgt.api.dto.orders;

import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * OrderResponse
 * --------------
 * DTO de respuesta al crear o listar órdenes.
 * Incluye ID, total y fecha estimada de entrega.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private UUID id;
    private Double total;
    private OffsetDateTime fechaEntregaEstimada;
}
