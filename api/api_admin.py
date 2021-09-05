from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token


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
    def post(self):
        return {
            {" id ": 0, " author_id ": 0, " title ": " Анна Каренина "},
            {" id ": 1, " author_id ": 0, " title ": " Война и мир "},
            {" id ": 2, " author_id ": 1, " title ": " Гордость и предубеждение "},
            {" id ": 2, " author_id ": 1, " title ": " Гордость и предубеждение "},
            {" id ": 3, " author_id ": 1, " title ": " Разум и чувствительность "}
        }
