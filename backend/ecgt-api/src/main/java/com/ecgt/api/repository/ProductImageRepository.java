package com.ecgt.api.repository;

import com.ecgt.api.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
    List<ProductImage> findByProductIdOrderByOrderIndexAsc(UUID productId);
    void deleteByProductId(UUID productId);
}
