import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()


def decode_token(token, type="access"):
    """
    Decodes a JWT token using PUBLIC_KEY or SECRET_KEY

    Params:
      token: JWT token to decode

    Returns:
      result: decoded results
    """

    if not isinstance(token, str):
        raise TypeError("'token' must be of type string.")
    elif not token:
        raise ValueError("'token' must have a value.")

    if not isinstance(type, str):
        raise TypeError("'type' must be of type string.")

    match type:
        case "access":
            result = jwt.decode(token, os.getenv("PUBLIC_KEY"), ["HS256"])
        case "refresh":
            result = jwt.decode(token, os.getenv("SECRET_KEY"), ["HS256"])
        case _:
            return None

    return result


def generate_token(uuid, type="access"):
    """
    Generates a JWT token using UUID as payload.

    Params:
      uuid: unique user identifier
      type: type of token to generate

    Returns:
      token: a jwt token
    """

    if not isinstance(uuid, str):
        raise TypeError("'uuid' must be of type string.")
    elif not uuid:
        raise ValueError("'uuid' must have a value.")

    if not isinstance(type, str):
        raise TypeError("'type' must be of type string.")

    payload = {
        "uuid": uuid,
        "iat": datetime.utcnow(),
    }

    match type:
        case "access":
            # Generate token from payload
            payload["exp"] = datetime.utcnow() + timedelta(hours=24)
            token = jwt.encode(payload, os.getenv("PUBLIC_KEY"))
        case "refresh":
            # Generate token from payload
            payload["exp"] = datetime.utcnow() + timedelta(days=7)
            token = jwt.encode(payload, os.getenv("SECRET_KEY"))
        case _:
            return None

    return token
