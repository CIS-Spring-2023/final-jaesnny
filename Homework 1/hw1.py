# Jenni Chu
# 1873159

import mysql.connector

"""
REFERENCES:
https://pynative.com/python-mysql-insert-data-into-database-table/
https://www.w3schools.com/python/python_mysql_insert.asp
"""
# connect to database
fish_db = mysql.connector.connect(
    host = "cis3368database.cglj5nvoedes.us-east-1.rds.amazonaws.com", 
    user = "jchu8", 
    password = "123password", 
    database = "cis3368db")

mycursor = fish_db.cursor()

menu = ""
while menu != 'q':
    print('MENU\na - Add fish\no - Output all fish\nq- Quit')
    menu = input("Please make a selection:\n")
    # option to add row to table in sql
    if menu == 'a':
        #user inputs
        superclass = input("Please enter the fish's superclass:\n")
        species = input("Please enter the species:\n")
        color = input("Please enter the color:\n")
        acquired = input("Please enter the location of where it was acquired:\n")
        alive = input("Is it alive? (y/n)\n")
        # adding user input to correct column
        row_add = """INSERT INTO fish (superclass, species, color, acquired, alive) VALUES (%s, %s, %s, %s, %s)"""
        row_value = (superclass, species, color, acquired, alive)
        # executes to MySQL
        mycursor.execute(row_add, row_value)
        fish_db.commit()
    
    # option to output table
    elif menu == 'o':
        return_table = "SELECT * FROM fish"
        mycursor.execute(return_table)
        rows = mycursor.fetchall()
        for row in rows:
            print("ID:", row[0])
            print("Superclass:", row[1])
            print("Species:", row[2])
            print("Color:", row[3])
            print("Acquired:", row[4])
            print("Alive:", row[5])
        
    #option to quit
    elif menu == 'q':
        break