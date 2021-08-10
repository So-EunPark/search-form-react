import View from "./View.js";
import { on, qs } from "../helpers.js";

const tag = "searchFormView";
export default class SearchFormView extends View {
    //생성자 함수
    constructor() {
        super(qs("#search-form-view"));

        this.inputElement = qs("[type=text]", this.element);
        this.resetElement = qs("[type=reset]", this.element);
        this.showResetButton(false);
        this.bindEvent();
    };

    showResetButton(visible = true) {
        this.resetElement.style.display = visible ? "block" : "none";
    };

    bindEvent(){
        on(this.inputElement, "keyup", ()=>{
            this.handleKeyup();
        })
    }

    handleKeyup(){
        console.log(tag,"handelKeyup",this.inputElement.value)
        const {value} = this.inputElement;
        this.showResetButton(value.length > 0);
    }
}