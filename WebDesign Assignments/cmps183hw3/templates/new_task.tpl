
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/css/style.css" type="text/css" />
   <script type="text/javascript" src="scripts/script.js"></script>
</head>
<body>

<div class="container">

<header>
   Cmps183: Homework 3
</header>
  
<ul>
  <li><a class="active" href="/index">Home</a></li>
  <li><a href="/list" >To Do List</a></li>
  <li><a href="/new">New Task</a></li>
</ul>
  


<nav>
  
  <p>Notes:</p>
  <p>I check for the dates not to be in the past.  
  I used this 
  site to help me:</p>
<a href="https://www.w3schools.com/" target="_blank">Visit W3Schools!</a>
<p>Try it Yourself.
I tested with CHROME, I hope it works! </p>
<p>To run:</p>  <p>python database.py; </p> <p>python controller.py </p>
    
</nav>

<article>
  
<form action="/new" method="GET" style="border:1px solid #ccc">
    <h1>New Task </h1>
  
  <table>
    <tr>
      <td align="right">Task Title:</td>
      <td align="left"><input  id = "task" type="text" name="task"  size="45" /></td>
    </tr>
    <tr>
      <td align="right">Notes:</td>
      <td align="left"><input id="notes" type="text" name ="job" size="45"  /></td>
    </tr>
    <tr>
      <td align="right">Due Date</td>
      <td> <input id="date" onchange="checkDate()"  required class="datepicker-input" name="date" type="date" size ="45" /></td>

    </tr>
  </table>

    
       <input type="submit" name="save" value="save">
   
  </div>
</form>


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