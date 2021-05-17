/**
 * Created by eddyspreeuwers on 5/17/21.
 */

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
