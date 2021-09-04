from flask import Flask
from flask_restful import Resource, Api
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_cors import CORS
from api.api_admin import AdminLogin

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'my_cool_secret'
jwt = JWTManager(app)
CORS(app)
api = Api(app)


class ProtectArea(Resource):
    @jwt_required
    def get(self):
        return {'answer': 42}


api.add_resource(AdminLogin, '/api/admin/login/')
api.add_resource(ProtectArea, '/api/protect-area/')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
