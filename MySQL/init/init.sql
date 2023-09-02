CREATE database if not exists sampleDB;
use sampleDB;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id INT NOT NULL,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) 
);

INSERT INTO users(name, email, password) VALUES
  ('Sample', 'sample@gmail.com', 'sample'),
  ('Sample2', 'sample2@gmail.com', 'sample2' ),
  ('Sample3', 'sample3@gmail.com', 'sample3')
