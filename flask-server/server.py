from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

#Users API router
@app.route("/users")
def users():
    return {"users": ["John", "Bob", "Juan"]}

if __name__ == "__main__":
    app.run(debug=True)