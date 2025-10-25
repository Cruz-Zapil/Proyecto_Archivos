package com.ecgt.api.repository;

import com.ecgt.api.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    /** Busca pagos realizados por usuario */
    List<Payment> findByUserId(UUID userId);

    /** Busca pagos asociados a una orden específica */
    Optional<Payment> findByOrderId(UUID orderId);
}
