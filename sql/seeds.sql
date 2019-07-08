DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(20) NOT NULL,
    department_name VARCHAR(20),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(40),
    over_head_costs INTEGER(10),
    PRIMARY KEY(department_id)
);

ALTER TABLE products
ADD product_sales INTEGER(10);



INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Ghiradeli','Food',4.99,10);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Nestle Candy','Food',3.99,8);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Glow Lamp','Home decor',12.99,15);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Area Rug','Home decor',25.49,20);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Blender','Kitchen Essentials',15.99,18);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Egg beater','Kitchen Essentials',5.49,30);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Eggs','Home Deli',6.99,30);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Milk','Home Deli',2.49,15);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Bread','Home Deli',1.49,15);

INSERT INTO departments(department_name,over_head_costs) 
VALUES('Home Deli',200);

INSERT INTO departments(department_name,over_head_costs)
VALUES('Kitchen Essentials',400);

INSERT INTO departments(department_name,over_head_costs)
VALUES('Home Decor',600);

INSERT INTO departments(department_name,over_head_costs)
VALUES('Food',100);







