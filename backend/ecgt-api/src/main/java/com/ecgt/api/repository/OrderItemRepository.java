package com.ecgt.api.repository;

import com.ecgt.api.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {

    /** Lista los ítems asociados a una orden */
    List<OrderItem> findByOrderId(UUID orderId);
}
