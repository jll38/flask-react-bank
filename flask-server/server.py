from flask import Flask, request
from flask_cors import CORS
import bcrypt
import sqlite3
import os
import logging
import random
from datetime import datetime

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
    #Receives registration info from Frontend (React)
    user = request.json.get('user')
    password = request.json.get('password')
    salt = request.json.get('salt')
    logging.debug(f"Registering user: {user}")
    logging.debug(f"Password: {password}")
    logging.debug(f"Salt: {salt}")

    #Checks if input is missing
    if user is None or password is None or user == '' or password == '':
        return {"success": False, "error": "Missing username or password"}
    #Attempts Query (Insertion)
    try:
        # users table insertion
        logging.debug('Executing DB')
        cursor = conn.cursor()
        query = f"INSERT INTO users (username, password, balance) VALUES (?, ?, ?)"
        logging.debug(query)
        cursor.execute(query, (user, password, 0))
        conn.commit()
        logging.debug("User registered successfully!")
        
        # credit_cards table insertion
        query = f"INSERT INTO credit_cards (card_num, expiration, security_code, card_holder_id) VALUES (?,?,?,?)"
        logging.debug(query)
        card = generateCard(user)
        print(card)
        print(f"Register Function: {card[0]} {card[1]} {card[2]} {card[3]}")
        print(f"Register Function: {type(card[0])} {type(card[1])} {type(card[2])} {type(card[3])}")
        cursor.execute(query, (card[0],card[1],card[2],card[3]))
        conn.commit()
        return {"success": True}
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": str(e)}

#Login Functionality
@app.route('/login', methods=['POST'])
def login():
    user = request.json.get('user')
    password = request.json.get('password')

    #Checks if username or password is missing
    if user is None or password is None or user == '' or password == '':
        return {"success": False, "error": "Missing username or password"}
    logging.debug(f"Attempting to log in as user '{user}'")
    logging.debug(f"User entered password '{password}'")
    #Attempts to execute the query
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


@app.route("/dashboard", methods=['GET'])
def dashboard():
    user = "default"
    return {
        "balance" : getBalance(user),
        "cardNum" : getCardInfo(user)[0],
        "expiration" : getCardInfo(user)[1],
        "csv" : getCardInfo(user)[2],
        "transactions" : getTransactions(user)
    }

@app.route("/deposit", methods=['POST'])
def deposit():
    user = request.json.get('user')
    amount = request.json.get('depositVal')
    logging.debug(f'Amount to deposit: {amount}')
    if(amount <= 0):
        return {"success": False, "error" : "Enter a a value GREATER THAN zero"}
    try:
        cursor = conn.cursor()
        query = f"UPDATE users SET balance = balance + ? WHERE username = ?"
        cursor.execute(query, (amount, user))
        conn.commit()
        
        insertTransaction(getUserID(user), f"{user}'s Deposit", amount, "add")
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}
    
@app.route("/withdraw", methods=['POST'])
def withdrawl():
    user = request.json.get('user')
    amount = request.json.get('withdrawlVal')
    logging.debug(f'Amount to withdraw: {amount}')
    if(amount <= 0):
        return {"success": False, "error" : "Enter a a value GREATER THAN zero"}
    try:
        cursor = conn.cursor()
        query = f"UPDATE users SET balance = balance - ? WHERE username = ?"
        cursor.execute(query, (amount, user))
        balance = getBalance(user)
        if(balance < 0):
            conn.rollback()
            logging.debug("BROKE BOY ALERT! ROLLING BACK DATABASE...")
            return {"success": False, "error": "Balance cannot be less than zero"}
        conn.commit()
        logging.debug(f"Withdrawl of ${amount} successful!")
        insertTransaction(getUserID(user), f"{user}'s Withdrawal", amount, "sub")
        return {"success": True}
    except Exception as e:
        return {"success": False, "error": str(e)}
    
# Inserts Transactions into the database
# Deposits, Withdrawls, etc
def insertTransaction(userID, source, amount, transactType):
    date=getTodaysDate()
    logging.debug(f"Date of Transaction: {date}")
    logging.debug("Attempting to insert transaction to table...")
    try:
        cursor = conn.cursor()
        query = f"INSERT INTO transactions (user_id, source, amount, date, transactType) VALUES (?,?,?,?,?)"
        cursor.execute(query, (userID, source, amount, date, transactType))
        conn.commit()
        logging.debug("TRANSACTION INSERTION SUCCESSFUL!")
    except Exception as e:
        conn.rollback()
        return{"success": False, "error": str(e)}

#Gets data from transactions table from a user
def getTransactions(user):
    try:
        cursor = conn.cursor()
        query = f"SELECT * FROM transactions WHERE user_id = ?"
        userId = getUserID(user)
        transactions = cursor.execute(query, (userId,))
        transactions = transactions.fetchall()
        return transactions
    except Exception as e:
        return{"success" : False, "error": str(e)}
        
#Gets the User ID from username
def getUserID(username):
    query = f"SELECT id FROM users WHERE username = ?"
    cursor = conn.cursor()
    user_id = cursor.execute(query, (username,))
    user_id = user_id.fetchone()[0]
    return user_id

def getTodaysDate():
    now = datetime.now()
    logging.debug(now)
    date = now.strftime("%m/%d/%Y")
    logging.debug(f"Today's Date: {date}")
    logging.debug(f"Type of date: {type(date)}")
    return(date)

#Get user balance
def getBalance(user):
    cursor = conn.cursor()
    query = f"SELECT balance FROM users WHERE username = ?"
    balance = cursor.execute(query, (user,))
    balance = balance.fetchone()[0]
    print(f"Balance is {balance}")
    return balance

def getCardInfo(user):
    cursor = conn.cursor()
    id = getUserID(user)
    query = "SELECT * from credit_cards WHERE card_holder_id = ?"
    cardInfo = []
    cardData = cursor.execute(query, (id,)).fetchone()
    if cardData:
        cardInfo = list(cardData)
    return cardInfo


def getStoredHash(user):
    #retrieves stored hash from user table
    cursor = conn.cursor()
    query = f"SELECT password FROM users WHERE username = ?"
    logging.debug(query)
    cursor.execute(query, (user,))
    stored_hash = cursor.fetchone()[0]
    return stored_hash

def generateCard(user):
    card = [] # 0 - Card Num, 1 - Expiration, 2 - Security Code, 3 - Card Holder ID
    card.append(genCardNum())
    logging.debug('Card Num ' + card[0])
    card.append(genCardExp())

    card.append(genCardSec())
    id = getUserID(user)
    card.append(id)
    print("User:", user)
    print("ID:", id)
    print(f"{card[0]} {card[1]} {card[2]} {card[3]}")
    return card

# Generates a random card number
def genCardNum():
    cardNum = '5522' # Card Type Prefix
    for i in range(0,12):
        cardNum += str(random.randint(0,10))
    logging.debug('Card Num ' + cardNum)
    return cardNum

# Generates Card Expiration Date
def genCardExp():
    now = datetime.now()
    exp = now.replace(year=now.year + random.randint(3, 5))
    return exp.strftime('%m/%y')

# Generates Card Security Number
def genCardSec():
    sec = ''
    for i in range(0,3):
        sec += str(random.randint(0,9))
    return sec


if __name__ == "__main__":
    app.run(debug=True)