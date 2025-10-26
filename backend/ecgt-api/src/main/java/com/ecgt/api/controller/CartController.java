package com.ecgt.api.controller;

import com.ecgt.api.dto.cart.CartItemDTO;
import com.ecgt.api.dto.cart.CartResponse;
import com.ecgt.api.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable UUID userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<CartResponse> addOrUpdateItem(
            @PathVariable UUID userId,
            @RequestBody CartItemDTO item
    ) {
        return ResponseEntity.ok(cartService.addOrUpdateItem(userId, item));
    }

    @DeleteMapping("/{userId}/item/{productId}")
    public ResponseEntity<Void> removeItem(@PathVariable UUID userId, @PathVariable UUID productId) {
        cartService.removeItem(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable UUID userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
