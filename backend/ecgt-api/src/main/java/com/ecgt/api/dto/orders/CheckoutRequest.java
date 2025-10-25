package com.ecgt.api.dto.orders;


import lombok.*;
import java.util.*;

/**
 * CheckoutRequest
 * ----------------
 * Datos que el frontend envía al realizar una compra.
 * Contiene usuario, método de pago y los productos seleccionados.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutRequest {
    private UUID userId;
    private String metodoPago;
    private List<CheckoutItemDTO> items;
}
