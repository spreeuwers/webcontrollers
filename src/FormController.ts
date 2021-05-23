/**
 * Created by eddyspreeuwers on 5/16/21.
 */



export class FormController {

    public firstname: HTMLFormElement;
    public lastname: HTMLFormElement;

    init(){
       //this.getElementsByTagName('label');
        this.firstname.value = "John";
        this.lastname.value = "Doe";
    }

}