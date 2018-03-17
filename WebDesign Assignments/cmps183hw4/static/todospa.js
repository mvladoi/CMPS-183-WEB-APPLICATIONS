const initDocElems = () => {
    return {
        todoList: document.getElementById('todolist'),
        taskTemplate: document.getElementById('task-template').firstElementChild,
        editTemplate: document.getElementById('edit-task-template').firstElementChild,
        newList: document.getElementById('newlist'),
        fieldform: document.getElementById('fieldform'),
        formCount: 0
    }
};

var docElems;
var x = 0;
var task;






const init = () => {
    // tasks load asynchronously with rest of init()
    loadTasks(); 

    // convenience object with references to key DOM objects and the form counter
    docElems = initDocElems();

    // attach event handlers to controls in right sidebar
    // to controls
    document.querySelector('.controls')
        .addEventListener('click', (event) => {
            if (event.target.closest('INPUT.controlbtn') && 
                event.target.closest('INPUT.controlbtn').value == "New task") {
                handleNewTask(event)
            };
            
            if (event.target.closest('INPUT.controlbtn') && 
            event.target.closest('INPUT.controlbtn').value == "Filter") {
                 
               console.log(x);


            if (x == "1"){
                handleNewTask1(event); 
            }
            else if (x == "2"){
                handleNewTask2(event); 
            }
            else {
                handleNewTask3(event);
            }

            
        };
            // Filter handling goes here ...
        });
    

    // to new tasks being edited
    document.querySelector('#newlist')
        .addEventListener('click', (event) => {
            
            // you can remove the diagnostic console.log and alert statements
            console.log("event:");
            console.log(event);
            // alert("Check browser console for console.log messages");

            if (event.target.closest('INPUT.editbtn')) {
                handleNewTaskSave(event)
            };

            if (event.target.closest('INPUT.deletebtn')) {
                handleNewTaskCancel(event)
            };
            
        });



    document.querySelector('#fieldform')
        .addEventListener('click', (event) => {
            
            // you can remove the diagnostic console.log and alert statements
            console.log("event:");
            console.log(event);
            // alert("Check browser console for console.log messages");

            if (event.target.closest('DIV.option1')) {
                x = 1;
            };

            if (event.target.closest('DIV.option2')) {
                x = 2;
            };


            if (event.target.closest('DIV.option3')) {
                x = 3;
            };


            console.log(x);
            
        });



    document.querySelector('#todolist')
        .addEventListener('click', (event) => {
            if (event.target.closest('INPUT.status')) {
                console.log("task checked? " + event.target.checked);
                status = (event.target.checked ? "done" : "tbd");
                console.log('status: ' + status);

                taskid = event.target.closest('SECTION.todoitem').children[0].value;
                console.log('taskid: ' + taskid);

                postData('/status/update', { 'taskid': taskid, 'status': status })
                    .then(response => {
                        console.log("before reading body of postData response:")
                        console.log(response);

                        message = response.json();

                        console.log("after reading body of postData response:")
                        console.log(response);
                        console.log("message read from response body: ")
                        console.log(message);

                        return message;
                    })
                    .then(reply => {
                        console.log("reply that resolved promise:")
                        console.log(reply);
                        
                        if (reply.error) {
                            alert("Server Error: " + reply.error)
                        }
                    })
                    // catch errors not caught by server-side application 
                    .catch(error => console.log(error))
            };



             if (event.target.closest('INPUT.editbtn')) { 
                
                console.log("task checked  edit? ");
                task = event.target.closest('SECTION.todoitem').children[0].value;
                //task = event.target.closest('SECTION.todoitem');
                console.log(task);
                handleEditTask(event)
            }





            if (event.target.closest('INPUT.deletebtn')) { 
                
                console.log("task checked delete? " );
                var taskid = event.target.closest('SECTION.todoitem').children[0].value;
                console.log(taskid);

                deleteTask(taskid);


            }



            // addition eventListeners go here for clicks of buttons
            // Edit, Delete
            // Save and Cancel (these on the form created click on Edit)
        });

};   

const loadTasks = () => {
    getTasks('all')
        .then(rsp => {
            payload = rsp.json();
            return payload
        })
        .then(tasks => {
            console.log("resolving promise in loadTasks response:")
            console.log(tasks);
            createTaskElements(tasks);
        })
};

const getTasks = (filter) => {
    return fetch("/tasks/" + filter, {
                // set headers to let server know format of 
                // request and response bodies
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
}

const putTask = (task) => {
    console.log("from putTask, task:");
    console.log(task);
    return fetch('/task/new', {

        // represent JS object as a string
        body: JSON.stringify(task),

        // set headers to let server know format of 
        // request and response bodies
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },

        // in the ReST spirit method should be PUT
        // but bottle does not support HTTP verb PUT
        method: 'POST'
    })
}

const postTask = (task) => {
    console.log("from postTask, task:");
    console.log(task);
    return postData('/task/update/', task)
}


const deleteTask = (task) =>{

    console.log("from deleteTask, task:");
    console.log(task);
    var myNode = document.getElementById("todolist");
    
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
        
    }
    fetch("/delete/" + task, {
        // set headers to let server know format of 
        // request and response bodies
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    })

    loadTasks(); 

}

