
package com.ecgt.api.dto.admin;
import lombok.AllArgsConstructor; import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data @AllArgsConstructor
public class SanctionItem {
  private UUID id;
  private boolean active;
  private String reason;
  private Instant createdAt;
  private Instant resolvedAt; // puede ser null
}