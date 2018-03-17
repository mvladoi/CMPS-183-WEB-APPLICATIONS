



var customers = new Array();






function set_database(){


 customers.push(["","Task Title", "Notes", "Due Date", "Posted", "Last Updated", "Features"]);
 customers.push(["","CMPS111" , "Go to office hours", "2002-02-03", "2/17/2000, 2:50:42 PM", "2/17/2001, 2:50:42 PM"]);
 customers.push(["","CMPS110" , "I have an exam ", "2022-07-09", "2/17/2020, 2:50:42 PM", "2/17/2022, 2:53:14 PM"]);
 localStorage.array = JSON.stringify(customers);


}





function completed() {
  var aObj=document.getElementById('x_table').getElementsByTagName('tr'); 
  var i = document.getElementById("x_table").rows.length;

  while(i--) { 
    if(i>0){
      if(!aObj[i].getElementsByTagName('input')[0].checked) {
       aObj[i].style.visibility = "collapse";
     }
     if(aObj[i].getElementsByTagName('input')[0].checked) {
       aObj[i].style.visibility = "visible";
     }
   }
 }

}





function to_do() {

  var aObj=document.getElementById('x_table').getElementsByTagName('tr');
  var i = document.getElementById("x_table").rows.length;
  while(i--) { 
    if(i > 0){
      if(aObj[i].getElementsByTagName('input')[0].checked) {
       aObj[i].style.visibility = "collapse";
     }
     if(!aObj[i].getElementsByTagName('input')[0].checked) {
       aObj[i].style.visibility = "visible";
     } 
   }
 }

}







function edit(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";

 var course = document.getElementById("TT"+no);
 var job = document.getElementById("N"+no);
 var date = document.getElementById("DD"+no);
 
 var course_data = course.innerHTML;
 var job_data = job.innerHTML;
 var date_data = date.innerHTML;
 var updated_data = new Date().toLocaleString();

 course.innerHTML="<input type='text' id='course_text"+no+"' value='"+course_data+"'>";
 job.innerHTML="<input type='text' id='job_text"+no+"' value='"+job_data+"'>";
 date.innerHTML="<input type='text' id='date_text"+no+"' value='"+date_data+"'>";
 
}





function save(no)
{
 var course_val=document.getElementById("course_text"+no).value;
 var job_val=document.getElementById("job_text"+no).value;
 var date_val=document.getElementById("date_text"+no).value;

 document.getElementById("TT"+no).innerHTML = course_val;
 document.getElementById("N"+no).innerHTML = job_val;
 document.getElementById("DD"+no).innerHTML = date_val;
 
 customers = JSON.parse(localStorage.array);
  for ( var i = 0 ; i < customers.length ; i ++){
   if (i == no ){
   customers[i][0] = "";
   customers[i][1] = course_val;
   customers[i][2] = job_val;
   customers[i][3] = date_val;
   customers[i][5] = new Date().toLocaleString();
   }

  }



localStorage.array = JSON.stringify(customers);

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}






function to_all() {

  var aObj=document.getElementById('x_table').getElementsByTagName('tr');
  var i = document.getElementById("x_table").rows.length; 
  while(i--) { 
    if(i > 0){
      if(aObj[i].getElementsByTagName('input')[0].checked) {
       aObj[i].style.visibility = "visible";
     }
     if(!aObj[i].getElementsByTagName('input')[0].checked) {
       aObj[i].style.visibility = "visible";
     }
   }
 }

}






function checkDate() {
 var selectedText = document.getElementById('datepicker').value;
 var selectedDate = new Date(selectedText);
 var now = new Date();
 if (selectedDate < now) {
  alert("Date must be in the future");
}
}





function delete_row(no)
{

 document.getElementById("row"+no+"").outerHTML="";
 customers = JSON.parse(localStorage.array);
 customers.splice(no, 1);
 localStorage.clear();
 localStorage.array = JSON.stringify(customers);
}





function add_row()
{

 var new_name=document.getElementById("task").value;
 var new_job=document.getElementById("notes").value;
 var new_date=document.getElementById("datepicker").value;
 var new_posted = new Date().toLocaleString();
 var new_updated = new Date().toLocaleString();


customers = JSON.parse(localStorage.array);
customers.push(["", new_name , new_job, new_date, new_posted, new_updated]);
localStorage.array = JSON.stringify(customers);

}






function submit_actions(){


  add_row();
  redirect();
}




function redirect()
{
   
    window.location.href = "todo.html";
}






  function GenerateTable() {

   customers = JSON.parse(localStorage.array);   
    var table = document.createElement("TABLE");
    table.id = 'x_table';


    

    for (var i = 0; i <customers.length; i++) {

      row = document.createElement('tr');

      if (i > 0){
        row.id = 'row' + i;
        row.innerHTML = `
        <td> <input id="checkBox" type="checkbox"> </td>     
        <td id='TT${i}'> ${customers[i][1]}</td>
        <td id='N${i}'> ${customers[i][2]}</td>
        <td id='DD${i}'> ${customers[i][3]}</td>
        <td id='P${i}' >${customers[i][4]}</td>
        <td id='LU${i}'>${customers[i][5]}</td>
        <td><button id = 'edit_button${i}'onclick = 'edit(${i})'> Edit </button>
        <button id = 'save_button${i}'onclick = 'save(${i})'> Save </button>
        <button id = 'delete_button${i}'onclick = 'delete_row(${i})'> Delete </button></td>

        `


      }

      else {

       row.innerHTML = `
       <th></th>
       <th> ${customers[i][1]}</th>
       <th> ${customers[i][2]}</th>
       <td> ${customers[i][3]}</th>
       <th> ${customers[i][4]}</th> 
       <th> ${customers[i][5]}</td>
       <th> ${customers[i][6]}</td>  


       `



     }



     table.appendChild(row);

   }       



   var dvTable = document.getElementById("myTable");
    dvTable.appendChild(table);
  }







function delete_table(){



var myNode = document.getElementById("myTable");

while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

}




function my_sort(no){

customers = JSON.parse(localStorage.array);  

var temp = customers[0];
var temp2 = new Array();

for (var i = 1; i < customers.length; i++){
temp2.push(customers[i])

}




if (no == 1){
temp2.sort(due_asc);
}
else if(no ==2) {
temp2.sort(due_desc);
}
else if(no == 3){
  temp2.sort(post_asc);
}
else if(no == 4){
  temp2.sort(post_desc);
}
else if(no == 5){
  temp2.sort(update_asc);
}

else if(no == 6){
  temp2.sort(update_desc);
}




localStorage.clear();

customers[0] = temp; 
for(var i = 1; i < customers.length; i++){
  customers[i] = temp2[i-1];
}




localStorage.array = JSON.stringify(customers);
delete_table();
GenerateTable();

}



function due_asc(a, b) {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] > b[3]) ? -1 : 1;
    }

}



function due_desc(a, b) {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] < b[3]) ? -1 : 1;
    }

}




function post_asc(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] > b[4]) ? -1 : 1;
    }

}




function post_desc(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] < b[4]) ? -1 : 1;
    }

}



function update_asc(a, b) {
    if (a[5] === b[5]) {
        return 0;
    }
    else {
        return (a[5] > b[5]) ? -1 : 1;
    }

}






function update_desc(a, b) {
    if (a[5] === b[5]) {
        return 0;
    }
    else {
        return (a[5] < b[5]) ? -1 : 1;
    }

}







