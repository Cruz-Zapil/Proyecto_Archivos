package com.ecgt.api.dto.admin;


import lombok.AllArgsConstructor; import lombok.Data;
import java.util.UUID;

@Data @AllArgsConstructor
public class TopProductItem {
  private UUID productId;
  private String productName;
  private long totalSold;
  private double totalRevenue; // GTQ
}
