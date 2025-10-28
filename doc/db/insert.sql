
--  Usuarios COMMON
INSERT INTO users (name, email, password_hash, role_id)
VALUES
('Juan Pérez',      'juan.perez2@example.com',     '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),
('María López',     'maria.lopez2@example.com',     '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),
('Carlos Gómez',    'carlos.gomez@example.com',    '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),
('Ana Martínez',    'ana.martinez@example.com',    '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),
('Luis Rodríguez',  'luis.rodriguez@example.com',  '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),

('Juan Pérez',    'juan.perez@example.com',    '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),
('María López',   'maria.lopez@example.com',   '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),
('Carlos García', 'carlos.garcia@example.com', '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),
('Ana Morales',   'ana.morales@example.com',   '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON')),
('Luis Gómez',    'luis.gomez@example.com',    '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='COMMON'));

--  Usuarios MODERATOR
INSERT INTO users (name, email, password_hash, role_id)
VALUES
('Pedro Torres', 'pedro.torres@example.com',          '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='MODERATOR')),
('Laura Díaz', 'laura.diaz@example.com',              '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='MODERATOR')),
('Ricardo Castillo', 'ricardo.castillo@example.com',  '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='MODERATOR')),
('Sofía Hernández', 'sofia.hernandez@example.com',    '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='MODERATOR')),
('Diego Ramos', 'diego.ramos@example.com',            '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='MODERATOR'));

--  Usuarios LOGISTICS
INSERT INTO users (name, email, password_hash, role_id)
VALUES
('Andrés López', 'andres.lopez@example.com',         '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='LOGISTICS')),
('Paula Méndez', 'paula.mendez@example.com',         '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='LOGISTICS')),
('Roberto Sánchez', 'roberto.sanchez@example.com',   '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='LOGISTICS')),
('Elena Vargas', 'elena.vargas@example.com',         '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='LOGISTICS')),
('Miguel Ruiz', 'miguel.ruiz@example.com',           '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='LOGISTICS'));


--- usuario admin para pruebas
INSERT INTO users (name, email, password_hash, role_id)
VALUES
('Admin User', 'admin.user@example.com', '$2a$10$ZUoOR9VU6JhbJtmp2ZnK6eMo/4k4rWcBMvn9KG8tFL2LDnHdmJXJ2', (SELECT id FROM roles WHERE name='ADMIN'));


---- ingresar producto: 
-- =========================================================


-- ---------- Productos de Juan Pérez ----------
INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Auriculares Pro JP-1',         'Bluetooth 5.3, cancelación de ruido',                 599.90, 15, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('Teclado Mecánico JP-2',        'Switches rojos, retroiluminado',                      349.00, 10, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('Mouse Gamer JP-3',             'RGB, 8000 DPI',                                       199.99, 20, 'NEW',  'PENDING',  (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('Monitor 24" JP-4',             'IPS, 75Hz, Full HD',                                  1299.00, 5, 'USED', 'APPROVED', (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('SSD 500GB JP-5',               'NVMe Gen3, lectura 3000MB/s',                         499.00, 12, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('Disco Externo 1TB JP-6',       'USB 3.2, portátil',                                   429.00, 9,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('Parlantes 2.1 JP-7',           'Subwoofer compacto, 30W',                             259.00, 7,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('Webcam 1080p JP-8',            'Autofoco, micrófono integrado',                       189.00, 14, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('Router Doble Banda JP-9',      'AC1200, 4 antenas',                                   299.00, 8,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='juan.perez2@example.com')),
('Silla Gamer JP-10',            'Ergonómica, reposabrazos 2D',                         999.00, 3,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='juan.perez2@example.com'));


INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Auriculares Pro JP-1',         'Bluetooth 5.3, cancelación de ruido',                 599.90, 15, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez@example.com')),
('Teclado Mecánico JP-2',        'Switches rojos, retroiluminado',                      349.00, 10, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez@example.com')),
('Mouse Gamer JP-3',             'RGB, 8000 DPI',                                       199.99, 20, 'NEW',  'PENDING',  (SELECT id FROM users WHERE email='juan.perez@example.com')),
('Monitor 24" JP-4',             'IPS, 75Hz, Full HD',                                  1299.00, 5, 'USED', 'APPROVED', (SELECT id FROM users WHERE email='juan.perez@example.com')),
('SSD 500GB JP-5',               'NVMe Gen3, lectura 3000MB/s',                         499.00, 12, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez@example.com')),
('Disco Externo 1TB JP-6',       'USB 3.2, portátil',                                   429.00, 9,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='juan.perez@example.com')),
('Parlantes 2.1 JP-7',           'Subwoofer compacto, 30W',                             259.00, 7,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez@example.com')),
('Webcam 1080p JP-8',            'Autofoco, micrófono integrado',                       189.00, 14, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='juan.perez@example.com')),
('Router Doble Banda JP-9',      'AC1200, 4 antenas',                                   299.00, 8,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='juan.perez@example.com')),
('Silla Gamer JP-10',            'Ergonómica, reposabrazos 2D',                         999.00, 3,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='juan.perez@example.com'));

-- ---------- Productos de María López ----------
INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Lámpara de Escritorio ML-1',   'LED, brazo flexible, 3 modos',                         149.00, 25, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Organizador ML-2',             'Cajonera pequeña para oficina',                        99.00,  30, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Cafetera ML-3',                'Filtro permanente, 6 tazas',                           219.00, 6,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Set Sartenes ML-4',            'Antiadherente, 3 piezas',                              329.00, 8,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Toallas ML-5',                  'Algodón, pack x4',                                    159.00, 18, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Decoración Pared ML-6',        'Cuadros minimalistas x3',                              189.00, 10, 'NEW',  'PENDING',  (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Difusor Aromas ML-7',          'Ultrasónico, 300ml',                                   199.00, 13, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Almohada ML-8',                'Memoria de forma, ergonómica',                         249.00, 5,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Espejo ML-9',                  'Redondo 60cm, marco metálico',                         349.00, 4,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='maria.lopez@example.com')),
('Riel Cortina ML-10',           'Extensible, incluye herrajes',                         139.00, 16, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez@example.com'));


-- ---------- Productos de María López ----------
INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Lámpara de Escritorio ML-1',   'LED, brazo flexible, 3 modos',                         149.00, 25, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Organizador ML-2',             'Cajonera pequeña para oficina',                        99.00,  30, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Cafetera ML-3',                'Filtro permanente, 6 tazas',                           219.00, 6,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Set Sartenes ML-4',            'Antiadherente, 3 piezas',                              329.00, 8,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Toallas ML-5',                  'Algodón, pack x4',                                    159.00, 18, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Decoración Pared ML-6',        'Cuadros minimalistas x3',                              189.00, 10, 'NEW',  'PENDING',  (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Difusor Aromas ML-7',          'Ultrasónico, 300ml',                                   199.00, 13, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Almohada ML-8',                'Memoria de forma, ergonómica',                         249.00, 5,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Espejo ML-9',                  'Redondo 60cm, marco metálico',                         349.00, 4,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='maria.lopez2@example.com')),
('Riel Cortina ML-10',           'Extensible, incluye herrajes',                         139.00, 16, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='maria.lopez2@example.com'));

-- ---------- Productos de Carlos Gómez ----------
INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Libro Álgebra CG-1',           'Edición 2023, tapa dura',                              179.00, 11, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Cuaderno CG-2',                'Cuadriculado, 200 hojas',                               39.00,  40, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Calculadora CG-3',             'Científica, 240 funciones',                            129.00, 9,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Mochila CG-4',                 'Porta laptop 15.6", impermeable',                      299.00, 7,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Resaltadores CG-5',            'Pack x6 colores',                                        59.00, 32, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Soporte Laptop CG-6',          'Ajustable, aluminio',                                   189.00, 14, 'USED', 'PENDING',  (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Audífonos CG-7',               'On-ear, micrófono integrado',                           119.00, 10, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Bolso Deportivo CG-8',         'Ligero, 35L',                                            169.00, 12, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Térmica CG-9',                 '500ml, acero inoxidable',                               99.00,  18, 'USED', 'PENDING',  (SELECT id FROM users WHERE email='carlos.gomez@example.com')),
('Cables USB-C CG-10',           'Pack x3, 1m',                                            69.00,  22, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.gomez@example.com'));

-- ---------- Productos de Ana Ruiz ----------
INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Vestido AR-1',                 'Casual, talla M, color azul',                           249.00, 6,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Blusa AR-2',                   'Lino, talla S',                                          139.00, 9,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Jeans AR-3',                   'Skinny, talla 30',                                       199.00, 8,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Zapatillas AR-4',              'Running, talla 38',                                      349.00, 5,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Chaqueta AR-5',                'Corta viento, talla M',                                  299.00, 4,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Bolso AR-6',                   'Cuero sintético, bandolera',                             219.00, 7,  'NEW',  'PENDING',  (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Sombrero AR-7',                'Ala ancha, verano',                                       99.00,  10, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Bufanda AR-8',                 'Tejida, invierno',                                        79.00,  15, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Cinturón AR-9',                'Piel, hebilla metálica',                                  89.00,  11, 'USED', 'PENDING',  (SELECT id FROM users WHERE email='ana.ruiz@example.com')),
('Guantes AR-10',                'Táctiles, forro suave',                                  109.00, 9,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.ruiz@example.com'));

-- ---------- Productos de Luis Hernández ----------
INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Taladro LH-1',                 'Percutor, 600W',                                         399.00, 6,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Juego Llaves LH-2',            'Combinadas x12',                                         259.00, 10, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Sierra Caladora LH-3',         'Velocidad variable',                                     349.00, 4,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Multímetro LH-4',              'Digital, auto rango',                                    189.00, 8,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Cautín LH-5',                  '60W, con estaño',                                        129.00, 12, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Guantes Trabajo LH-6',         'Cuero, talla L',                                          89.00,  18, 'NEW',  'PENDING',  (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Metro Láser LH-7',             '40m, precisión ±2mm',                                   279.00, 5,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Nivel Burbuja LH-8',           'Aluminio, 60cm',                                          99.00,  14, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Caja Herramientas LH-9',       'Plástica reforzada, 16"',                                149.00, 9,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='luis.hernandez@example.com')),
('Compresor Aire LH-10',         'Portátil 12V',                                           249.00, 3,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.hernandez@example.com'));


--- Carlos García ---
---
--- 
INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Audífonos CG1',       'Bluetooth, cancelación activa',                    499.00, 12, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('Monitor 27" CG2',     'QHD, 165Hz, panel IPS',                            1899.00, 4, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('Mouse Gamer CG3',     'RGB, 8000 DPI, sensor óptico',                     199.00, 8, 'NEW',  'PENDING',  (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('Teclado CG4',         'Mecánico, switches rojos',                         349.00, 6, 'USED', 'APPROVED', (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('Laptop CG5',          'Core i5, 8GB RAM, 512GB SSD',                      4599.00, 3, 'USED', 'APPROVED', (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('Base Laptop CG6',     'Ajustable, aluminio',                              179.00, 10, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('Silla Oficina CG7',   'Ergonómica, soporte lumbar',                       899.00, 5, 'NEW',  'PENDING',  (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('Hub USB-C CG8',       '4 puertos, 3.0',                                   149.00, 15, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('Router CG9',          'WiFi 6, AX1800',                                   449.00, 9, 'USED', 'APPROVED', (SELECT id FROM users WHERE email='carlos.garcia@example.com')),
('SSD Externo CG10',    '1TB, USB 3.2',                                     599.00, 7, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='carlos.garcia@example.com'));


-- Ana Morales ---
--

INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Vestido Floral AM1',      'Talla M, tela suave',                           259.00, 8,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Blusa Blanca AM2',        'Lino natural, talla S',                         199.00, 6,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Pantalón Jeans AM3',      'Skinny, talla 28',                              229.00, 7,  'USED', 'PENDING',  (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Zapatillas AM4',          'Casual, talla 37',                              329.00, 5,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Bolso de Mano AM5',       'Cuero sintético, beige',                        279.00, 4,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Perfume AM6',             '50ml, notas florales',                          399.00, 9,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Reloj Pulsera AM7',       'Acero inoxidable, dorado',                      459.00, 3,  'NEW',  'PENDING',  (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Sombrero Playa AM8',      'Ala ancha, beige',                              119.00, 12, 'USED', 'APPROVED', (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Bufanda AM9',             'Tejida, invierno',                              89.00,  10, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='ana.morales@example.com')),
('Abrigo AM10',             'Largo, talla M, gris',                          599.00, 2,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='ana.morales@example.com'));


---- 
----   ---


INSERT INTO products (name, description, price, stock, status_product, status, id_vendedor)
VALUES
('Taladro LG1',              '600W, percutor, con maletín',                   349.00, 8,  'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Lijadora LG2',             'Orbital 300W',                                 279.00, 5,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Set Destornilladores LG3','12 piezas, acero inoxidable',                   119.00, 14, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Multímetro LG4',           'Digital auto rango',                           159.00, 10, 'NEW',  'PENDING',  (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Sierra Circular LG5',      '1400W, hoja 7-1/4"',                           499.00, 3,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Martillo LG6',             'Mango de fibra, 500g',                         69.00,  25, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Caja Herramientas LG7',    '20", reforzada, con bandeja',                  199.00, 6,  'USED', 'APPROVED', (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Nivel Láser LG8',          'Proyección cruz, 15m',                         379.00, 4,  'NEW',  'PENDING',  (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Guantes Protección LG9',   'Cuero, talla L',                               99.00,  18, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.gomez@example.com')),
('Cinta Métrica LG10',       '8m, con freno automático',                     59.00,  22, 'NEW',  'APPROVED', (SELECT id FROM users WHERE email='luis.gomez@example.com'));
