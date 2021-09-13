from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token

users_list = [{"id": 0, "name": "Никита12"},
              {"id": 1, "name": "Ники6та5"},
              {"id": 2, "name": "Ники6та4"},
              {"id": 3, "name": "Ники6та35"}, ]


# {"id": 4, "name": "Ники6та92"},
# {"id": 5, "name": "Никита856"},
# {"id": 6, "name": "Никита467"},
# {"id": 7, "name": "Никита316"},
# {"id": 8, "name": "Ник6ита262"},
# {"id": 9, "name": "Никита222"},
# {"id": 10, "name": "Н6икита12"},
# {"id": 11, "name": "Никита51"},
# {"id": 12, "name": "Ни6кита41"},
# {"id": 13, "name": "Ник6ита315"},
# {"id": 14, "name": "Никита912"},
# {"id": 15, "name": "Ник6ита185"},
# {"id": 16, "name": "Никита471"},
# {"id": 17, "name": "Ники6та311"},
# {"id": 18, "name": "Никита122"},
# {"id": 19, "name": "Ники6та122"}],


def parse_list():
    print()


def content_range(list_response):
    length = len(list_response)
    print(length)

    str_content_range = f'0-5/{length}'
    return str_content_range


class AdminLogin(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        if username == 'admin' and password == 'admin':
            access_token = create_access_token(identity={
                'role': 'admin',
            }, expires_delta=False)
            result = {'token': access_token}
            return result
        return {'error': 'Invalid username and password'}


class AdminUsersList(Resource):
    def get(self):
        response = jsonify(users_list)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        # response.headers.add('Access-Control-Allow-Origin', ' http://localhost:3001')
        # response.headers.add('content-type', 'application/json')
        # response.headers.add('Access-Control-Allow-Headers', 'content-range')
        response.headers.add('Access-Control-Expose-Headers', 'content-range')
        str_content_range = content_range(users_list)
        response.headers.add('content-range', f'users {str_content_range}')
        return response

    def post(self):
        pass
        # args = parser.parse_args()
        # todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        # todo_id = 'todo%i' % todo_id
        # TODOS[todo_id] = {'task': args['task']}
        # return TODOS[todo_id], 201
