from flask import Flask, make_response, jsonify
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, send, disconnect, emit, join_room, leave_room, rooms

from api.api_admin import AdminLogin, AdminUsersList

app = Flask(__name__)

socket = SocketIO(app, cors_allowed_origins=["http://localhost:3000", "http://localhost:3001"], logger=True)

app.config['JWT_SECRET_KEY'] = 'my_cool_secret'
jwt = JWTManager(app)
CORS(app)

api = Api(app)

users_list = [{"id": 0, "name": "Никита12"},
              {"id": 1, "name": "Ники6та5"},
              {"id": 2, "name": "Ники6та4"},
              {"id": 3, "name": "Ники6та35"},
              {"id": 4, "name": "Ники6та92"},
              {"id": 5, "name": "Никита856"},
              {"id": 6, "name": "Никита467"},
              {"id": 7, "name": "Никита316"},
              {"id": 8, "name": "Ник6ита262"},
              {"id": 9, "name": "Никита222"},
              {"id": 10, "name": "Н6икита12"},
              {"id": 11, "name": "Никита51"},
              {"id": 12, "name": "Ни6кита41"},
              {"id": 13, "name": "Ник6ита315"},
              {"id": 14, "name": "Никита912"},
              {"id": 15, "name": "Ник6ита185"},
              {"id": 16, "name": "Никита471"},
              {"id": 17, "name": "Ники6та311"},
              {"id": 18, "name": "Никита122"},
              {"id": 19, "name": "Олег315"},
              {"id": 20, "name": "Виктор912"},
              {"id": 21, "name": "Валера185"},
              {"id": 22, "name": "Никалераита471"},
              {"id": 23, "name": "Никиалера6та311"},
              {"id": 24, "name": "Ниалеракита122"},
              {"id": 25, "name": "Никалераи6та122"}]


# class ProtectArea(Resource):
#     @jwt_required
#     def get(self):
#         return {'answer': 42}

# # Whenever someone connects this gets executed
# @socket.on('connect')
# def on_connect(data):
#     print('on_connect')
#     print(data)


# # Whenever someone disconnects this piece of code executed
# @socket.on('disconnect')
# def on_disconnect():
#     print('on_disconnect')


@socket.on('connect to page')
def on_connect_to_page(data):
    print(data)
    print('went to the page')


@socket.on('disconnect from page')
def on_disconnect_from_page(data):
    print(data)
    print('disconnect from page')


api.add_resource(AdminLogin, '/api/admin/login/')

api.add_resource(AdminUsersList, '/api/admin/users')

# api.add_resource(ProtectArea, '/api/protect-area/')

if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0', port=5000)
    socket.run(app, host='0.0.0.0', debug=True, port=5000)
