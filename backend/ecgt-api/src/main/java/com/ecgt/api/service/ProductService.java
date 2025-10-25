/**
 * ProductService
 * ---------------
 * Reglas de negocio de productos (crear/editar/listar).
 * Permanente: valida dueño, estados y límites (2 categorías).
 */
package com.ecgt.api.service;

import com.ecgt.api.dto.ProductDtos.*;
import com.ecgt.api.model.*;
import com.ecgt.api.model.enums.ProductStatus;
import com.ecgt.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepo;
  private final CategoryRepository categoryRepo;
  private final UserRepository userRepo;

  private Set<Category> loadCategories(List<UUID> ids) {
    if (ids == null) return Set.of();
    if (ids.size() > 2) throw new RuntimeException("Máximo 2 categorías por producto");
    return new HashSet<>(categoryRepo.findAllById(ids));
  }

  private Resp toResp(Product p) {
    
    return Resp.builder()
        .id(p.getId())
        .name(p.getName())
        .description(p.getDescription())
        .price(p.getPrice())
        .stock(p.getStock())
        .condition(p.getCondition())
        .status(p.getReviewStatus().name())
        .categories(p.getCategories().stream().map(Category::getName).toList())
        .build();
  }

  @Transactional
  public Resp createForSeller(UUID sellerId, CreateReq req) {
    if (req.getStock() == null || req.getStock() < 1) throw new RuntimeException("Stock mínimo 1");
    User seller = userRepo.findById(sellerId).orElseThrow();
    Product p = Product.builder()
        .name(req.getName())
        .description(req.getDescription())
        .price(req.getPrice())
        .stock(req.getStock())
        .condition(req.getCondition())
        .reviewStatus(ProductStatus.PENDING) // ← siempre PENDING
        .seller(seller)
        .categories(loadCategories(req.getCategoryIds()))
        .build();
    productRepo.save(p);
    // TODO: guardar imágenes en product_images (luego)
    return toResp(p);
  }

  @Transactional
  public Resp updateOwn(UUID sellerId, UUID productId, UpdateReq req) {
    Product p = productRepo.findByIdAndSellerId(productId, sellerId)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado o no autorizado"));

    if (req.getStock() != null && req.getStock() < 1) throw new RuntimeException("Stock mínimo 1");

    if (req.getName() != null) p.setName(req.getName());
    if (req.getDescription() != null) p.setDescription(req.getDescription());
    if (req.getPrice() != null) p.setPrice(req.getPrice());
    if (req.getStock() != null) p.setStock(req.getStock());
    if (req.getCondition() != null) p.setCondition(req.getCondition());

    if (req.getCategoryIds() != null) p.setCategories(loadCategories(req.getCategoryIds()));

    // Cada actualización vuelve a revisión
    p.setReviewStatus(ProductStatus.PENDING);

    return toResp(p);
  }

  public Page<Resp> listMine(UUID sellerId, int page, int size) {
    Page<Product> pg = productRepo.findBySeller(
        userRepo.findById(sellerId).orElseThrow(),
        PageRequest.of(page, size, Sort.by("createdAt").descending())
    );
    return pg.map(this::toResp);
  }

  public Page<Resp> listPublicApproved(int page, int size) {
    return productRepo.findByReviewStatus(
        ProductStatus.APPROVED, PageRequest.of(page, size)
    ).map(this::toResp);
  }

  // --- Moderation ---
  public Page<Resp> listPending(int page, int size) {
    return productRepo.findByReviewStatus(ProductStatus.PENDING, PageRequest.of(page, size))
        .map(this::toResp);
  }

  

  @Transactional
  public Resp approve(UUID productId) {
    Product p = productRepo.findById(productId).orElseThrow();
    p.setReviewStatus(ProductStatus.APPROVED);
    return toResp(p);
  }

  @Transactional
  public Resp reject(UUID productId) {
    Product p = productRepo.findById(productId).orElseThrow();
    p.setReviewStatus(ProductStatus.REJECTED);
    return toResp(p);
  }

  @Transactional
public void deleteOwn(UUID sellerId, UUID productId) {
  Product p = productRepo.findByIdAndSellerId(productId, sellerId)
      .orElseThrow(() -> new RuntimeException("Producto no encontrado o no autorizado"));
  productRepo.delete(p);
}

}
