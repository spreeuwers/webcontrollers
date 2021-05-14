/**
 * Created by eddyspreeuwers on 5/5/21.
 */
export class InputController {


   getHtml(){
        return `
            <H2>webcontroller ${this.id}</H2>
            <p>${this.firstname}</p>
            <input id="input${this.id}" type="text" name='text' placeholder="type som text" name="firstname" value="${this.firstname}">
            <br><br>
        `;

   }
   constructor (){

   }

   init(){

       console.log('init');
       this.style.border = "1px solid black";
       this.style.marginTop = "1em";
       this.style.padding = "1em";
       this.firstname = 'Eddy';
       //this.innerHTML = `<H2>webcontroller ${this.id}</H2>` ;
       //alert(window.app.wc2.innerHTML);
   }

    onclick(event){
       //alert(`hi from ${this.id} ` + window.app.wc1.innerHTML);
    }

    onkeyupInput1(event){
      this.firstname = event.srcElement.value;
      this.refresh();


    }


    onresize(){

    }
}
