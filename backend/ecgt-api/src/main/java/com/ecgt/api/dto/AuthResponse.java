package com.ecgt.api.dto;

import com.ecgt.api.model.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String accessToken;
    private User user;
}
