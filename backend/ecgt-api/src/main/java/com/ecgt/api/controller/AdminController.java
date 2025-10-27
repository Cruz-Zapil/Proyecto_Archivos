package com.ecgt.api.controller;

import com.ecgt.api.dto.admin.*;
import com.ecgt.api.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")

@RequiredArgsConstructor
public class AdminController {

  private final AdminService adminService;

  /** Lista todos los empleados (MODERATOR/LOGISTICS/ADMIN + opcional COMMON si quisieras) */
  @GetMapping("/users")
  public ResponseEntity<List<UserResp>> listAll() {
    return ResponseEntity.ok(adminService.listUsers());
  }

  /** Crea empleado (NO COMMON) */
  @PostMapping("/users")
  public ResponseEntity<UserResp> create(@RequestBody CreateUserReq req) {
    return ResponseEntity.ok(adminService.createUser(req));
  }

  /** Actualiza empleado por id */
  @PutMapping("/users/{id}")
  public ResponseEntity<UserResp> update(@PathVariable UUID id, @RequestBody UpdateUserReq req) {
    return ResponseEntity.ok(adminService.updateUser(id, req));
  }

  /** Elimina empleado por id (opcional) */
  @DeleteMapping("/users/{id}")
  public ResponseEntity<Void> delete(@PathVariable UUID id) {
    adminService.deleteUser(id);
    return ResponseEntity.noContent().build();
  }
}
