CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    balance REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    source TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    transactType TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS credit_cards (
    card_num TEXT PRIMARY KEY,
    expiration TEXT NOT NULL,
    security_code TEXT NOT NULL,
    card_holder_id INT NOT NULL
);