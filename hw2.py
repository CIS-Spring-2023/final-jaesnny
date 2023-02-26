import flask
from flask import jsonify
from flask import request
import mysql.connector

"""
References:
Homework 1
Class 5 restapi.py
https://pythonbasics.org/flask-http-methods/
https://www.geeksforgeeks.org/put-method-python-requests/
https://www.mysqltutorial.org/python-mysql-update/
https://www.w3schools.com/sql/sql_delete.asp
"""


# setting up an application name
app = flask.Flask(__name__) # sets up application
app.config["DEBUG"] = True # allow to show errors in browser

#connect to database
snowboard_db = mysql.connector.connect(
    host = "cis3368database.cglj5nvoedes.us-east-1.rds.amazonaws.com", 
    user = "jchu8", 
    password = "123password", 
    database = "cis3368db")

mycursor = snowboard_db.cursor()


# get all snowboards from table: 
@app.route('/api/snowboard/get', methods=['GET']) 
def api_get_sb():
    # SQL statement to post table
    return_table = "SELECT * FROM snowboard"
    mycursor.execute(return_table)
    rows = mycursor.fetchall()
    # returns row
    return jsonify(rows)

# user add snowboard to table
@app.route('/api/snowboard/add', methods=['POST'])
def api_add_sb():
    # request_data = request.get_json()
    name = request.form['name']
    boardtype = request.form['boardtype']
    brand = request.form['brand']
    msrp = request.form['msrp']
    size = request.form['size']
    
    # formats which column to add new items to 
    row_add = """INSERT INTO snowboard (name, boardtype, brand, msrp, size) VALUES (%s, %s, %s, %s, %s)"""
    row_value = (name, boardtype, brand, msrp, size)

    mycursor.execute(row_add, row_value)
    snowboard_db.commit()
    # confirms to user that row was added
    return 'Row added!'


# update row from table with id
@app.route('/api/snowboard/update/<id>', methods=['PUT'])
def api_update_sb(id):
    # input for postman
    update_id = id
    name = request.form['name']
    boardtype = request.form['boardtype']
    brand = request.form['brand']
    msrp = request.form['msrp']
    size = request.form['size']

    # SQL statement to update row
    update_row = """ UPDATE snowboard 
    SET name = %s, boardtype = %s, brand = %s, msrp = %s, size = %s
    WHERE id = %s
    """
    update_value = name, boardtype, brand, msrp, size, update_id
    mycursor.execute(update_row, update_value)
    snowboard_db.commit()

    # confirms to user that row was updated
    return 'Row updated!'


# delete row from table with id
@app.route('/api/snowboard/delete/<id>', methods = ['DELETE'])
def api_delete_sb(id):
    delete_id = id

    # SQL statement to delete row
    delete_row = "DELETE FROM snowboard WHERE id = %s" % (delete_id)

    # commit to SQL database
    mycursor.execute(delete_row)
    snowboard_db.commit()

    # confirms user that row is deleted
    return 'Row deleted!'


app.run()