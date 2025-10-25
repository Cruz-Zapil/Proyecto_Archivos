package com.ecgt.api.controller;

import com.ecgt.api.dto.ProductDtos.Resp;
import com.ecgt.api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class PublicProductController {

  private final ProductService productService;

  /**  Lista pública (productos aprobados) */
  @GetMapping("/approved")
  public ResponseEntity<Page<Resp>> listApproved(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "12") int size
  ) {
    return ResponseEntity.ok(productService.listPublicApproved(page, size));
  }
}
