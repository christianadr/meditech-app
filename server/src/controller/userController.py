import os
import sqlite3
import uuid
from dotenv import load_dotenv
from src.utils.passwords import get_hashed_password

load_dotenv()

DB_URL = os.getenv("DB_URL")


# Create new user
def create_user(data: dict):
    """
    Creates a new user to the database consisting of email and password.

    Params:
      data: dictionary consisting of "email" and "password"
    """

    if not isinstance(data, dict):
        raise TypeError("'data' must be of type dictionary.")
    elif not data:
        raise ValueError("'data' must be not None.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Creates table if it not exist
    curr.execute(
        """CREATE TABLE IF NOT EXISTS USER_TABLE
        ( uuid VARCHAR(255) PRIMARY KEY NOT NULL,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL);"""
    )
    conn.commit()

    # Retrieves email and password
    name = str(data["name"])
    email = str(data["email"])
    password = str(data["password"])

    if not name or not email or not password:
        raise ValueError("'name', 'email', and/or 'password' is None.")

    # Creates hashed password
    hashed_password = get_hashed_password(password)

    # Stores credentials in the database
    curr.execute(
        "INSERT INTO USER_TABLE VALUES (?, ?, ?, ?)",
        (
            str(uuid.uuid4()),
            name,
            email,
            hashed_password,
        ),
    )

    # Saving changes
    conn.commit()

    # Closing the connection
    conn.close()


def get_user_by_email(email):
    """
    Gets user from the database using email.

    Params:
        email: plain text email

    Returns:
        user: (uuid, name, email, password)
    """

    if not isinstance(email, str):
        raise TypeError("'email' is not of string type.")
    elif not email:
        raise ValueError("'email' must not be None.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Selects user from the table
    curr.execute("SELECT * FROM USER_TABLE WHERE email=? LIMIT 1", (email,))
    user = curr.fetchone()
    return user


def get_user_by_uuid(uuid):
    """
    Gets user from the database using uuid.

    Params:
        uuid: plain text uuid

    Returns:
        user: (uuid, name, email, password)
    """

    if not isinstance(uuid, str):
        raise TypeError("'uuid' is not of string type.")
    elif not uuid:
        raise ValueError("'uuid' must not be None.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Selects user from the table
    curr.execute("SELECT * FROM USER_TABLE WHERE uuid=? LIMIT 1", (uuid,))
    user = curr.fetchone()
    return user


# Update user
# Delete user
