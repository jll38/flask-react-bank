from flask import Flask, request
from flask_cors import CORS
import sqlite3
import os

currentdirectory = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)

# set up database connection
conn = sqlite3.connect("db/user_accounts.sqlite", uri=True, check_same_thread=False)

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
    try:
        cursor = conn.cursor()
        query = f"INSERT INTO users (username, password) VALUES (?, ?)"
        cursor.execute(query, (user, password))
        conn.commit()
        return {"success": True}
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}
    return "hi"

if __name__ == "__main__":
    app.run(debug=True)

