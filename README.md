#webcontrollers

A super simple framework for micro frontends.
Add the init.js to you html page in the header.

Load from:"https://unpkg.com/webcontrollers"

After the page is loaded, the init.js script checks the html for elements 
with atrribute 'web-controller' and loads the specified controller class. 
It adds the controller methods and events to the corresponding elements.

In the controllers classes, you can specify a getHTML function 
as a template for html, and also define events and methods.
The framework binds the events and methods to the elements and inserts
the return value of the getHtml() method into the element innrHTML.

For example the method onclickButton1 will be bound to the
first button element in the element having the controller class.
A method named onclickButton_mybtn will be bound to an button with 
id mybtn.

All the elements having the web-controller attribute are added to a global 
object variable named app. They can be referenced by id as property of app.


Example:
--------------------------------
mycontroller.js:\

    export class MyController {
    
       getHtml(){
          return `<button>${this.message}</button>`;
       }
       
       init(){
          this.message="click me!";
          this.style.backgroundColor="yellow";
          this.style.border="1px solid black";
          this.style.padding="1em";
          
          
       }
       onclickButton1(){
          this.message="clicked me!";
          this.refresh();
       }
    }

index.html:

    <!DOCTYPE html>
    <html lang="en">
     <head>
       <script src="init.js"></script>
     </head>
     <body>
       
       <div web-controller="MyController.js"></div>
       
     </body>
    </html>
    
The init.js file recursively adds controllers. If a controller defines
html content for the element, this html will in turn be checked 
for web-controller attributes on so on. 

In a controller event this.refresh() can be invoked to update the elements
inner HTML. When this.refresh is processed the getHtml() method will 
be invoked to render the updated content. 

The getHtml method may also return a promise, for example:  


    async getHtml(){
       const response = await fetch(`${window.location.hash.replace('#','')}.html`);
       return response.text();
    }

This way external template files can be (re)used.