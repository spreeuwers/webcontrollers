#webcontrollers

A super simple framework for micro frontends.
Add the init.js to you html page in the header.

After de page is loaded, the init.js iffi checks de html for elements 
with atrribute 'web-controller' 
and adds a corresponding controller methods and events to the elements.


You can specify a getHTML function in the class as a template
and define events in the controller class.

 
The framework binds the events and methods to the elements.

for example the method onclickButton1 will be bound to the
first button element in the element having the controller class.


Example:
--------------------------------
mycontroller.js:\

export class MyController {
   onclick(){
     alert('hi');
   }
}

index.html:

<!DOCTYPE html>
<html lang="en">
<head>
    <script src="init.js"></script>
</head>
<body>
  <button web-controller="MyController.js"></button>
</body>
</html>