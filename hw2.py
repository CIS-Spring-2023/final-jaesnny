import flask
from flask import jsonify
from flask import request
import mysql.connector


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
    return_table = "SELECT * FROM snowboard"
    mycursor.execute(return_table)
    rows = mycursor.fetchall()
    return jsonify(rows)
    

    




app.run()