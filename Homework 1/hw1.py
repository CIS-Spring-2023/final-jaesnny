# Jenni Chu
# 1873159

import mysql.connector

"""
REFERENCES:

"""

fish_db = mysql.connector.connect(
    host = "cis3368database.cglj5nvoedes.us-east-1.rds.amazonaws.com", 
    user = "jchu8", 
    password = "123password", 
    database = "cis3368db")


mycursor = fish_db.cursor

menu = ""
while menu != 'q':
    print('MENU\na - Add fish\no - Output all fish\nq- Quit')
    menu = input("Please make a selection:\n")

