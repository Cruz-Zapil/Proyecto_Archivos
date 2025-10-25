package com.ecgt.api.repository;

import com.ecgt.api.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * CategoryRepository
 * ------------------
 * Acceso a datos para categorías.
 * Permite buscar, crear o listar categorías de productos.
 */
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    /** Buscar por nombre */
    Optional<Category> findByName(String name);
}
