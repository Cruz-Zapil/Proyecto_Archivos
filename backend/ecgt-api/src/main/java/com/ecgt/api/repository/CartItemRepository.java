package com.ecgt.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ecgt.api.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, UUID> {
    List<CartItem> findByCartUserId(UUID userId);
    Optional<CartItem> findByCartIdAndProductId(UUID cartId, UUID productId);

    @Modifying
    @Query("delete from CartItem ci where ci.cart.user.id = :userId")
    void deleteByCartUserId(UUID userId);

    @Modifying
    @Query("delete from CartItem ci where ci.cart.id = :cartId")
    void deleteByCartId(UUID cartId);
}
