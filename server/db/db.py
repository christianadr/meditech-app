import sqlite3

# Configurations
DB_URL = "meditech.db"

def connect():
  con = sqlite3.connect(DB_URL)
  curr = con.cursor()
  return curr