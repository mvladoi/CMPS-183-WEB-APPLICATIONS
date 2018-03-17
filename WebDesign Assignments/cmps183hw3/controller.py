import sqlite3
import datetime
from bottle import route, run, debug, template,request,static_file,redirect


@route('/list')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo ORDER BY posted DESC")
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output







@route('/new', method='GET')
def new_item():

    if request.GET.save:

        new_task = request.GET.task.strip()
        new_job = request.GET.job.strip()
        new_date = request.GET.date.strip()
        new_posted = datetime.datetime.now()
        new_updated = datetime.datetime.now()
        conn = sqlite3.connect('todo.db')
        c = conn.cursor()

        c.execute("INSERT INTO todo (title,description,due,posted,updated,status) VALUES (?,?,?,?,?,?)", (new_task,new_job,new_date,new_posted,new_updated,0))
        new_id = c.lastrowid

        conn.commit()
        c.close()

        return redirect ('/list')
    else:
        return template('templates/new_task.tpl')







@route('/edit/<no:int>', method='GET')
def edit_item(no):
    

    if request.GET.save:
        new_task = request.GET.task.strip()
        new_job = request.GET.job.strip()
        new_date = request.GET.date.strip()
        new_updated = datetime.datetime.now()
        

       

        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("UPDATE todo SET title = ?, description = ?,  due = ? , updated = ? WHERE id LIKE ?", (new_task,new_job, new_date, new_updated, no))
        conn.commit()

        return redirect ('/list')
    else:
        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("SELECT title FROM todo WHERE id LIKE ?", (str(no),))
        cur_data = c.fetchone()

        return template('templates/edit_task', old=cur_data, no=no)





@route('/delete/<no:int>', method='GET')
def delete_item(no):
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("DELETE FROM todo WHERE id LIKE ?", (str(no),))
    conn.commit()
    return redirect ('/list')

        




@route('/all')
def todo():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo")
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output




@route('/completed')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo where status LIKE ?", (str(1),))
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output





@route('/progress')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo where status LIKE ?", (str(0),))
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output



@route ('/')
@route('/index')
def help():
    return static_file('index.html', root='.')



@route('/css/<filename:path>')
def static(filename):
    return static_file(filename, root='css/') 


@route('/html/<filename:path>')
def static(filename):
    return static_file(filename, root='cmps183hw3/')     



@route('/images/<filename:re:.*\.jpeg>')
def send_image(filename):
    return static_file(filename, root='images/', mimetype='image/jpeg')




@route('/check/<no:int>', method='GET')
def insert_item(no):

    if request.GET.save:
        status = request.GET.status.strip()

        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("UPDATE todo SET  status = ? WHERE id LIKE ?", ( 1, no))
        conn.commit()
        return redirect ('/list') 
    

    else:
        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("SELECT title FROM todo WHERE id LIKE ?", (str(no),))
        cur_data = c.fetchone()

        return template('templates/done_task', old=cur_data, no=no)




@route('/uncheck/<no:int>', method='GET')
def insert_item(no):

    if request.GET.save:
        status = request.GET.status.strip()

        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("UPDATE todo SET  status = ? WHERE id LIKE ?", ( 0, no))
        conn.commit()
        return redirect ('/list') 
    

    else:
        conn = sqlite3.connect('todo.db')
        c = conn.cursor()
        c.execute("SELECT title FROM todo WHERE id LIKE ?", (str(no),))
        cur_data = c.fetchone()

        return template('templates/todo_task', old=cur_data, no=no)





@route('/posted_asc')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo ORDER BY posted ASC")
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output




@route('/posted_desc')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo ORDER BY posted DESC")
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output



@route('/update_asc')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo ORDER BY updated ASC")
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output   





@route('/update_desc')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo ORDER BY updated DESC")
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output 





@route('/duedate_desc')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo ORDER BY due DESC")
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output



@route('/duedate_asc')
def todo_list():
    conn = sqlite3.connect('todo.db')
    c = conn.cursor()
    c.execute("SELECT id,title,description,due,posted,updated FROM todo ORDER BY due ASC")
    result = c.fetchall()
    c.close()
    output = template('templates/make_table', rows=result)
    return output    






debug(True)
run(reloader=True)