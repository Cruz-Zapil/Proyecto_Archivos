package com.ecgt.api.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecgt.api.dto.orders.CheckoutRequest;
import com.ecgt.api.dto.orders.OrderResponse;
import com.ecgt.api.model.Order;

import com.ecgt.api.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(@RequestBody CheckoutRequest req) {
        return ResponseEntity.ok(orderService.checkout(req));
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> listMine(@RequestParam UUID userId) {
        return ResponseEntity.ok(orderService.listMine(userId));
    }

    @GetMapping("/debug/all")
public ResponseEntity<List<Order>> debugAll() {
    return ResponseEntity.ok(orderService.listAll());
}

}
