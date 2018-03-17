




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

<form action="/delete/{{no}}" method="GET" style="border:1px solid #ccc">
 <h1>Are you sure you want to delete the task ?</h1>
       <input type="submit" name="save" value="OK">

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