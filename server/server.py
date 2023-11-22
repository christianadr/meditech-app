import os
from dotenv import load_dotenv
from flask import Flask
from flask_restful import Api, Resource
from flask_swagger import swagger
from flask_swagger_ui import get_swaggerui_blueprint

load_dotenv()

app = Flask(__name__)
api = Api(app)
swagger = swagger(app)


@app.route("/")
def hello_world():
    return "Hello World!"


# Swagger Documentation
@app.route("/swagger")
def get_swagger():
    swag = swagger
    swag["info"]["version"] = "1.0"
    swag["info"]["title"] = "MediTech API"
    return swag


# Swagger UI route
SWAGGER_URL = "/swagger-ui"
API_URL = "/swagger"
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "My API"}
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


# Register Blueprint Routes
from src.routes.login import login_bp
from src.routes.prescriptions import prescriptions_bp
from src.routes.register import register_bp
from src.routes.reminders import reminders_bp

app.register_blueprint(login_bp, url_prefix="/v1/login")
app.register_blueprint(prescriptions_bp, url_prefix="/v1/prescriptions")
app.register_blueprint(register_bp, url_prefix="/v1/register")
app.register_blueprint(reminders_bp, url_prefix="/v1/reminders")

if __name__ == "__main__":
    debug = os.getenv("PYTHON_ENV") == "development"
    app.run(host=os.getenv("HOST"), port=int(os.getenv("PORT")), debug=debug)
