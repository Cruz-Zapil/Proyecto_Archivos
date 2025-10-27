package com.ecgt.api.dto.admin;
import lombok.AllArgsConstructor; import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data @AllArgsConstructor
public class NotificationItem {
  private UUID id;
  private UUID userId;
  private String type;     // PEDIDO | PRODUCTO
  private String status;   // ENVIADA | LEIDA
  private Instant sentAt;  // fecha_envio
}