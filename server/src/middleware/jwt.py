import functools
from flask import request
from src.controller.userController import get_user_by_uuid
from src.utils.jwt import decode_token


def token_required(endpoint_name):
    def wrapper(f):
        @functools.wraps(f)
        def decorated_func(*args, **kwargs):
            token = None

            # Get authorization headers
            auth_header = request.authorization
            if not auth_header:
                return "No authorization header found.", 401

            # Gets token
            token = auth_header.token

            # Checks if token is existing
            if not token:
                return "No JWT token found.", 401

            try:
                # Decoding the payload to fetch the stored details
                data = decode_token(token)

                # Gets user from the database
                user = get_user_by_uuid(data["uuid"])

            except:
                return "Token is invalid.", 403

            # Returns the current logged in users context to the routes
            return f(user, *args, **kwargs)

        decorated_func.__name__ = f"{endpoint_name}_wrapper"
        return decorated_func

    return wrapper
