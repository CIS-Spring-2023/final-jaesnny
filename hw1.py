#Jenni Chu
#1873159

#REFERENCES:


import mysql.connector

connection = mysql.connector.connect(
    host="cis3368database.cglj5nvoedes.us-east-1.rds.amazonaws.com",
    user="jchu8",
    password="123password"
)

mycursor = connection.cursor()

table = ''
while table != 'q':
    print('Table Selection Menu:\na = Add Fish\no = Output all fish in console\nq = quit')
    table = input('Make a selection: ')

connection.close