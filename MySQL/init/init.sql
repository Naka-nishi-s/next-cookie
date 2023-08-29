CREATE database if not exists sampleDB;
use sampleDB;

CREATE TABLE jobs (
  job_id INT AUTO_INCREMENT PRIMARY KEY,
  job_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  salt VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  job_id INT,
  FOREIGN KEY (job_id) REFERENCES jobs(job_id)
);

INSERT INTO jobs(job_name) VALUES
  ('Developer'),
  ('Designer'),
  ('Manager'),
  ('Analyst');

INSERT INTO users(name, email, salt, password, job_id) VALUES
  ('Sample', 'sample@gmail.com','6ace10bc89e8426903a4eda1d9ef6fa7','18d41c53ff7c170474811ff04d787808b1c991558af694b5c8cdb386ed565f5611c9929be650c3348090a88044595554df3bddf5a1909f382162fbad94baf89a', 1),
  ('Sample2', 'sample2@gmail.com','cf27576bd83ae164b4a96a7105df5fb7','3d8758dccd4f0e2f385a82457ded776288ca81b88ef115cfa3aea89eca1b98365f7f05b837a036122b2b2fb6bd689cfcd48990cb72807695e6f2539f615916c6', 2),
  ('Sample3', 'sample3@gmail.com','8aff10c5c8a340ea5b68dc5bcb4500f3','b01b7ae3dc3cfafda6e68eb1e100b7a6b98db28c6f7837e45424204be00634738aba02875ac8e81bef0b4a119de132650ce56b01020cf6fc6a90eadd4c1524d4', 3)
