package com.ecgt.api.controller;

import com.ecgt.api.dto.admin.*;
import com.ecgt.api.service.AdminReportsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/admin/reports")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminReportsController {

  private final AdminReportsService svc;

  @GetMapping("/top-products")
  public List<TopProductItem> topProducts(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end,
      @RequestParam(defaultValue = "10") int limit) {
    return svc.topProducts(start, end, limit);
  }

  @GetMapping("/top-clients/revenue")
  public List<TopClientItem> topClientsRevenue(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end,
      @RequestParam(defaultValue = "5") int limit) {
    return svc.topClientsByRevenue(start, end, limit);
  }

  @GetMapping("/top-clients/sales")
  public List<TopClientItem> topClientsSales(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end,
      @RequestParam(defaultValue = "5") int limit) {
    return svc.topClientsBySales(start, end, limit);
  }

  @GetMapping("/top-clients/orders")
  public List<TopClientItem> topClientsOrders(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end,
      @RequestParam(defaultValue = "10") int limit) {
    return svc.topClientsByOrders(start, end, limit);
  }

  @GetMapping("/top-clients/products")
  public List<TopClientItem> topClientsProducts(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end,
      @RequestParam(defaultValue = "10") int limit) {
    return svc.topClientsByProducts(start, end, limit);
  }

  @GetMapping("/sanctions")
  public List<SanctionItem> sanctions(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end) {
    return svc.sanctions(start, end);
  }

  @GetMapping("/notifications")
  public List<NotificationItem> notifications(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant end) {
    return svc.notifications(start, end);
  }
}
