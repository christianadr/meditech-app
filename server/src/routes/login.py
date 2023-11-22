from flask import Blueprint
from flask import request
from src.controller.userController import get_user_by_email
from src.utils.jwt import generate_token
from src.utils.passwords import check_password

login_bp = Blueprint("login", __name__)


@login_bp.route("/", methods=["POST"])
def index():
    """
    Provides authentication to the client using JSON Web Tokens.

    Returns:
        access_token: access token used to access resources
        refresh_token: refresh token used to get access tokens
    """
    match request.method:
        case "POST":
            json_data = request.get_json()

            # Gets user from email
            email = json_data["email"]
            user = get_user_by_email(email)

            uuid = user[0]  # gets uuid
            hashed_password = user[3]  # gets hashed password

            # Compare password
            password = json_data["password"]
            is_match = check_password(password, hashed_password)

            # Provide access token and refresh token
            if is_match:
                access_token = generate_token(uuid)
                refresh_token = generate_token(uuid, "refresh")

                return {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                }, 200
            else:
                return "Invalid credentials", 401

        case _:
            return 400
