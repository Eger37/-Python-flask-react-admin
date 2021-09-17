from flask import Flask, make_response, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, send, disconnect, emit, join_room, leave_room, rooms

from api.api_admin import AdminLogin, AdminUsersList, users_urls_list

app = Flask(__name__)

socket = SocketIO(app, cors_allowed_origins=["http://localhost:3000", "http://localhost:3001"], logger=True)

app.config['JWT_SECRET_KEY'] = 'my_cool_secret'
jwt = JWTManager(app)
CORS(app)

api = Api(app)

sessions_ids_dict = {}


@socket.on('give id in start')
def on_get_id_in_start(data):
    current_socket_id = request.sid
    user_id = data.get("id")
    try:
        old_socket_id = (list(sessions_ids_dict.keys())[list(sessions_ids_dict.values()).index(user_id)])
        del (sessions_ids_dict[old_socket_id])
    except ValueError:
        pass

    session_id_from_dict = {current_socket_id: user_id}
    sessions_ids_dict.update(session_id_from_dict)
    print(sessions_ids_dict)
    print('on_get_id')


@socket.on('disconnect')
def on_disconnect():
    current_socket_id = request.sid
    print(current_socket_id)

    user_id = sessions_ids_dict.pop(current_socket_id, False)
    print(user_id)
    if user_id:
        ids_from_list = [i for i, d in enumerate(users_urls_list) if user_id in d.values()]
        for i in ids_from_list:
            del (users_urls_list[i])
    print(sessions_ids_dict)
    print('on_disconnect')


@socket.on('connect to page')
def on_connect_to_page(data):
    user_id = data.get("id")
    url = data.get("url")

    ids_from_list = [i for i, d in enumerate(users_urls_list) if user_id in d.values()]
    for i in ids_from_list:
        del (users_urls_list[i])

    users_urls_list.append({"id": user_id, "url": url})
    # print(users_urls_list)
    print('went to the page')


# @socket.on('disconnect from page')
# def on_disconnect_from_page(data):
#     user_id = data.get("id")
#     url = data.get("url")
#     print(user_id)
#     print(url)
#     print('disconnect from page')


class Test(Resource):
    def get(self):
        response = jsonify(sessions_ids_dict)
        return response


api.add_resource(AdminLogin, '/api/admin/login/')

api.add_resource(Test, '/api/admin/lol')
api.add_resource(AdminUsersList, '/api/admin/users')

# api.add_resource(ProtectArea, '/api/protect-area/')

if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0', port=5000)
    socket.run(app, host='0.0.0.0', debug=True, port=5000)
