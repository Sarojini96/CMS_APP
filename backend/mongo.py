from flask import Flask, jsonify, request, json 
from flask_pymongo import PyMongo
from bson.objectid import ObjectId 
from datetime import datetime 
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'reactloginreg'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/reactloginreg'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

@app.route('/users/register', methods=["POST"])
def add_user():
    users = mongo.db.users 
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    user_id = mongo.db.users.insert({
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': password,
        'created': created 
    })

    new_user = users.find_one({'_id': user_id})
    
    result = {'email': new_user['email'] + ' registered'}
    print(result)
    return jsonify({'result' : result})

@app.route('/users/login', methods=['POST'])
def login():
    users = mongo.db.users 
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email': response['email']
            })
            result = jsonify({'token':access_token})
        else:
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result 

@app.route('/newpost', methods=['POST'])
def new_post():
    post = mongo.db.post 
    post_id = request.get_json()['post_id']
    post_title = request.get_json()['post_title']
    post_full = request.get_json()['post_full']
    created = datetime.utcnow()
    post_id = mongo.db.post.insert({
       'post_id': post_id,
       'post_title': post_title,
       'post_full': post_full,
       'created': created 
        })

    new_post = post.find_one({'_id': post_id})

    result = {'post_title': new_post['post_title'],'post_full': new_post['post_full']  + ' created'}
    print(result)
    return jsonify({'result' : result})



from bson import json_util

def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route('/getpost', methods=['POST'])
def getpost():
    post = mongo.db.post 
    results = []
    print('incoming request ::')
    docs = list(post.find().limit(10))
    for document in docs:
        document['_id'] = str(document['_id'])
        results.append(document)
    if len(results) > 0:
        result = jsonify({'posts': results})
    else:
        result = jsonify({"result":"No results found"})
    return result

 
if __name__ == '__main__':
    app.run(debug=True)
