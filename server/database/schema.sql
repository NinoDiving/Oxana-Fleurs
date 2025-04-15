CREATE DATABASE IF NOT EXISTS oxanafleurs;

USE oxanafleurs;

CREATE TABLE type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(25) NOT NULL
);

CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    img_path VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    type_id INT NOT NULL,
    FOREIGN KEY (type_id) REFERENCES type(id)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE top_product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL UNIQUE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE TABLE purchase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_phone VARCHAR(20),
    customer_address VARCHAR(255),
    customer_city VARCHAR(100),
    customer_zip_code VARCHAR(10),
    delivery_date DATE,
    total_price INT NOT NULL,
    status ENUM('En attente', 'Payée', 'En cours de livraison', 'Livrée') DEFAULT 'En attente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    isClickandCollect BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE purchase_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    price INT NOT NULL,
    product_id INT NOT NULL,
    purchase_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(id) ON DELETE CASCADE
);

INSERT INTO type VALUES (1,"fleurs"), (2,"plantes");