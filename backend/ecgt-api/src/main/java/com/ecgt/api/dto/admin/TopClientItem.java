package com.ecgt.api.dto.admin;
import lombok.AllArgsConstructor; import lombok.Data;
import java.util.UUID;

@Data @AllArgsConstructor
public class TopClientItem {
  private UUID clientId;
  private String clientName;
  private double value;
}