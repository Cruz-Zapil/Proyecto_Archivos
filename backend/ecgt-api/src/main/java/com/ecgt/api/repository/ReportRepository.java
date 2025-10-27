
package com.ecgt.api.repository;

import com.ecgt.api.model.Order; // usa tu entidad Order existente
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReportRepository extends JpaRepository<Order, UUID> {

  // Top 10 productos más vendidos (con revenue)
  @Query(value = """
      SELECT p.id AS product_id,
             p.name AS product_name,
             SUM(oi.quantity) AS total_sold,
             SUM(oi.quantity * oi.price_at_purchase) AS total_revenue
      FROM order_items oi
      JOIN orders o   ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      WHERE o.fecha_creacion BETWEEN :start AND :end
      GROUP BY p.id, p.name
      ORDER BY total_sold DESC
      LIMIT :limit
      """, nativeQuery = true)
  List<Object[]> topProducts(@Param("start") Instant start,
                             @Param("end") Instant end,
                             @Param("limit") int limit);

  // Top 5 clientes con más ganancias por compras (compradores)
  @Query(value = """
      SELECT u.id AS client_id,
             u.name AS client_name,
             COALESCE(SUM(oi.quantity * oi.price_at_purchase),0) AS revenue
      FROM orders o
      JOIN users u ON u.id = o.user_id
      JOIN order_items oi ON oi.order_id = o.id
      WHERE o.fecha_creacion BETWEEN :start AND :end
      GROUP BY u.id, u.name
      ORDER BY revenue DESC
      LIMIT :limit
      """, nativeQuery = true)
  List<Object[]> topClientsByRevenue(@Param("start") Instant start,
                                     @Param("end") Instant end,
                                     @Param("limit") int limit);

  // Top 5 clientes que más productos han vendido (vendedores)
  @Query(value = """
      SELECT u.id AS client_id,
             u.name AS client_name,
             COALESCE(SUM(oi.quantity),0) AS sold_qty
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      JOIN users u ON u.id = p.id_vendedor
      WHERE o.fecha_creacion BETWEEN :start AND :end
      GROUP BY u.id, u.name
      ORDER BY sold_qty DESC
      LIMIT :limit
      """, nativeQuery = true)
  List<Object[]> topClientsBySales(@Param("start") Instant start,
                                   @Param("end") Instant end,
                                   @Param("limit") int limit);

  // Top 10 clientes que más pedidos han realizado (compradores)
  @Query(value = """
      SELECT u.id AS client_id,
             u.name AS client_name,
             COUNT(o.id) AS orders_count
      FROM orders o
      JOIN users u ON u.id = o.user_id
      WHERE o.fecha_creacion BETWEEN :start AND :end
      GROUP BY u.id, u.name
      ORDER BY orders_count DESC
      LIMIT :limit
      """, nativeQuery = true)
  List<Object[]> topClientsByOrders(@Param("start") Instant start,
                                    @Param("end") Instant end,
                                    @Param("limit") int limit);

  // Top 10 clientes que más productos tienen a la venta (vendedores)
  // Ajusté a status=APPROVED dentro del rango de creación. Cambia si prefieres otra regla.
  @Query(value = """
      SELECT u.id AS client_id,
             u.name AS client_name,
             COUNT(p.id) AS products_count
      FROM products p
      JOIN users u ON u.id = p.id_vendedor
      WHERE p.status = 'APPROVED'
        AND p.created_at BETWEEN :start AND :end
      GROUP BY u.id, u.name
      ORDER BY products_count DESC
      LIMIT :limit
      """, nativeQuery = true)
  List<Object[]> topClientsByProducts(@Param("start") Instant start,
                                      @Param("end") Instant end,
                                      @Param("limit") int limit);

  // Historial de sanciones
  @Query(value = """
      SELECT s.id, s.motivo, s.fecha, s.estado
      FROM sanction s
      WHERE s.fecha BETWEEN :start AND :end
      ORDER BY s.fecha DESC
      """, nativeQuery = true)
  List<Object[]> sanctions(@Param("start") Instant start,
                           @Param("end") Instant end);

  // Historial de notificaciones
  @Query(value = """
      SELECT n.id, n.user_id, n.tipo, n.estado, n.fecha_envio
      FROM notification n
      WHERE n.fecha_envio BETWEEN :start AND :end
      ORDER BY n.fecha_envio DESC
      """, nativeQuery = true)
  List<Object[]> notifications(@Param("start") Instant start,
                               @Param("end") Instant end);
}