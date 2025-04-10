import mysql.connector

try:
    # Establish a connection to the MySQL server
    connection = mysql.connector.connect(
        host='localhost',
        user='root',  # MySQL username
        password='5680'  # Replace with your MySQL password
    )

    cursor = connection.cursor()

    # Create the database
    cursor.execute("CREATE DATABASE IF NOT EXISTS pregnancy_db;")
    cursor.execute("USE pregnancy_db;")

    # Create the users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );
    """)

    # Create the mood_entries table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS mood_entries (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT,
        mood VARCHAR(50) NOT NULL,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    """)

    # Create the recommendations table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS recommendations (
        id INT NOT NULL AUTO_INCREMENT,
        mood VARCHAR(50) NOT NULL,
        advice TEXT NOT NULL,
        PRIMARY KEY (id)
    );
    """)

    # Insert initial recommendations
    cursor.execute("""
    INSERT INTO recommendations (mood, advice) VALUES
    ('Happy', 'Keep up the positive vibes! Share your joy with loved ones.'),
    ('Anxious', 'Try deep breathing exercises or talk to your partner.'),
    ('Tired', 'Rest is crucial. Prioritize 8 hours of sleep.');
    """)

    # Commit the changes and close the connection
    connection.commit()
    print("Database and tables created successfully.")
except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()
