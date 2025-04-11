import sqlite3

# Initialize database and create table
def init_db():
    conn = sqlite3.connect("farming_ai.db")
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_name TEXT,
            recommendation TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Store new result in the database
def store_result(name, recommendation):
    conn = sqlite3.connect("farming_ai.db")
    c = conn.cursor()
    c.execute(
        "INSERT INTO recommendations (farmer_name, recommendation) VALUES (?, ?)",
        (name, recommendation)
    )
    conn.commit()
    conn.close()

# ✅ Fetch all previous recommendations (for long-term memory)
def get_all_recommendations():
    conn = sqlite3.connect("farming_ai.db")
    c = conn.cursor()
    c.execute('''
        SELECT farmer_name, recommendation, timestamp
        FROM recommendations
        ORDER BY timestamp DESC
    ''')
    rows = c.fetchall()
    conn.close()
    return rows
