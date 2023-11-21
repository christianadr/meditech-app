import os
import sqlite3
import uuid
from dotenv import load_dotenv
from utils.passwords import get_hashed_password, check_password

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
        raise TypeError("data must be of type dictionary.")
    elif data is None:
        raise ValueError("data must be not None.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Creates table if it not exist
    curr.execute(
        """CREATE TABLE IF NOT EXISTS USER_TABLE
        ( uuid VARCHAR(255) PRIMARY KEY NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL);"""
    )
    conn.commit()

    # Retrieves email and password
    email = str(data["email"])
    password = str(data["password"])

    if email is None or password is None:
        raise ValueError("email and password is None.")

    # Creates hashed password
    hashed_password = get_hashed_password(password)

    # Stores credentials in the database
    curr.execute(
        "INSERT INTO USER_TABLE VALUES (?, ?, ?)",
        (
            str(uuid.uuid4()),
            email,
            hashed_password,
        ),
    )

    # Saving changes
    conn.commit()

    # Closing the connection
    conn.close()


# Get user
# Delete user
# Update user
