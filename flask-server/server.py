from flask import Flask, request
from flask_cors import CORS
import bcrypt
import sqlite3
import os
import logging

currentdirectory = os.path.dirname(os.path.abspath(__file__))
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# set up database connection
conn = sqlite3.connect("./db/user_accounts.sqlite", uri=True, check_same_thread=False)

# read SQL commands from a file and execute them
with open("db/SQL Scripts/create_tables.sql") as f:
    commands = f.read()
    conn.executescript(commands)

@app.route("/")
def default():
    return "Snooping as usual, I see?"

#Users API router
@app.route("/users")
def users():
    cursor = conn.cursor()
    query = f"SELECT username FROM users"
    cursor.execute(query)
    results = cursor.fetchall()
    usernames = [result[0] for result in results]
    return {"users": usernames}

@app.route('/register', methods=['POST'])
def register():
    user = request.json.get('user')
    password = request.json.get('password')
    salt = request.json.get('salt')
    logging.debug(f"Registering user: {user}")
    logging.debug(f"Password: {password}")
    logging.debug(f"Salt: {salt}")
    if user is None or password is None or user == '' or password == '':
        return {"success": False, "error": "Missing username or password"}
    try:
        logging.debug('Executing DB')
        cursor = conn.cursor()
        query = f"INSERT INTO users (username, password, balance) VALUES (?, ?, ?)"
        logging.debug(query)
        cursor.execute(query, (user, password, 0))
        conn.commit()
        logging.debug("User registered successfully!")
        return {"success": True}
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}
    return "hi"

@app.route('/login', methods=['POST'])
def login():
    user = request.json.get('user')
    password = request.json.get('password')
    if user is None or password is None or user == '' or password == '':
        return {"success": False, "error": "Missing username or password"}
    logging.debug(f"Attempting to log in as user '{user}'")
    logging.debug(f"User entered password '{password}'")
    try:
        logging.debug('Executing query')
        stored_hash = getStoredHash(user)
        logging.debug("Checking password...")
        if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
            print('logged in')
        else:
            print('no match')
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}

def getStoredHash(user):
    #retrieves stored hash from user table
    cursor = conn.cursor()
    query = f"SELECT password FROM users WHERE username = ?"
    logging.debug(query)
    cursor.execute(query, (user,))
    stored_hash = cursor.fetchone()[0]
    return stored_hash

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/clear', methods=['POST'])
def clear():
   return{"success" : True} 