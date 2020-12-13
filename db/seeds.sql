USE burgers_db;

INSERT INTO burgers (burger_name, devoured) 
VALUES 
('Cheese burger', false),
('Big Mac', false ), 
('Spicy Chicken', false);
 
 
 UPDATE burgers SET devoured = true WHERE id = 2;