
--  Usuarios COMMON
INSERT INTO users (name, email, password_hash, role_id)
VALUES
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
