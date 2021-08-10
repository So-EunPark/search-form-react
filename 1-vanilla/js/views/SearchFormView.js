import View from "./View.js";
import { emit, on, qs } from "../helpers.js";

const tag = "[searchFormView]";
export default class SearchFormView extends View {
    //생성자 함수
    constructor() {
        super(qs("#search-form-view"));

        this.inputElement = qs("[type=text]", this.element);
        this.resetElement = qs("[type=reset]", this.element);
        this.showResetButton(false);
        this.bindEvents();
    };

    showResetButton(visible = true) {
        this.resetElement.style.display = visible ? "block" : "none";
    };

    bindEvents(){
        on(this.inputElement, "keyup", ()=>{
            this.handleKeyup();
        });
        on(this.element, "submit", event => {
            this.handleSubmit(event)
        });

        //Todo
        this.on("reset", ()=>{this.handleReset()});
    }

    handleKeyup(){
        console.log(tag,"handelKeyup",this.inputElement.value);
        const {value} = this.inputElement;
        this.showResetButton(value.length > 0);

        //Todo 
        if (value.length == 0){
            this.handleReset();
        }

    }

    handleSubmit(event){
        event.preventDefault();
        console.log(tag,"handleSubmit");
        const {value} = this.inputElement;
        this.emit("@submit", {value});
    }

    handleReset() {
        console.log(tag,"handleReset");
        this.emit('@reset');
    }
}