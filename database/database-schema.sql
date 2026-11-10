-- SH27 Restaurant & Bar – database schema (MySQL 8+ / MariaDB 10.5+)
-- Run:  mysql -u root -p < database/database-schema.sql

CREATE DATABASE IF NOT EXISTS sh27 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sh27;

-- ---------- Menu ----------
CREATE TABLE IF NOT EXISTS menu_categories (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code       VARCHAR(10)  NOT NULL UNIQUE,      -- short key used by the website tabs
  label      VARCHAR(80)  NOT NULL,
  sort_order INT          NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS menu_items (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_id  INT UNSIGNED NOT NULL,
  name         VARCHAR(120) NOT NULL,
  description  VARCHAR(300) NOT NULL DEFAULT '',
  price        DECIMAL(8,2) NOT NULL,
  is_available TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order   INT          NOT NULL DEFAULT 0,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_item_category FOREIGN KEY (category_id) REFERENCES menu_categories(id) ON DELETE CASCADE,
  INDEX idx_item_category (category_id, sort_order)
) ENGINE=InnoDB;

-- ---------- Reservations ----------
CREATE TABLE IF NOT EXISTS reservations (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  guests           TINYINT UNSIGNED NOT NULL,
  reservation_date DATE         NOT NULL,
  reservation_time TIME         NOT NULL,
  name             VARCHAR(100) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  phone            VARCHAR(30)  NULL,
  notes            VARCHAR(500) NULL,
  status           ENUM('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_res_slot (reservation_date, reservation_time),
  INDEX idx_res_status (status),
  INDEX idx_res_email (email)
) ENGINE=InnoDB;

-- ---------- Contact messages ----------
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(255)  NOT NULL,
  subject    VARCHAR(150)  NULL,
  message    VARCHAR(2000) NOT NULL,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_msg_created (created_at)
) ENGINE=InnoDB;

-- ---------- Newsletter ----------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------- Seed data (same menu as the website) ----------
INSERT INTO menu_categories (code, label, sort_order) VALUES
  ('s','Starters',1), ('m','Main Dishes',2), ('p','Pizza & Sandwiches',3), ('d','Beverage',4)
ON DUPLICATE KEY UPDATE label = VALUES(label), sort_order = VALUES(sort_order);

INSERT INTO menu_items (category_id, name, description, price, sort_order)
SELECT c.id, v.name, v.description, v.price, v.sort_order FROM menu_categories c JOIN (
  SELECT 's' code, 'Purple Corn Tostada' name, 'Ricotta, goat cheese, beetroot and datterini.' description, 36 price, 1 sort_order UNION ALL
  SELECT 's','Smoked Scribble','Culatello, spalla cotta, mortadella, pickles.',30,2 UNION ALL
  SELECT 's','Fresh Oysters Dozen','Our selection of the day, lime, mignonette.',59,3 UNION ALL
  SELECT 's','Wild Mushroom Arancini','Porcini purée, parmesan, basil.',18,4 UNION ALL
  SELECT 's','Burnt Aubergine Dip','Smoked aubergine, tahini, pomegranate, flatbread.',16,5 UNION ALL
  SELECT 's','Bengal Prawn Skewers','Mustard glaze, charred lime, curry leaf oil.',28,6 UNION ALL
  SELECT 'm','Crispy Skin Chicken','Ricotta, radicchio, prosciutto salad, jus.',33,1 UNION ALL
  SELECT 'm','Flank Steak','Served medium rare, salad, mushroom sauce.',35,2 UNION ALL
  SELECT 'm','Ebony Fillet Steak','Truffle mash, black pepper sauce.',58,3 UNION ALL
  SELECT 'm','Fish & Chips','Atlantic cod, chips, salad, tartare, lemon.',33,4 UNION ALL
  SELECT 'm','Wood-fired Hilsa','Banana leaf, mustard, green chilli, saffron rice.',42,5 UNION ALL
  SELECT 'm','Lamb Shoulder','Slow roasted, jus, herbed potatoes.',46,6 UNION ALL
  SELECT 'm','Teriyaki Glazed Salmon','Sesame, spring onion, soy glaze, steamed rice.',38,7 UNION ALL
  SELECT 'p','Wild Mushroom Pizza','Mushroom, roast chicken, mozzarella, parmesan, parsley.',24,1 UNION ALL
  SELECT 'p','Garden Pizza','Peppers, red onion, olives, rosemary, mozzarella.',22,2 UNION ALL
  SELECT 'p','Smoked Club Sandwich','Toasted bread, ham, tomato, lettuce, house mayo, fries.',19,3 UNION ALL
  SELECT 'p','Salami Roll','Crusty roll, salami, smoked cheese, cucumber, chives.',17,4 UNION ALL
  SELECT 'd','Prickly Pear Tonic','Prickly pear, key lime and tonic.',12,1 UNION ALL
  SELECT 'd','Smoky Margarita','Tequila, fresh lime, orange liqueur.',13,2 UNION ALL
  SELECT 'd','Chicha Morada','Purple corn, pineapple, apple, cinnamon.',12,3 UNION ALL
  SELECT 'd','Better Boy','Tomato, salt, black pepper, lemon.',10,4 UNION ALL
  SELECT 'd','Green Apple Martini','Apple, mint, vodka, lime.',14,5 UNION ALL
  SELECT 'd','House Red Carafe','Ask your host for tonight’s pour.',38,6
) v ON v.code = c.code
WHERE NOT EXISTS (SELECT 1 FROM menu_items);
