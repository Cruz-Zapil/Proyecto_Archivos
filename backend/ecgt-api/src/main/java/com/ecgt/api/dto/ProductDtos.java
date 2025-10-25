package com.ecgt.api.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.*;

import com.ecgt.api.model.enums.ProductCondition;
import com.ecgt.api.model.enums.ProductStatus;


/**
 * Product DTOs
 * -------------
 * Estructuras para crear/actualizar/exponer productos.
 * Permanente: contrato estable con el frontend.
 */


 

public class ProductDtos {

  @Data
  public static class CreateReq {
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private ProductCondition condition; // NEW/USED
    private List<UUID> categoryIds;     // máx 2
    private List<String> imageUrls;     // opcional (solo URL)
  }

@Data
public static class UpdateReq {
  private String name;
  private String description;
  private BigDecimal price;
  private Integer stock;                // >= 1
  private ProductCondition condition;   // NEW / USED  (mapea a status_product)
  private List<UUID> categoryIds;
  private List<String> imageUrls;
}


  @Builder @Data
  public static class Resp {
    private UUID id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private ProductCondition condition;
    private String status;
    private List<String> categories; // nombres
  }
}
