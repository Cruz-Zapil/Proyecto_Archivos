package com.ecgt.api.service;

import com.ecgt.api.dto.cart.CartItemDTO;
import com.ecgt.api.dto.cart.CartResponse;
import com.ecgt.api.model.*;
import com.ecgt.api.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepo;
    private final CartItemRepository itemRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;

    /** Obtener carrito del usuario */
    public CartResponse getCart(UUID userId) {
        Cart cart = cartRepo.findByUserId(userId).orElseGet(() -> {
            User user = userRepo.findById(userId).orElseThrow();
            Cart c = Cart.builder().user(user).build();
            return cartRepo.save(c);
        });

        List<CartItemDTO> items = itemRepo.findByCartId(cart.getId())
                .stream()
                .map(i -> new CartItemDTO(
                        i.getProduct().getId(),
                        i.getProduct().getName(),
                        i.getQuantity(),
                        i.getProduct().getPrice()
                )).toList();

        return new CartResponse(cart.getId(), items);
    }

    /** Agregar o actualizar ítem en el carrito */
    @Transactional
    public CartResponse addOrUpdateItem(UUID userId, CartItemDTO dto) {
        Cart cart = cartRepo.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepo.findById(userId).orElseThrow();
                    Cart c = Cart.builder().user(user).build();
                    return cartRepo.save(c);
                });

        Product product = productRepo.findById(dto.getProductId()).orElseThrow();

        CartItem existing = itemRepo.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + dto.getQuantity());
            itemRepo.save(existing);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(dto.getQuantity())
                    .build();
            itemRepo.save(newItem);
        }

        return getCart(userId);
    }

    @Transactional
    public void removeItem(UUID userId, UUID productId) {
        Cart cart = cartRepo.findByUserId(userId).orElseThrow();
        itemRepo.deleteByCartIdAndProductId(cart.getId(), productId);
    }

    @Transactional
    public void clearCart(UUID userId) {
        Cart cart = cartRepo.findByUserId(userId).orElseThrow();
        itemRepo.deleteByCartId(cart.getId());
    }
}
