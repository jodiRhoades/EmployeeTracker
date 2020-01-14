-- to create database

CREATE DATABASE employee_tracker_DB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO-INCREMENT,
  name VARCHAR(30) NULL,  
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO-INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10),
  department_id INT,  
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(departmentID)
);

CREATE TABLE employee (
  id INT AUTO-INCREMENT NOT NULL,
  first_name VARCHAR(30),  
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
  FOREIGN KEY (role_id) REFERENCES role(roleID)
  FOREIGN KEY (manager_id) REFERENCES role(managerID)
);

INSERT INTO department (name)
VALUES ('IT');
INSERT INTO department(name)
VALUES ('SPA');

INSERT INTO role (title, salary,department_id)
VALUES ('massage therapist', 40.000, (SELECT department FROM id WHERE id = 'spa'));
INSERT INTO role (title, salary, department_id)
VALUES ("manager", 35.000, (SELECT department FROM id WHERE id = spa));

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jodi', 'Rhoades', (SELECT id FROM role WHERE id = "massage therapist"), (SELECT manager_id FROM role WHERE department_id = 'spa'));
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Trisha', 'Compton', (SELECT id FROM role WHERE id = manager_id), (SELECT id FROM role WHERE department_id = 'spa' ));