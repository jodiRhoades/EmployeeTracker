-- to create database
DROP DATABASE employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NULL,  
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10),
  department_id INT,  
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),  
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES ('IT');
INSERT INTO department(name)
VALUES ('SPA');

INSERT INTO role (title, salary,department_id)
VALUES ('massage therapist', 40.000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("manager", 35.000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Trisha', 'Compton', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jodi', 'Rhoades', 1, 1);