import bcrypt


def get_hashed_password(password):
    """
    Generates a hashed password from the plain text password using bcrypt

    Params:
      password: plain text password

    Returns:
      hashed_password: hashed password
    """

    # Encodes into bytes and hash
    bytes = password.encode()
    return bcrypt.hashpw(bytes, bcrypt.gensalt())


def check_password(password, hashed_password):
    """
    Checks if the candidate password and the hashed password matches

    Params:
      password: plain text password
      hashed_password: hashed password

    Returns:
      is_match: boolean
    """
    bytes = password.encode()
    return bcrypt.checkpw(bytes, hashed_password)
