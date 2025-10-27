// com.ecgt.api.controller.AdminPingController.java

package com.ecgt.api.dto.admin;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminPingController {

  @GetMapping("/ping")
//  @PreAuthorize("hasRole('ADMIN')")
  public Map<String, Object> ping() {
    return Map.of("ok", true, "ts", Instant.now().toString());
  }
}
