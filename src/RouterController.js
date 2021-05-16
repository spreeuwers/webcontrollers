/**
 * Created by eddyspreeuwers on 5/5/21.
 */
export class RouterController {


   async getHtml(){
        //console.log(this.page, this.id, window.location.href);
        const response = await fetch(`${this.page.replace('#','')}.html`);
        return response.text();
   }


   init(){
       this.style.border = "1px solid black";
       this.style.marginTop = "1em";
       this.style.padding = "1em";
       this.page=window.location.hash || 'page1';
       window.addEventListener('hashchange', (h) => {
           this.page = window.location.hash.replace('#','');
           //console.log(this.page,this.id);
           this.refresh();
       });
   }


}
