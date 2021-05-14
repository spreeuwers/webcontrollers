#webcontrollers

super simple framework for micro frontends
Add the init.js to you html page in the header.

After de page is loaded, the init.js iffi checks de html for elements with atrribute 'js-class' 
and adds a corresponding controller methods and events to the elements.


you can specify a getHTML function as a template
and define events in the controller class.

 
The framework binds the events and methods to the elements.

for example the method onclickButton1 will be bound to the
first button element in the element having the controller class.

