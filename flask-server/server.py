from flask import Flask
app = Flask(__name__)

#Users API router
@app.route("/users")
def users():
    return {"Users": ["John", "Bob", "Juan"]}

if __name__ == "__main__":
    app.run(debug=True)