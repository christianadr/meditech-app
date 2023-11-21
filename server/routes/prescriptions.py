from flask import Blueprint
from flask import request
prescriptions_bp = Blueprint("prescriptions", __name__)

@prescriptions_bp.route('/', methods=["GET", "POST"])
def index():
  if request.method == "GET":
    return "get prescriptions == NOT YET IMPLEMENTED"
  elif request.method == "POST":
    return "add prescriptions == NOT YET IMPLEMENTED"
  else:
    return 404