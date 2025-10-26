package com.ecgt.api.dto.cart;

import java.util.List;
import java.util.UUID;

public record CartResponse(UUID cartId, List<CartItemDTO> items) {}
