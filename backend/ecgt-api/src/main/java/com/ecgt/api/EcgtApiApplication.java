package com.ecgt.api;

import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import com.ecgt.api.model.User;

@SpringBootApplication
 @EnableMethodSecurity
public class EcgtApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcgtApiApplication.class, args);
	}

	private UUID currentUserId() {
  Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  return (principal instanceof User u) ? u.getId() : null;
}

}
