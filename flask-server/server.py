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

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/submit-form', methods=['POST'])
def submit_form():
    name = request.form.get('name')
    # do something with the form data
    return {'message': f'Hello, {name}!'}