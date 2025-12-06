CREATE DATABASE IF NOT EXISTS orders_management;

USE orders_management;

-- ==============================
-- ORDERS TABLE
-- ==============================
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL
);

-- ==============================
-- PRODUCTS TABLE
-- ==============================
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    serialNumber INT NOT NULL,
    isNew TINYINT(1) NOT NULL,
    photo VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    specification TEXT,
    guarantee_start DATETIME NOT NULL,
    guarantee_end DATETIME NOT NULL,
    price_usd DECIMAL(10,2),
    price_uah DECIMAL(10,2),
    order_id INT,
    date DATETIME NOT NULL,
    
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