function postData(url, jsondata) {
    return fetch(url, {
        body: JSON.stringify(jsondata),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        method: 'POST'
    })
}

// functions for building and manipulating DOM

const createTaskElements = (taskListData) => {
    console.log("from createTaskElements: creating task elements");
    taskListData.forEach(createAndAppendTaskElement)
}

const createTaskElement = (task) => {
    // cloneNode(true) makes a deep clone (as opposed to shallow clone)
    var taskel = docElems.taskTemplate.cloneNode(true);
    updateTaskElement(task, taskel);
    return taskel
};

const updateTaskElement = (task, taskel) => {
    setTaskId(taskel, task.taskid);
    setTaskDescription(taskel, task.taskdescription);
    setStatus(taskel, task.status);
}

const appendTaskElement = (taskel) => {
        docElems.todoList.appendChild(taskel);
}

// poor (wo)man's function composition
const createAndAppendTaskElement = (taskel) => {
    appendTaskElement(createTaskElement(taskel))
}

const setTaskId = (taskel, taskid) => {
    var  taskidEl = taskel.querySelector('.taskid');
    taskidEl.value = taskid;
};

const getTaskId = (taskel) => {
    var taskidEl = taskel.querySelector('.taskid');
    return taskidEl.value
}

const setTaskDescription = (taskel, taskdescription) => {
    var taskDescriptionEl = taskel.querySelector('.taskdescription');
    taskDescriptionEl.innerHTML = taskdescription;
}

const getTaskFormDescription = (taskel) => {
    var taskDescriptionEl = taskel.querySelector('.taskdescription');
    return taskDescriptionEl.firstElementChild.value
}

const getTaskDescription = (taskel) => {
    var taskDescriptionEl = taskel.querySelector('.taskdescription');
    return taskDescriptionEl.innerHTML
}

const setStatus = (taskel, status) => {
    var taskStatusEl = taskel.querySelector('.status');
    if (status === "done") {
        taskStatusEl.checked = true;
    }
}

const getStatus = (taskel) => {
    var taskStatusEl = taskel.querySelector('.status');
    return (taskStatusEl.checked ? "done" : "tbd")
}

const editNewTask = () => {
    var taskFormEl = docElems.editTemplate.cloneNode(true);
    setFormId(taskFormEl);
    docElems.newList.appendChild(taskFormEl);
}




const editTask = () => {
    console.log("edit task");
    var taskFormEl = docElems.editTemplate.cloneNode(true);
    setFormId(taskFormEl);
    deleteTask(task);
    docElems.newList.appendChild(taskFormEl);
}


const setFormId = (taskFormEl) => {

    // create unique (within DOM) form id
    docElems.formCount += 1;
    formid = "form-" + docElems.formCount

    // set form id in form elements and form
    taskFormEl.querySelector('.taskid').form = formid;
    taskFormEl.querySelector('.taskdescription').firstElementChild.form = formid;
    taskFormEl.querySelector('.status').form = formid;
    taskFormEl.querySelector('.editbtn').form = formid;
    taskFormEl.querySelector('FORM').id = formid;
}

// event handling functions

const handleNewTask = (event) => {
    editNewTask();
}



const handleEditTask = (event) => {
    console.log("Edit Task");
    editTask();
}




const handleNewTask1 = (event) => {
    
    
    var myNode = document.getElementById("todolist");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    getTasks('all')
    .then(rsp => {
        payload = rsp.json();
        return payload
    })
    .then(tasks => {
        console.log("resolving promise in loadTasks response1:")
        console.log(tasks);
        createTaskElements(tasks);
    })
    
}


const handleNewTask2 = (event) => {
    
    
    var myNode = document.getElementById("todolist");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    getTasks('done')
    .then(rsp => {
        payload = rsp.json();
        return payload
    })
    .then(tasks => {
        console.log("resolving promise in loadTasks response2:")
        console.log(tasks);
        createTaskElements(tasks);
    })
    
}



const handleNewTask3 = (event) => {
    
    
    var myNode = document.getElementById("todolist");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    getTasks('tbd')
    .then(rsp => {
        payload = rsp.json();
        return payload
    })
    .then(tasks => {
        console.log("resolving promise in loadTasks response3:")
        console.log(tasks);
        createTaskElements(tasks);
    })
    
}

const handleNewTaskSave = (event) => {
    var taskFormEl = event.target.closest('section.todoitem');
    task = {
        taskdescription: getTaskFormDescription(taskFormEl),
        status: getStatus(taskFormEl)
    };
    putTask(task)
        .then(rsp => {
            console.log("before reading putTask response body");
            console.log(rsp);
            payload = rsp.json();
            console.log("after reading putTask response body");
            console.log(rsp);
            console.log("payload:");
            console.log(payload);
            return payload
        })
        .then(task => {
            console.log("task resolving promise:")
            console.log(task);
            createTaskElement(task);
            taskFormEl.remove();
        })
}

const handleNewTaskCancel = (event) => {
    var taskFormEl = event.target.closest('section.todoitem');
    taskFormEl.remove()
}

init();


