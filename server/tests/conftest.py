import os
import sqlite3
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DB_URL")


def pytest_configure(config):
    conn = sqlite3.connect(DB_URL)
    cursor = conn.cursor()

    # Drops table for every start of the test
    cursor.execute("""DROP TABLE IF EXISTS USER_TABLE""")

    # Save changes
    conn.commit()

    # Close connection
    conn.close()
