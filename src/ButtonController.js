/**
 * Created by eddyspreeuwers on 5/5/21.
 */
export class ButtonController {

    button1(){
        return this.getElementsByTagName('button')[0];
    }

    onclickButton1(){
      this.button1().innerHTML = 'clicked!';
    }

}
