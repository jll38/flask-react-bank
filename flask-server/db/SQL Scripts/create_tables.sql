CREATE TABLE IF NOT EXISTS user_accounts (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    balance REAL NOT NULL
);