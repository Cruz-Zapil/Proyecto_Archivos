
package com.ecgt.api.service;

import com.ecgt.api.dto.admin.*;
import com.ecgt.api.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminReportsService {

  private final ReportRepository repo;

  public List<TopProductItem> topProducts(Instant start, Instant end, int limit) {
    return repo.topProducts(start, end, limit).stream()
        .map(r -> new TopProductItem(
            (UUID)   r[0],                 // product_id
            (String) r[1],                 // product_name
            ((Number) r[2]).longValue(),   // total_sold
            ((Number) r[3]).doubleValue()  // total_revenue
        )).toList();
  }

  public List<TopClientItem> topClientsByRevenue(Instant start, Instant end, int limit) {
    return repo.topClientsByRevenue(start, end, limit).stream()
        .map(r -> new TopClientItem(
            (UUID)   r[0],
            (String) r[1],
            ((Number) r[2]).doubleValue()
        )).toList();
  }

  public List<TopClientItem> topClientsBySales(Instant start, Instant end, int limit) {
    return repo.topClientsBySales(start, end, limit).stream()
        .map(r -> new TopClientItem(
            (UUID)   r[0],
            (String) r[1],
            ((Number) r[2]).doubleValue()
        )).toList();
  }

  public List<TopClientItem> topClientsByOrders(Instant start, Instant end, int limit) {
    return repo.topClientsByOrders(start, end, limit).stream()
        .map(r -> new TopClientItem(
            (UUID)   r[0],
            (String) r[1],
            ((Number) r[2]).doubleValue()
        )).toList();
  }

  public List<TopClientItem> topClientsByProducts(Instant start, Instant end, int limit) {
    return repo.topClientsByProducts(start, end, limit).stream()
        .map(r -> new TopClientItem(
            (UUID)   r[0],
            (String) r[1],
            ((Number) r[2]).doubleValue()
        )).toList();
  }

  public List<SanctionItem> sanctions(Instant start, Instant end) {
    return repo.sanctions(start, end).stream()
        .map(r -> {
          UUID id       = (UUID) r[0];
          String motivo = (String) r[1];
          Instant fecha = ((java.sql.Timestamp) r[2]).toInstant();
          String estado = (String) r[3];
          boolean active = "ACTIVA".equalsIgnoreCase(estado);
          Instant resolvedAt = active ? null : fecha; // no hay columna específica; usa fecha como cierre
          return new SanctionItem(id, active, motivo, fecha, resolvedAt);
        }).toList();
  }

  public List<NotificationItem> notifications(Instant start, Instant end) {
    return repo.notifications(start, end).stream()
        .map(r -> new NotificationItem(
            (UUID) r[0],
            (UUID) r[1],
            (String) r[2], // tipo
            (String) r[3], // estado
            ((java.sql.Timestamp) r[4]).toInstant()
        )).toList();
  }
}
