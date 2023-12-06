import os
import sqlite3
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DB_URL")


def add_prescription(data):
    """
    Adds new prescription to the database.

    Params:
        data: object data to store in the database.
    """

    if not isinstance(data, dict):
        raise TypeError("'data' must be of type dictionary")
    elif not data:
        raise ValueError("'data' must have a value.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Creates table if it not exist
    curr.execute(
        """CREATE TABLE IF NOT EXISTS PRESCRIPTIONS_TABLE
        ( prescription_id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id VARCHAR(255),
          medication VARCHAR(255) NOT NULL,
          dosage VARCHAR(255) NOT NULL,
          instruction VARCHAR(255) NOT NULL,
          FOREIGN KEY(user_id) REFERENCES USER_TABLE(uuid));"""
    )
    conn.commit()

    # Get data
    user_id = str(data["uuid"])
    medication = str(data["medication"])
    dosage = str(data["dosage"])
    instruction = str(data["instruction"])

    # Insert data to the table
    curr.execute(
        "INSERT INTO PRESCRIPTIONS_TABLE (user_id, medication, dosage, instruction) VALUES (?, ?, ?, ?)",
        (
            user_id,
            medication,
            dosage,
            instruction,
        ),
    )

    # Save the changes
    conn.commit()

    # Close the connection
    conn.close()


def get_prescriptions(uuid):
    """
    Get prescriptions associated with the user.

    Params:
        uuid: uuid of the user

    Returns:
        prescriptions: list of all prescriptions [(id, medication, dosage, instruction)]
    """

    if not isinstance(uuid, str):
        raise TypeError("'uuid' must be of type string.")
    elif not uuid:
        raise ValueError("'uuid' must have a value.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Search the table for all prescriptions
    try:
        curr.execute(
            "SELECT prescription_id, medication, dosage, instruction FROM PRESCRIPTIONS_TABLE WHERE user_id = ?",
            (uuid,),
        )
        prescriptions = curr.fetchall()
    except:
        return None

    return prescriptions


def delete_prescription(uuid, prescription_id):
    """
    Deletes prescription associated with the user and prescription ID

    Params:
        uuid: uuid of the user
        prescription_id: unique id of the prescription
    """

    if not isinstance(uuid, str) or not isinstance(prescription_id, int):
        raise TypeError("'uuid' must be of type string.")
    elif not uuid:
        raise ValueError("'uuid' must have a value.")

    if not isinstance(prescription_id, int):
        raise TypeError("'prescription_id' must be of type integer.")
    elif not prescription_id:
        raise ValueError("'prescription_id' must have a value")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Delete entry from the table
    curr.execute(
        "DELETE FROM PRESCRIPTIONS_TABLE WHERE user_id = ? AND prescription_id = ?",
        (uuid, prescription_id),
    )

    # Save the changes
    conn.commit()

    # Close the connection
    conn.close()


def update_prescription(uuid, new_data):
    """
    Updates and existing prescription in the data.

    Params:
        uuid: Unique User Identifier
        prescription_id: Prescription to be updated
        new_data: New data to be uploaded
    """

    if not isinstance(uuid, str):
        raise TypeError("'uuid' must be a string.")
    elif not uuid:
        raise ValueError("'uuid' must have a value.")

    if not isinstance(new_data, dict):
        raise TypeError("'new_data' must be a dictionary.")
    elif not new_data:
        raise ValueError("'new_data' must have a value.")

    # Establishing the connection
    conn = sqlite3.connect(DB_URL)
    curr = conn.cursor()

    # Extact prescription id
    prescription_id = new_data["prescription_id"]
    del new_data["prescription_id"]

    # Search the table for all prescriptions
    query = (
        "UPDATE PRESCRIPTIONS_TABLE SET "
        + ", ".join(f"{key} = ?" for key in new_data)
        + "WHERE user_id = ? AND prescription_id = ?"
    )
    curr.execute(query, tuple(new_data.values()) + (uuid, prescription_id))

    # Save the changes
    conn.commit()

    # Close the connection
    conn.close()
