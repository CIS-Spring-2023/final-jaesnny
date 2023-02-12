import mysql.connector
import creds
from mysql.connector import Error
from sql import create_connection
from sql import execute_query
from sql import execute_read_query

# creating connection to mysql database
myCreds = creds.Creds()
conn = create_connection(myCreds.conString, myCreds.userName, myCreds.password, myCreds.dbName)

# create new entry and add it to table
query = "INSERT INTO users (firstname, lastname) VALUES ('Thomas', 'Edison')"
# execute_query(conn, query)

# select all users
select_users = "SELECT * FROM users"
users = execute_read_query(conn, select_users)
for user in users:
    print(user["firstname"] + "has the last name: " + user["lastname"])

# add table for invoices
create_invoice_table = """
CREATE TABLE IF NOT EXISTS invoices(
    id INT AUTO_INCREMENT,
    amount INT,
    description VARCHAR(255) NOT NULL,
    user_id INTEGER UNSIGNED NOT NULL,
    FOREIGN KEY fk_user_id(user_id) REFERENCES users(id),
    PRIMARY KEY (id)
)
"""
# execute_query(conn, create_invoice_table)

# add invoice record to invoice table
invoice_from_user = 1
invoice_amt = 50
invoice_description = "Harry Potter Books"

query = "INSERT INTO invoices (amount, description, user_id) VALUES ('%s', '%s', '%s')" % (invoice_amt, invoice_description, invoice_from_user)
# execute_query(conn, query)

# update invoice record
new_amt = 30
update_invoice_query = """
UPDATE invoices
SET amount = %s
WHERE id = 1""" % (new_amt)
log_query = "sdsdsf"
# execute_query(conn, update_invoice_query)

# delete invoice request from invoice table
invoice_id_to_delete = 1
delete_statement = "DELETE FROM invoices WHERE id = %s" % (invoice_id_to_delete)
# execute_query(conn, delete_statement)

# delete invoice table
delete_table_statement = "DROP TABLE invoices"
# execute_query(conn, delete_table_statement)

# concludes cruds ops