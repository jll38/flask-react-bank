from flask import Flask, request
from flask_cors import CORS
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

#Users API router
@app.route("/users")
def users():
    return {"users": ["John", "Bob", "Juan"]}

@app.route('/register', methods=['POST'])
def register():
    user = request.json.get('user')
    password = request.json.get('password')
    logging.debug(f"Registering user: {user}")
    logging.debug(f"Password: {password}")
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

if __name__ == "__main__":
    app.run(debug=True)

