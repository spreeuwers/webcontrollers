#webcontrollers

A super simple framework for micro frontends.
Add the init.js to you html page in the header.

After de page is loaded, the init.js script checks de html for elements 
with atrribute 'web-controller' and loads the specified controller class. 
It adds the controller methods and events to the corresponding elements.

In the class,you can specify a getHTML function as a template for html,
and define events in the controller class.
The framework binds the events and methods to the elements.

For example the method onclickButton1 will be bound to the
first button element in the element having the controller class.
A method named onclickButton_mybtn will be bound to an button with 
id mybtn.


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