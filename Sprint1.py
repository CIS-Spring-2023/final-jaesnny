# Jenni Chu
# 1873159

import flask
from flask import jsonify
from flask import request
import mysql.connector

"""
References:
https://www.w3schools.com/sql/sql_foreignkey.asp
"""

# setting up an application name
app = flask.Flask(__name__) # sets up application
app.config["DEBUG"] = True # allow to show errors in browser

#connect to database
space_db = mysql.connector.connect(
    host = "cis3368database.cglj5nvoedes.us-east-1.rds.amazonaws.com", 
    user = "jchu8", 
    password = "123password", 
    database = "cis3368db")

mycursor = space_db.cursor()





app.run()
