package com.ecgt.api.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
