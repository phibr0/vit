from flask import Flask
from flask import request
from random import randint
from hashlib import sha256
import json
from secrets import token_bytes

app = Flask(__name__)

class User():
    def __init__(self, username, password) -> None:
        self.username = username
        self.UUID = "user"+sha256(username.encode('UTF-8')).hexdigest()[:9]
        self.hashedpassword = sha256(password.encode('UTF-8')).hexdigest()
        self.friends = []
        self.token = None

@app.route("/")
def home():
    return "<p>Hello, World!<p></br>\n"

#default route
@app.route('/getUser', methods=['GET'])
def user():
    if not request.method == 'GET':
        return "only GET allowed\n", 400
    if isToken(request.form['username'], request.form['token']):
        return open("user"+sha256(request.form['username'].encode('UTF-8')).hexdigest()[:9]+".json", 'r').read()

def isToken(username, token):
    return token == json.load(open("user"+sha256(username.encode('UTF-8')).hexdigest()[:9]+".json", 'r'))['token']

def getToken(uuid):
    try:
        token = json.loads(open("user"+uuid+".json", 'r').read())['token']
        if token != None:
            return token
        else:
            token = token_bytes(16)
            print(token)
            setToken(uuid, token)
            print("createdNewToken:"+token.hex())
            return token
    except KeyError:
        token = token_bytes(16)
        setToken(uuid, token)
        print("createdNewToken:"+token.hex())
        return token

#add token to user
def setToken(uuid, token):
    print("setToken..\n"+token.hex())
    f = open("user"+uuid+".json", 'r')
    j = json.loads(f.read())
    f.close()
    j['token'] = token.hex()
    open("user"+uuid+".json", 'w').write( json.dumps(j) )
    

#login
@app.route("/login", methods=['GET'])
def login():
    try:
        if not request.method == 'GET':
            return "GET needed\n", 400
        if valid_login(request.form['username'], request.form['password']):
            print("valid login\n")
            return getToken(sha256(request.form['username'].encode('UTF-8')).hexdigest()[:9]), 202
        else:
            return "invalid login\n", 401
    except Exception:
        return "User Not Available", 401

# to JSON initializer
def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

#creates a new user if key is valid
@app.route("/createAccount", methods=['POST'])
def createUser():
    if(request.method == 'POST'):
        if(request.form['key'] == "1000101"):
            try:
                u = User(request.form['username'],request.form['password'])
                f = open("user"+sha256(request.form['username'].encode('UTF-8')).hexdigest()[:9]+".json",'x')
                f.write( json.dumps({'username':u.username, 'hashedpassword':u.hashedpassword, 'friends':u.friends, 'token':u.token}) ) #creates an Object and prints it as JSON
                f.close()
                return "OK", 200
            except Exception as error:
                print(error)
                return "Error on Creating User: Username/UUID already occupied\n", 409
        else:
            return "Creating User Error: wrong key\n", 401
        
def valid_login(username, password):
    try:
        return sha256(password.encode('UTF-8')).hexdigest() == json.loads(open("user"+sha256(username.encode('UTF-8')).hexdigest()[:9]+".json", 'r').read())['hashedpassword']
    except Exception as error:
        print(sha256(password.encode('UTF-8')).hexdigest())
        print(open("user"+sha256(username.encode('UTF-8')).hexdigest()[:9]+".json", 'r').read())['hashedpassword']
        return False