
package com.ecgt.api.controller;

import com.ecgt.api.dto.ProductDtos.Resp;
import com.ecgt.api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * ModerationController
 * --------------------
 * Endpoints del MODERADOR para revisar productos.
 * Permanente: lista pendientes y aprueba/rechaza.
 */

@RestController
@RequestMapping("/api/moderation/products")
@RequiredArgsConstructor
public class ModerationController {

  private final ProductService productService;

  @GetMapping("/pending")
  public ResponseEntity<Page<Resp>> pending(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "12") int size
  ) {
    return ResponseEntity.ok(productService.listPending(page, size));
  }

  @PostMapping("/{id}/approve")
  public ResponseEntity<Resp> approve(@PathVariable UUID id) {
    return ResponseEntity.ok(productService.approve(id));
  }

  @PostMapping("/{id}/reject")
  public ResponseEntity<Resp> reject(@PathVariable UUID id) {
    return ResponseEntity.ok(productService.reject(id));
  }


}
