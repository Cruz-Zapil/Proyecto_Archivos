package com.ecgt.api.repository;

import com.ecgt.api.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    /** Lista todas las órdenes realizadas por un usuario */
    List<Order> findByUserId(UUID userId);

    /** Lista las órdenes por estado (ej: EN_CURSO, ENTREGADO) */
    List<Order> findByEstado(String estado);
}
