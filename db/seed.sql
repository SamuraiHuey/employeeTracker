INSERT INTO department (name) VALUES ('Enineering');
INSERT INTO role (title, salary, department_id) VALUES ('Front End Dev', '80000', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Peter', 'Parker', 1, NULL);

INSERT INTO department (name) VALUES ('Sales');
INSERT INTO role (title, salary, department_id) VALUES ('Sales Person', '50000', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Harry', 'Osbourne', 2, 1);

INSERT INTO department (name) VALUES ('HR');
INSERT INTO role (title, salary, department_id) VALUES ('HR Rep', '70000', 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Aunt', 'May', 3, 1);