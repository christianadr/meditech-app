from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World!"


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
    app.run(host="192.168.254.104", port=5000, debug=True)
