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

# connect to database
space_db = mysql.connector.connect(
    host = "cis3368database.cglj5nvoedes.us-east-1.rds.amazonaws.com", 
    user = "jchu8", 
    password = "123password", 
    database = "cis3368db")

mycursor = space_db.cursor()

# captain APIs
# view captain table
@app.route('/captain', methods=['GET'])
def all_captain():
    # SQL statement to view table
    return_table = "SELECT * FROM captain"
    # execute to SQL
    mycursor.execute(return_table)
    rows = mycursor.fetchall()
    space_db.commit()

    return jsonify(rows)

# add to captain table
@app.route('/api/captain/add', methods=["POST"])
def add_captain():
    #request form to add to captain table
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    space_rank = request.form['space_rank']
    homeplanet = request.form['homeplanet']
    
    # formats which column to add new items to 
    row_add = """INSERT INTO captain (firstname, lastname, space_rank, homeplanet) VALUES (%s, %s, %s, %s)"""
    row_value = (firstname, lastname, space_rank, homeplanet)

    mycursor.execute(row_add, row_value)
    space_db.commit()
    # confirms to user that row was added
    return 'Row added!'


app.run()
