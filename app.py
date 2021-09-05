from flask import Flask, make_response
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_cors import CORS
from api.api_admin import AdminLogin, AdminUsersList

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'my_cool_secret'
jwt = JWTManager(app)
CORS(app)
api = Api(app)

# TODOS = {
#     'todo1': {'task': 'build an API'},
#     'todo2': {'task': '?????'},
#     'todo3': {'task': 'profit!'},
# }
TODOS = [{"id": 0, "name": 0, "title": " Анна Каренина "},
         {"id": 1, "name": 0, "title": " Война и мир "},
         {"id": 2, "name": 1, "title": " Гордость и предубеждение "},
         {"id": 2, "name": 1, "title": " Гордость и предубеждение "},
         {"id": 3, "name": 1, "title": " Разум и чувствительность "}]


def abort_if_todo_doesnt_exist(todo_id):
    if todo_id not in TODOS:
        abort(404, message="Todo {} doesn't exist".format(todo_id))


parser = reqparse.RequestParser()
parser.add_argument('task')


class ProtectArea(Resource):
    @jwt_required
    def get(self):
        return {'answer': 42}


# Todo
# shows a single todo item and lets you delete a todo item
class Todo(Resource):
    def get(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201


# TodoList
# shows a list of all todos, and lets you POST to add new tasks
class TodoList(Resource):
    def get(self):
        # return {'id': 1, 'name': 'John Doe'}, 200, {'X-My-Custom-Header': 'Custom Value'}
        return TODOS, 200, {'Content-Type': 'application/json', 'content-range': 5}

        # resp = make_response("Hello World", 200)
        # resp.headers.extend({'content-range': 'AT-5000'})
        # return resp

        # return {'task': 'Hello world'}, 201, {'Etag': 'some-opaque-string'}

    def post(self):
        args = parser.parse_args()
        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        TODOS[todo_id] = {'task': args['task']}
        return TODOS[todo_id], 201


#
# Actually setup the Api resource routing here
#
# api.add_resource(TodoList, '/todos')
# api.add_resource(Todo, '/todos/<todo_id>')
api.add_resource(TodoList, '/api/admin/users')
api.add_resource(Todo, '/todos/<todo_id>')

api.add_resource(AdminLogin, '/api/admin/login/')
# api.add_resource(AdminUsersList, '/api/admin/users/')
api.add_resource(ProtectArea, '/api/protect-area/')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
