CREATE DATABASE IF NOT EXISTS health_declaration_db;
DROP USER 'user'@'%';
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON health_declaration_db.* TO 'user'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS healthdb;
USE healthdb;

CREATE TABLE IF NOT EXISTS symptom (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS HealthDeclaration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  temperature DECIMAL(4, 2) NOT NULL,
  contactWithSuspected BOOLEAN NOT NULL,
  additionalNotes TEXT,
  submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS HealthDeclarationSymptom (
  id INT AUTO_INCREMENT PRIMARY KEY,
  healthDeclarationId INT NOT NULL,
  symptomId INT NOT NULL,
);

INSERT INTO symptom (name) VALUES
  ('Cough'),
  ('Fever'),
  ('Headache'),
  ('Fatigue'),
  ('Sore Throat'),
  ('Body Aches'),
  ('Runny Nose'),
  ('Breathing Difficulties')
ON DUPLICATE KEY UPDATE name=name;