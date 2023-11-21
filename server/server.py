from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World!"


# Register Blueprint Routes
from routes.login import login_bp
from routes.prescriptions import prescriptions_bp
from routes.register import register_bp
from routes.reminders import reminders_bp

app.register_blueprint(login_bp, url_prefix="/v1/login")
app.register_blueprint(prescriptions_bp, url_prefix="/v1/prescriptions")
app.register_blueprint(register_bp, url_prefix="/v1/register")
app.register_blueprint(reminders_bp, url_prefix="/v1/reminders")

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
