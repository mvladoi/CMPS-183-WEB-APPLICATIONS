import sqlite3
conn = sqlite3.connect('todo.db') # Warning: This file is created in the current directory
conn.execute("CREATE TABLE todo (id INTEGER PRIMARY KEY, title TEXT, description TEXT, due DATETIME, posted DATETIME, updated DATETIME,status bool NOT NULL)")
conn.execute("INSERT INTO todo (title,description, due, posted, updated,status) VALUES ('CMPS 111', 'Do Homework', '02-12-2008','2018-02-27 12:21:49.858020', '2018-02-19 12:21:49.858020',0)")
conn.execute("INSERT INTO todo (title,description, due, posted, updated,status) VALUES ('CMPS 112', 'Do the Lab', '02-13-2008','2018-02-27 12:21:49.858020', '2018-02-20 12:21:49.858020',1)")
conn.execute("INSERT INTO todo (title,description, due, posted, updated,status) VALUES ('CMPS 114', 'Go to meeting', '02-11-2008','2018-02-18 12:21:49.858020', '2018-02-21 12:21:49.858020',0)")
conn.execute("INSERT INTO todo (title,description, due, posted, updated,status) VALUES ('CMPS 115', 'Do the Assignment', '02-19-2008','2018-02-9 12:21:49.858020', '2018-02-22 12:21:49.858020',1)")
conn.execute("INSERT INTO todo (title,description, due, posted, updated,status) VALUES ('CMPS 118', 'Post on Piazza', '02-16-2008','2018-02-12 12:21:49.858020', '2018-02-23 12:21:49.858020',1)")
conn.execute("INSERT INTO todo (title,description, due, posted, updated,status) VALUES ('CMPS 119', 'See the TA ', '02-15-2008','2018-02-10 12:21:49.858020', '2018-02-24 12:21:49.858020',0)")
conn.commit()
