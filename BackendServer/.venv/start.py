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
        self.weight = None
        self.height = None

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
    try:
        return token == json.load(open("user"+sha256(username.encode('UTF-8')).hexdigest()[:9]+".json", 'r'))['token']
    except Exception:
        return False

@app.route('/setWeight', methods=['POST'])

# username, token, stat, value
@app.route('/set', methods=['POST'])
def set():
    if not isToken(request.form['username'], request.form['token']):
        return "wrong Token", 403
    else:
        return write(request.form['username'], request.form['stat'], request.form['value'])
    
# username, token, stat
@app.route('/get',methods=['GET'])
def get():
    if not isToken(request.form['username'], request.form['token']):
        return "wrong Token", 403
    try:
        return json.loads(open("user"+getUUID(request.form['username'])+".json",'r').read())[request.form['stat']]
    except Exception:
        return "couldnt get height", 400

#default change json values
def write(username, type, argument):
    try:
        j = json.loads(open("user"+getUUID(username)+".json",'r').read())
        j[type] = argument
        open("user"+getUUID(username)+".json",'w').write(json.dumps(j))
    except Exception:
        return "write error", 406

    return "writed", 200


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

def getUUID(username):
    return sha256(username.encode('UTF-8')).hexdigest()[:9]

#add token to user
def setToken(uuid, token):
    print("setToken..\n"+token.hex())
    f = open("user"+uuid+".json", 'r')
    j = json.loads(f.read())
    f.close()
    j['token'] = token.hex()
    open("user"+uuid+".json", 'w').write( json.dumps(j) )
    
#addfriends
@app.route("/friends", methods=['POST','GET'])
def friends():
    if request.method == 'POST':
        if isToken(request.form['username'], request.form['token']):
            return addFriend(request.form['username'], request.form['friend'])
        else:
            return "wrong token", 401
    elif request.method == 'GET':
        if isToken(request.form['username'], request.form['token']):
            return json.loads(open("user"+getUUID(request.form['username'])+".json",'r').read())['friends'], 200
    else:
        return "only GET or POST allowed",405



def addFriend(username, friend):
    j = json.loads(open("user"+getUUID(username)+".json",'r').read())
    f = None
    try:
        f = open("user"+getUUID(friend)+".json",'r')
    except Exception:
        print("")
    if f != None:
        j['friends'].append(getUUID(friend))
        print(json.dumps(j))
        open("user"+getUUID(username)+".json",'w').write(json.dumps(j))
        return "added "+friend+" to friendslist from "+username, 200
    else:
        return "friend not found\n", 404

#login
@app.route("/login", methods=['GET'])
def login():
    try:
        if not request.method == 'GET':
            return "GET needed\n", 400
        if valid_login(request.form['username'], request.form['password']):
            print("valid login\n")
            return getToken(sha256(request.form['username'].encode('UTF-8')).hexdigest()[:9]), 200
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