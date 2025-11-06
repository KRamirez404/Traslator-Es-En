-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS traductor_db;
USE traductor_db;

-- Crear tabla de traducciones
CREATE TABLE IF NOT EXISTS traducciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  palabra_espanol VARCHAR(255) NOT NULL,
  palabra_ingles VARCHAR(255) NOT NULL,
  categoria VARCHAR(100) DEFAULT 'general',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_espanol (palabra_espanol),
  INDEX idx_espanol (palabra_espanol),
  INDEX idx_ingles (palabra_ingles)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo
INSERT INTO traducciones (palabra_espanol, palabra_ingles, categoria) VALUES
('hola', 'hello', 'saludos'),
('adiós', 'goodbye', 'saludos'),
('casa', 'house', 'sustantivos'),
('perro', 'dog', 'animales'),
('gato', 'cat', 'animales'),
('libro', 'book', 'sustantivos'),
('agua', 'water', 'sustantivos'),
('rojo', 'red', 'colores'),
('azul', 'blue', 'colores'),
('verde', 'green', 'colores'),
('amor', 'love', 'sentimientos'),
('feliz', 'happy', 'sentimientos'),
('triste', 'sad', 'sentimientos'),
('comer', 'eat', 'verbos'),
('dormir', 'sleep', 'verbos'),
('correr', 'run', 'verbos'),
('caminar', 'walk', 'verbos'),
('escribir', 'write', 'verbos'),
('leer', 'read', 'verbos'),
('familia', 'family', 'sustantivos');
