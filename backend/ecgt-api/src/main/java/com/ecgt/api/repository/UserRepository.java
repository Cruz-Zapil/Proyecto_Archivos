package com.ecgt.api.repository;


import com.ecgt.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, String> {
  Optional<User> findByEmail(String email);
}