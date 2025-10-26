package com.ecgt.api.service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecgt.api.dto.orders.CheckoutRequest;
import com.ecgt.api.dto.orders.CheckoutItemDTO;
import com.ecgt.api.dto.orders.OrderResponse;
import com.ecgt.api.model.Order;
import com.ecgt.api.model.OrderItem;
import com.ecgt.api.model.Payment;
import com.ecgt.api.model.User;
import com.ecgt.api.repository.OrderItemRepository;
import com.ecgt.api.repository.OrderRepository;
import com.ecgt.api.repository.PaymentRepository;
import com.ecgt.api.repository.ProductRepository;
import com.ecgt.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final PaymentRepository paymentRepo;

    /**
     * checkout()
     * ----------
     * Crea una nueva orden, guarda los ítems y genera el pago asociado.
     */
    @Transactional
    public OrderResponse checkout(CheckoutRequest req) {
        //  1. Obtener usuario
        User user = userRepo.findById(req.getUserId())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        //  2. Crear orden base
        Order order = Order.builder()
            .user(user)
            .estado("EN_CURSO")
            .fechaCreacion(OffsetDateTime.now())
            .fechaEntregaEstimada(OffsetDateTime.now().plusDays(5))
            .build();
        orderRepo.save(order);

        //  3. Agregar ítems de la orden
        BigDecimal total = BigDecimal.ZERO;
        for (CheckoutItemDTO i : req.getItems()) {
            var product = productRepo.findById(i.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(i.getQty())));

                    //  Resta stock
        if (product.getStock() < i.getQty()) {
            throw new RuntimeException("Stock insuficiente para " + product.getName());
        }
        product.setStock(product.getStock() - i.getQty());



            OrderItem item = OrderItem.builder()
                .order(order)
                .product(product)
                .quantity(i.getQty())
                .priceAtPurchase(product.getPrice())
                .build();

            orderItemRepo.save(item);
        }

        //  4. Registrar pago
        Payment payment = Payment.builder()
            .order(order)
            .user(user)
            .monto(total)
            .metodo(req.getMetodoPago())
            .estado("COMPLETADO")
            .fechaPago(OffsetDateTime.now())
            .build();
        paymentRepo.save(payment);

        //  5. Respuesta simplificada
        return new OrderResponse(order.getId(), total.doubleValue(), order.getFechaEntregaEstimada());
    }

    /**
     * listMine()
     * ----------
     * Lista todas las órdenes de un usuario.
     */
    public List<OrderResponse> listMine(UUID userId) {
        return orderRepo.findByUserId(userId)
            .stream()
            .map(o -> new OrderResponse(
                    o.getId(),
                    o.getOrderItems().stream()
                        .mapToDouble(i -> i.getPriceAtPurchase().doubleValue() * i.getQuantity())
                        .sum(),
                    o.getFechaEntregaEstimada()))
            .toList();
    }

    /**
     * listAll()
     * ----------
     * (solo para depuración)
     */
    public List<Order> listAll() {
        return orderRepo.findAll();
    }
}
