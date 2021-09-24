from flask import Flask, make_response, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO

from api.api_admin import AdminLogin, AdminUsersList, users_urls_list
from api.config import config as CF

app = Flask(__name__)

cors_allowed_origins = [f"http://{CF.host}:{CF.client_port}", f"http://{CF.host}:{CF.admin_port}",
                        f"http://localhost:{CF.client_port}", f"http://localhost:{CF.admin_port}"]
print(cors_allowed_origins)
socket = SocketIO(app, cors_allowed_origins=cors_allowed_origins,
                  logger=True)

app.config['JWT_SECRET_KEY'] = 'my_cool_secret'
jwt = JWTManager(app)
CORS(app)

api = Api(app)

sessions_ids_dict = {}


@socket.on('give id in start')
def on_get_id_in_start(data):
    current_socket_id = request.sid
    end_user_id = data.get("end_user_id")
    try:
        old_socket_id = (list(sessions_ids_dict.keys())[list(sessions_ids_dict.values()).index(end_user_id)])
        del (sessions_ids_dict[old_socket_id])
    except ValueError:
        pass

    session_id_dict = {current_socket_id: end_user_id}
    sessions_ids_dict.update(session_id_dict)
    # print(sessions_ids_dict)
    # print('on_get_id')


@socket.on('disconnect')
def on_disconnect():
    current_socket_id = request.sid

    user_id = sessions_ids_dict.pop(current_socket_id, False)
    if user_id:
        ids_from_list = [i for i, d in enumerate(users_urls_list) if user_id in d.values()]
        for i in ids_from_list:
            del (users_urls_list[i])
        socket.emit("refresh_user_urls_list")

    # print(sessions_ids_dict)
    # print('on_disconnect')


@socket.on('connect to page')
def on_connect_to_page(data):
    # print(data)
    end_user_id = data.get("end_user_id")
    web_page_url = data.get("web_page_url")

    ids_from_list = [i for i, d in enumerate(users_urls_list) if end_user_id in d.values()]
    for i in ids_from_list:
        del (users_urls_list[i])

    users_urls_list.append({"id": end_user_id, "url": web_page_url})
    socket.emit("refresh_user_urls_list")
    # print(users_urls_list)
    # print('went to the page')


api.add_resource(AdminLogin, '/api/admin/login/')

api.add_resource(AdminUsersList, '/api/admin/users')

# api.add_resource(ProtectArea, '/api/protect-area/')

if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0', port=5000)
    # socket.run(app, host=CF.host, debug=True, port=CF.server_port)
    socket.run(app, host='0.0.0.0', debug=True, port=CF.server_port)
