import jwt
import os
from controller.userController import get_user_by_uuid
from dotenv import load_dotenv
from functools import wraps

load_dotenv()


def token_required(f):
    @wraps
    def decorated(*args, **kwargs):
        token = None

        # Checks if token is existing
        if not token:
            raise ValueError("'token' must have a value")

        try:
            # Decoding the payload to fetch the stored details
            data = jwt.decode(token, os.getenv("PUBLIC_KEY"))

            # Gets user from the database
            user = get_user_by_uuid(data["uuid"])

        except:
            raise ValueError("'token' is invalid.")

        # Returns the current logged in users context to the routes
        return f(user, *args, **kwargs)

    return decorated
