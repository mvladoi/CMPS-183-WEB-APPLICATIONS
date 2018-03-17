

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/css/style.css" type="text/css" />
  
  </head>
<body>

<div class="container">

  <header>
    Cmps183: Homework 3
 </header>
   
 <ul>
   <li><a class="active" href="/index">Home</a></li>
   <li><a href="/list" >To Do List</a></li>
   <li><a href="/new">New Task </a></li>
 </ul>    
  


<nav>
  
  <p>Notes:</p>
  <p>It took me some time how to make this work.
  I did not know how to hide rows.  
  I used this 
  site to help me:</p>
<a href="https://www.w3schools.com/" target="_blank">Visit W3Schools!</a>
<p>Try it Yourself.I tested with CHROME, I hope it works!
 </p>
 <p>To run:</p>  <p>python database.py; </p> <p>python controller.py </p>

    
</nav>



<div>
 <td><button style = "width:140px"> <a href="/posted_asc">Posted ASC</a> </button></td> 
 <td><button style = "width:140px"> <a href="/update_asc">Updated ASC</a> </button></td> 
 <td><button style = "width:140px"> <a href="/duedate_asc">Due Date ASC</a> </button></td> 

 <td><button style = "width:140px"> <a href="/posted_desc">Posted DESC</a> </button></td> 
 <td><button style = "width:140px"> <a href="/update_desc">Updated DESC</a> </button></td> 
 <td><button style = "width:140px"> <a href="/duedate_desc">Due Date DESC</a> </button></td> 
</div>
  


 <div>  
 <td><button style = "width:140px"> <a href="/all">All</a> </button></td> 
<td><button style = "width:140px"> <a href="/completed">Done</a> </button><td>
<td><button style = "width:140px" > <a href="/progress">ToDo</a> </button><td>
</div>

<article id = "myTable" >

  <table border="1">

   <tr>
   <th> Status </th>
  <th> Task Title</th>
  <th> Notes</th>
  <th> Due Date</th>
  <th> Posted</th> 
  <th> Last Updated</td>
  <th> Features</td> 
  
  </tr>

  
%for row in rows:
 %var = 0
  <tr>
  %for col in row:
    %if var == 0: 
      %id = col     
          <td><button style = "width:40px "> <a href="/check/{{id}}"> yes </a> </button>
          <button style = "width:40px "> <a href="/uncheck/{{id}}">no</a> </button></td> 
    %else:
     <td>{{col}}</td>
    %end 
    %var = var+1
  %end
  <td><button> <a href="/edit/{{id}}">Edit</a> </button>
        <button> <a href="/delete/{{id}}">Delete</a> </button></td>      
  </tr>
 
%end
</table>

</article>    


<footer>
  <a class="active" href="#">About Us</a>
  <a href="#">Contact</a>
  <a href="#">Privacy</a>
  <a href="#">Credits</a>
</footer>


</div>

</body>
</html>



  



