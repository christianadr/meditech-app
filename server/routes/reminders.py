from flask import Blueprint
reminders_bp = Blueprint("reminders", __name__)

@reminders_bp.route('/')
def index():
  return "reminders"