/**
 * Created by eddyspreeuwers on 5/5/21.
 */
export class RouterController {


    async getHtml() {
        //console.log(this.page, this.id, window.location.href);
        if (window.location.hash) {
            const response = await fetch(`${window.location.hash.replace('#', '')}.html`);
            return response.text();
        }
        return '';
    }


   init(){
       this.style.border = "1px solid black";
       this.style.marginTop = "1em";
       this.style.padding = "1em";
       this.style.overflow="scroll";
       this.style.height="5em";


       window.addEventListener('hashchange', (h) => {
           this.refresh();
       });
   }


}
