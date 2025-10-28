package com.ecgt.api.dto.review;



/**
 * CreateReviewRequest DTO
 * ------------------------
 * Representa el cuerpo JSON que el frontend envía al crear una reseña.
 */
public record CreateReviewRequest(
        int rating,
        String comment
) {}
