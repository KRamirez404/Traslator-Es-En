-- Create database
CREATE DATABASE IF NOT EXISTS translator_db;

USE translator_db;

-- Create translations table
CREATE TABLE IF NOT EXISTS translations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  spanish VARCHAR(255) NOT NULL,
  english VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_spanish (spanish),
  UNIQUE KEY unique_english (english)
);

-- Insert some sample data
INSERT INTO translations (spanish, english) VALUES
  ('hola', 'hello'),
  ('adiós', 'goodbye'),
  ('gracias', 'thank you'),
  ('por favor', 'please'),
  ('casa', 'house'),
  ('perro', 'dog'),
  ('gato', 'cat'),
  ('agua', 'water'),
  ('libro', 'book'),
  ('mesa', 'table')
ON DUPLICATE KEY UPDATE spanish=VALUES(spanish);
