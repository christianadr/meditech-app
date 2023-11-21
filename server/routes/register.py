from flask import Blueprint
from flask import request
from controller.userController import create_user
from utils.validations import validate_email, validate_password

register_bp = Blueprint("register", __name__)


@register_bp.route("/", methods=["POST"])
def index():
    match request.method:
        case "POST":
            json_data = request.get_json()

            # Validate name
            name = json_data["name"]
            if name is None:
                return "Name is not found.", 404

            # Validate email
            email = json_data["email"]
            if email is None:
                return "Email is not found.", 404
            if not validate_email(email):
                return "Email is invalid.", 400

            # Validate password
            password = json_data["password"]
            if password is None:
                return "Password is not found.", 404
            if not validate_password(password):
                return "Password is invalid.", 400

            # Register user
            new_user = {"name": name, "email": email, "password": password}
            create_user(new_user)

            return "Registered new user.", 200

        case _:
            return "Bad Request", 400
