CREATE DATABASE my_dbEcommerce;

--- --------------------------------------------------------
--- extensions 
--- --------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
--- --------------------------------------------------------


---  ========================================================
---  Tablas principales
---  ========================================================

-- Tabla de rol
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL ,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role_id UUID REFERENCES roles(id) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Tabla de productos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL,
    status_product VARCHAR(10) CHECK (status_product IN ('NEW','USED')),
    status VARCHAR(20) CHECK (status IN ('PENDING','APPROVED','REJECTED')) DEFAULT 'PENDING',
    id_vendedor UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Tabla  de categorias
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Tabla intermedia para relacionar productos y categorias (muchos a muchos)
CREATE TABLE product_categories (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES category(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);


--- Tabla de producto imagenes
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    order_index INT DEFAULT 0
);


-- Tabla de CARRITO DE COMPRAS
CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Tabla de items en el carrito
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID REFERENCES cart(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0)
);

-- Tabla de ordenes de compra
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    estado VARCHAR(20) CHECK (estado IN ('EN_CURSO','ENTREGADO')) DEFAULT 'EN_CURSO',
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega_estimada TIMESTAMP WITH TIME ZONE,
    fecha_entregado TIMESTAMP WITH TIME ZONE
);


-- Tabla de items en la orden de compra
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase NUMERIC(12, 2) NOT NULL
);


-- Tabla de pagos

CREATE TABLE payment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES "orders"(id) ON DELETE SET NULL,
  user_id UUID REFERENCES "users"(id) ON DELETE SET NULL,
  monto NUMERIC(12,2) NOT NULL,
  metodo VARCHAR(50) DEFAULT 'TARJETA',
  estado VARCHAR(20) DEFAULT 'COMPLETADO',
  fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--- Tabla de Targetas de credito
--  Tarjetas guardadas
CREATE TABLE saved_card (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "users"(id) ON DELETE CASCADE,
  card_holder VARCHAR(100),
  last_four VARCHAR(4),
  brand VARCHAR(50),
  token VARCHAR(255), -- Token cifrado del gateway
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---  ========================================================
---  Notificaciones y moderacon
---  ========================================================


CREATE TABLE sanction (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "users"(id) ON DELETE CASCADE,
  motivo TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) CHECK (estado IN ('ACTIVA','RESUELTA')) DEFAULT 'ACTIVA'
);

CREATE TABLE notification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "users"(id) ON DELETE CASCADE,
  mensaje TEXT NOT NULL,
  tipo VARCHAR(20) CHECK (tipo IN ('PEDIDO','PRODUCTO')),
  estado VARCHAR(20) CHECK (estado IN ('ENVIADA','LEIDA')) DEFAULT 'ENVIADA',
  fecha_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


---  ========================================================
---  Índices para optimización de consultas
---  ========================================================

CREATE INDEX IF NOT EXISTS idx_orders_fecha  ON orders(fecha_creacion);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_products_vendedor ON products(id_vendedor);
CREATE INDEX IF NOT EXISTS idx_products_status_created ON products(status, created_at);
CREATE INDEX IF NOT EXISTS idx_sanction_fecha ON sanction(fecha);
CREATE INDEX IF NOT EXISTS idx_notification_fecha ON notification(fecha_envio);



 --- ========================================================
---  ingregos de Admin 
---  ========================================================


-- Roles base
INSERT INTO roles (name)
VALUES ('COMMON'), ('MODERATOR'), ('LOGISTICS'), ('ADMIN');

-- Usuario administrador inicial
INSERT INTO "users" (name, email, password_hash, role_id, enabled)
SELECT
  'Administrador General',
  'admin@demo.com',
  '$2a$10$ABCfakeHashForDemo123456789',
  id,
  TRUE
FROM roles WHERE name = 'ADMIN';