import os
import sqlite3
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DB_URL")


def upload_file(uuid, filename, image_data):
    """
    Uploads the BLOB of the image into the SQLite database.

    Params:
        uuid: UUID associated with this image
        filename: Filename of the file
        image_data: BLOB that will be saved in the database
    """
    if not isinstance(uuid, str):
        raise TypeError("'uuid' must be a string.")
    elif not uuid:
        raise ValueError("'uuid' must have a value.")

    if not isinstance(filename, str):
        raise TypeError("'filename' must be a string.")
    elif not filename:
        raise ValueError("'filename' must have a value.")

    if not image_data:
        raise ValueError("'image_data' must have a value.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Creates table if it not exist
    curr.execute(
        """CREATE TABLE IF NOT EXISTS IMAGES_TABLE
        ( img_id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id VARCHAR(255),
          filename VARCHAR(255),
          image BLOB,
          FOREIGN KEY(user_id) REFERENCES USER_TABLE(uuid));"""
    )
    conn.commit()

    # Uploads the file into the database
    curr.execute(
        "INSERT INTO IMAGES_TABLE (user_id, filename, image) VALUES (?, ?, ?)",
        (uuid, filename, image_data),
    )

    # Saves the changes
    conn.commit()

    # Close the connection
    conn.close()


def get_file(uuid, filename):
    """
    Gets the BLOB data from the database using the uuid and
    filename.

    Params:
        uuid: UUID associated with the file
        filename: Filename of the file

    Returns:
        blob_data: BLOB data of the image
    """
    if not isinstance(uuid, str):
        raise TypeError("'uuid' must be a string.")
    elif not uuid:
        raise ValueError("'uuid' must have a value.")

    if not isinstance(filename, str):
        raise TypeError("'filename' must be a string.")
    elif not filename:
        raise ValueError("'filename' must have a value.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Query for getting the image data
    curr.execute(
        "SELECT image FROM IMAGES_TABLE WHERE uuid = ? AND filename = ?",
        (uuid, filename),
    )

    blob_data = curr.fetchone()[0]

    # Closes the connection
    conn.close()

    return blob_data
