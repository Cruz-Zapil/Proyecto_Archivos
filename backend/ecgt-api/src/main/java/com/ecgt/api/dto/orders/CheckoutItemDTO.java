package com.ecgt.api.dto.orders;


import lombok.*;
import java.util.UUID;

/**
 * CheckoutItemDTO
 * ----------------
 * Ítem de compra individual (producto + cantidad).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutItemDTO {
    private UUID productId;
    private int qty;
}

