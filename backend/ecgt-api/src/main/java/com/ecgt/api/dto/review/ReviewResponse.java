
package com.ecgt.api.dto.review;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * ReviewResponse DTO
 * -------------------
 * Datos simplificados que se devuelven al frontend tras crear u obtener reseñas.
 * Evita exponer relaciones completas de JPA o datos sensibles.
 */
public record ReviewResponse(
        UUID id,
        String userName,
        int rating,
        String comment,
        LocalDateTime createdAt
) {}
