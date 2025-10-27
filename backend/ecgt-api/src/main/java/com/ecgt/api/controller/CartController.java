package com.ecgt.api.controller;

import com.ecgt.api.dto.cart.CartItemDTO;
import com.ecgt.api.dto.cart.CartResponse;
import com.ecgt.api.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

  private final CartService cartService;

  @GetMapping("/{userId}")
  public CartResponse getCart(@PathVariable UUID userId) {
    return cartService.getCart(userId);
  }

  @PostMapping("/{userId}")
  public CartResponse addOrUpdateItem(@PathVariable UUID userId, @RequestBody CartItemDTO dto) {
    return cartService.addOrUpdateItem(userId, dto);
  }

  @DeleteMapping("/{userId}/item/{productId}")
  public void removeItem(@PathVariable UUID userId, @PathVariable UUID productId) {
    cartService.removeItem(userId, productId);
  }

  @DeleteMapping("/{userId}")
  public void clearCart(@PathVariable UUID userId) {
    cartService.clearCart(userId);
  }

  @PostMapping("/{userId}/save")
  public CartResponse saveCart(@PathVariable UUID userId, @RequestBody CartResponse payload) {
    return cartService.saveCart(userId, payload);
  }

}
