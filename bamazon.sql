DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL (20,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cyberpunk 2077", "Video Games", 59.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Last of Us 2", "Video Games", 59.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Airpods Pro", "Headphones", 249.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hillbilly Elegy", "Books", 12.99, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Where the Sidewalk Ends", "Books", 15.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dead Redemption 2", "Video Games", 54.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Show 8", "Electronics", 99.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Facebook Portal", "Electronics", 229.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White Christmas Lights 100 ct.", "Home Decor", 6.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Color Christmas Lights 200 ct.", "Home Decor", 10.99, 14);


