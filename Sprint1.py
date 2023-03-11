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
@app.route('/captain/add', methods=["POST"])
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
    return 'Captain added!'

# view captain table
@app.route('/captain', methods=["GET"])
def view_captain():
    # SQL statement to view captain table
    return_table = "SELECT * FROM captain"
    # execute to SQL
    mycursor.execute(return_table)
    rows = mycursor.fetchall()
    #return table
    return jsonify(rows)

# update captain row
@app.route('/captain/update/<id>', methods=['PUT'])
def update_captain(id):
    # request form to update at certain id in captain table
    update_id = id
    firstname = request.form['firstname']
    lastname = request.form['lastname']
    space_rank = request.form['space_rank']
    homeplanet = request.form['homeplanet']

    # SQL statement to update row in captain table
    update_row = """
    UPDATE captain 
    SET firstname = %s, lastname = %s, space_rank = %s, homeplanet = %s
    WHERE id = %s
    """
    update_value = firstname, lastname, space_rank, homeplanet, update_id
    mycursor.execute(update_row, update_value)
    space_db.commit()

    return 'Captain updated!'

# delete captain row
@app.route('/captain/delete/<id>', methods = ['DELETE'])
def delete_captain(id):
    delete_id = id

    # SQL statement to delete row
    delete_row = "DELETE FROM captain WHERE id = %s" % delete_id

    # commit to SQL database
    mycursor.execute(delete_row)
    space_db.commit()

    return 'Captain deleted!'

app.run()
