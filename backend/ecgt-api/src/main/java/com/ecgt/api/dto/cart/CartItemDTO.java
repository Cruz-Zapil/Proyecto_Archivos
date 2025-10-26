package com.ecgt.api.dto.cart;

import java.math.BigDecimal;
import java.util.UUID;

public record CartItemDTO(UUID productId, String productName, int quantity, BigDecimal price) {}
