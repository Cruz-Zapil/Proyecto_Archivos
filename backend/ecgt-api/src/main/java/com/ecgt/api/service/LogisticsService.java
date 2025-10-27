package com.ecgt.api.service;

import com.ecgt.api.dto.logistics.LogisticsDtos.*;
import com.ecgt.api.model.Order;
import com.ecgt.api.model.OrderItem;
import com.ecgt.api.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LogisticsService {

    private final OrderRepository orderRepo;

    private OrderDTO toDto(Order o) {
        return OrderDTO.builder()
            .id(o.getId())
            .estado(o.getEstado())
            .fechaCreacion(o.getFechaCreacion())
            .fechaEntregaEstimada(o.getFechaEntregaEstimada())
            .fechaEntregado(o.getFechaEntregado())
            .user(o.getUser() != null ? new UserMinDTO(o.getUser().getName()) : null)
            .orderItems(
                o.getOrderItems() == null ? List.of()
                    : o.getOrderItems().stream().map(this::toDto).toList()
            )
            .build();
    }

    private OrderItemDTO toDto(OrderItem it) {
        return OrderItemDTO.builder()
            .quantity(it.getQuantity())
            .priceAtPurchase(
                it.getPriceAtPurchase() != null ? it.getPriceAtPurchase().doubleValue() : 0d
            )
            .product(it.getProduct() != null ? new ProductMinDTO(it.getProduct().getName()) : null)
            .build();
    }

    /** Listar EN_CURSO en formato DTO (evita problemas Jackson/Hibernate) */
    @Transactional(readOnly = true)
    public List<OrderDTO> listInProgress() {
        return orderRepo.findByEstado("EN_CURSO").stream().map(this::toDto).toList();
    }

    /** Cambiar fecha estimada */
    @Transactional
    public OrderDTO updateDeliveryDate(UUID orderId, OffsetDateTime newDate) {
        var order = orderRepo.findById(orderId).orElseThrow();
        order.setFechaEntregaEstimada(newDate);
        return toDto(order);
    }

    /** Marcar entregado */
    @Transactional
    public OrderDTO markDelivered(UUID orderId) {
        var order = orderRepo.findById(orderId).orElseThrow();
        order.setEstado("ENTREGADO");
        order.setFechaEntregado(OffsetDateTime.now());
        return toDto(order);
    }
}
