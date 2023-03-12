# Jenni Chu
# 1873159

import flask
from flask import jsonify
from flask import request
import mysql.connector

"""
References:
https://www.w3schools.com/sql/sql_foreignkey.asp
securityapi.py
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

# login API
authorizedusers = [
    {
        # admin user
        'username': 'main',
        'password': 'lolol',
        'admininfo': 'Welcome to Space!'
    }
]

@app.route('/login', methods=["GET"])
def user_pass():
    # get header parameters
    username = request.headers['username']
    password = request.headers['password']
    # loop through all users and passwords and find match to gain authorization
    for au in authorizedusers:
        if au['username'] == username and au['password'] == password:
            admininfo = au['admininfo']
            returninfo = []
            returninfo.append(admininfo)
            return jsonify(returninfo)
    return 'Incorrect username and password combination :P'

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

# spaceship APIs
# add to spaceship table
@app.route('/spaceship/add', methods=['POST'])
def add_spaceship():
    maxweight = request.form['maxweight']
    captainid = request.form['captainid']
    # SQL statement to check if captainid exists
    add_row = "INSERT INTO spaceship (maxweight, captainid) VALUES (%s, %s)"
    row_value = maxweight, captainid

    # execute to SQL
    mycursor.execute(add_row, row_value)
    space_db.commit()

    return 'Spaceship added!'

# view spaceship table
@app.route('/spaceship', methods = ['GET'])
def view_spaceship():
    return_table = "SELECT * FROM spaceship"
    # execute to SQL
    mycursor.execute(return_table)
    rows = mycursor.fetchall()
    #return table
    return jsonify(rows)

# update spaceship row
@app.route('/spaceship/update/<id>', methods=['PUT'])
def update_spaceship(id):
    # request form to update specific row
    update_id = id
    maxweight = request.form['maxweight']
    captainid = request.form['captainid']

    # SQL statement to update row
    update_row = """UPDATE spaceship
    SET maxweight = %s, captainid = %s
    WHERE id = %s
    """
    update_value = maxweight, captainid, update_id
    mycursor.execute(update_row, update_value)
    space_db.commit()

    return 'Spaceship updated!'

# delete spaceship row
@app.route('/spaceship/delete/<id>', methods=['DELETE'])
def delete_spaceship(id):
    delete_id = id

    # SQL statement to delete row
    delete_row = "DELETE FROM spaceship WHERE id = %s" % (delete_id)
    # execute to SQL
    mycursor.execute(delete_row)
    space_db.commit()

    return 'Spaceship deleted!'

# cargo APIs
# add to cargo table
@app.route('/cargo/add', methods=['POST'])
def add_cargo():
    # request form to add row to cargo table
    weight = request.form['weight']
    cargotype = request.form['cargotype']
    departure = request.form['departure']
    arrival = request.form['arrival']
    shipid = request.form['shipid']

    # SQL statement to add row
    add_row = "INSERT INTO cargo (weight, cargotype, departure, arrival, shipid) VALUES (%s, %s, %s, %s, %s)"
    row_values = weight, cargotype, departure, arrival, shipid
    # commit to SQL 
    mycursor.execute(add_row, row_values)
    space_db.commit()

    return 'Cargo added!'

# view cargo table
@app.route('/cargo', methods=['GET'])
def view_cargo():
    # SQL statement to view table
    return_table = "SELECT * FROM cargo"
    # commit to SQL
    mycursor.execute(return_table)
    rows = mycursor.fetchall()
    return jsonify(rows)

@app.route('/cargo/update/<id>', methods=['PUT'])
def update_cargo(id):
    # request form to update row
    update_id = id
    weight = request.form['weight']
    cargotype = request.form['cargotype']
    departure = request.form['departure']
    arrival = request.form['arrival']
    shipid = request.form['shipid']

    # SQL statement to update row
    update_row = """UPDATE cargo
    SET weight = %s, cargotype = %s, departure = %s, arrival = %s, shipid = %s
    WHERE id = %s
    """
    update_values = weight, cargotype, departure, arrival, shipid, update_id
    # commit to SQL 
    mycursor.execute(update_row, update_values)
    space_db.commit()

    return 'Cargo updated!'

# delete cargo row
@app.route('/cargo/delete/<id>', methods=["DELETE"])
def delete_cargo(id):
    delete_id = id

    # SQL statement to delete row
    delete_row = "DELETE FROM cargo WHERE id = %s" % (delete_id)
    # execute to SQL
    mycursor.execute(delete_row)
    space_db.commit()

    return 'Cargo deleted!'


app.run()
