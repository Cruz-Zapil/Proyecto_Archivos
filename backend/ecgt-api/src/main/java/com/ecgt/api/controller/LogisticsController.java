package com.ecgt.api.controller;

import com.ecgt.api.dto.logistics.LogisticsDtos.OrderDTO;
import com.ecgt.api.service.LogisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/logistics/orders")
@RequiredArgsConstructor
public class LogisticsController {

    private final LogisticsService logisticsService;

    @GetMapping("/in-progress")
    public ResponseEntity<List<OrderDTO>> inProgress() {
        return ResponseEntity.ok(logisticsService.listInProgress());
    }

    @PutMapping("/{orderId}/update-delivery-date")
    public ResponseEntity<OrderDTO> updateDeliveryDate(
            @PathVariable UUID orderId,
            @RequestParam("date") String dateIso
    ) {
        return ResponseEntity.ok(
            logisticsService.updateDeliveryDate(orderId, OffsetDateTime.parse(dateIso))
        );
    }

    @PutMapping("/{orderId}/mark-delivered")
    public ResponseEntity<OrderDTO> markDelivered(@PathVariable UUID orderId) {
        return ResponseEntity.ok(logisticsService.markDelivered(orderId));
    }
}
