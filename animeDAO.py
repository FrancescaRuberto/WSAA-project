# AnimeDao final version

import mysql.connector

class AnimeDAO:
    host = ""
    user = ""
    password = ""
    database = ""
    connection = ""
    cursor = ""

    def __init__(self):
        self.host = "fraruberto.mysql.pythonanywhere-services.com"
        self.user = "fraruberto"
        self.password = "Provaprova.216"
        self.database = "fraruberto$anime_database"

    def getCursor(self):
        self.connection = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )
        self.cursor = self.connection.cursor(dictionary=True)
        return self.cursor

    def closeAll(self):
        self.connection.close()
        self.cursor.close()

    def create(self, values):
        cursor = self.getCursor()
        sql = """INSERT INTO anime 
                (title, author, is_manga, release_year, seasons, episodes, 
                 studio, rating, genre, category, original_language) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        cursor.execute(sql, values)
        self.connection.commit()
        newid = cursor.lastrowid
        self.closeAll()
        return newid

    def getAll(self):
        cursor = self.getCursor()
        sql = "SELECT * FROM anime"
        cursor.execute(sql)
        result = cursor.fetchall()
        self.closeAll()
        return result

    def findByID(self, id):
        cursor = self.getCursor()
        sql = "SELECT * FROM anime WHERE id = %s"
        values = (id,)
        cursor.execute(sql, values)
        result = cursor.fetchone()
        self.closeAll()
        return result

    def update(self, values):
        cursor = self.getCursor()
        sql = """UPDATE anime SET 
            title=%s, author=%s, is_manga=%s, release_year=%s, seasons=%s, 
            episodes=%s, studio=%s, rating=%s, genre=%s, category=%s, original_language=%s 
            WHERE id=%s"""
        cursor.execute(sql, values)
        self.connection.commit()
        
        # Verify if something has been updated
        if cursor.rowcount == 0:
            self.closeAll()
            return None

        # Give back updated data
        get_sql = "SELECT * FROM anime WHERE id=%s"
        cursor.execute(get_sql, (values[-1],))  # values[-1] is ID
        result = cursor.fetchone()
        self.closeAll()
        return result

    def delete(self, id):
        cursor = self.getCursor()
        sql = "DELETE FROM anime WHERE id = %s"
        values = (id,)
        cursor.execute(sql, values)
        self.connection.commit()
        self.closeAll()

animeDAO = AnimeDAO()