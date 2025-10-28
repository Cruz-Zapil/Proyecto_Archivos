
package com.ecgt.api.controller;

import com.ecgt.api.dto.ProductDtos.*;
import com.ecgt.api.service.ProductService;
import com.ecgt.api.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

/**
 * SellerProductController
 * -----------------------
 * Endpoints del VENDEDOR (COMMON) para administrar sus productos.
 * Permanente: crea/edita/lista. Todo queda PENDING hasta moderación.
 */

@RestController
@RequestMapping("/api/seller/products")
@RequiredArgsConstructor
public class SellerProductController {

  private final ProductService productService;

  private UUID currentUserId() {
    Object p = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return (p instanceof User u) ? u.getId() : null;
  }

  /** Listar mis productos */
  @GetMapping
  public ResponseEntity<Page<Resp>> mine(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "12") int size) {
    return ResponseEntity.ok(productService.listMine(currentUserId(), page, size));
  }

  /** Crear nuevo producto */
  @PostMapping
  public ResponseEntity<Resp> create(@RequestBody CreateReq req) {
    return ResponseEntity.ok(productService.createForSeller(currentUserId(), req));
  }

  /** Actualizar producto */
  @PutMapping("/{id}")
  public Resp update(@PathVariable UUID id, @RequestBody UpdateReq req) {
    return productService.updateOwn(currentUserId(), id, req);
  }

  /** Eliminar producto */
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable UUID id) {
    productService.deleteOwn(currentUserId(), id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Resp> getOne(@PathVariable UUID id) {
    return ResponseEntity.ok(productService.getOwn(currentUserId(), id));
  }

}
