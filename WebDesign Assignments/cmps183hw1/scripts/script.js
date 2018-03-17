

function completed() {
  var aObj=document.getElementsByTagName('tbody')[0].getElementsByTagName('tr'); 
  var i = document.getElementById("tblData").rows.length;

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

var aObj=document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
var i = document.getElementById("tblData").rows.length;
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





function to_all() {
  
var aObj=document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
var i = document.getElementById("tblData").rows.length; 
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







