from flask import Blueprint
from flask import request

login_bp = Blueprint("login", __name__)


@login_bp.route("/", methods=["POST"])
def index():
    match request.method:
        case "POST":
            print("Login")
        case _:
            return 400
