package com.ecgt.api.dto.admin;

import java.time.LocalDateTime;
import java.util.UUID;


public record ReviewResponse(
    UUID id,
    String userName,
    int rating,
    String comment,
    LocalDateTime createdAt
) {}
