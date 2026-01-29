// migrations.sql - run once to create tables
cuisine VARCHAR(100),
rating DECIMAL(2,1),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS attractions (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
city VARCHAR(100),
description TEXT,
entry_fee DECIMAL(10,2),
is_royal BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS support_tickets (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
subject VARCHAR(255),
message TEXT,
status ENUM('open','closed','pending') DEFAULT 'open',
channel ENUM('email','phone','chat','sos') DEFAULT 'email',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS chats (
id INT AUTO_INCREMENT PRIMARY KEY,
sender_id INT,
sender_name VARCHAR(150),
message TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);