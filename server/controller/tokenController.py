import os
import sqlite3
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DB_URL")


# Store refresh token
def store_token(token):
    """
    Stores refresh token in the database

    Params:
        token: a JWT token
    """

    if not isinstance(token, str):
        raise TypeError("'token' must be of type string.")
    elif token is None or token == "":
        raise ValueError("'token' must have a value.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Creates table if it not exist
    curr.execute(
        """CREATE TABLE IF NOT EXISTS TOKEN_TABLE
        (refresh_token VARCHAR(255) PRIMARY KEY NOT NULL);"""
    )
    conn.commit()

    # Stores token in the database
    curr.execute("INSERT INTO TOKEN_TABLE VALUES (?)", (token,))

    # Saving changes
    conn.commit()

    # Closing the connection
    conn.close()


# Get token
# Update token
# Delete token
