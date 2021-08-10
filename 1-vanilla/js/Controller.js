const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView}) {
    console.log(tag);
    this.store = store;
    
    this.searchFormView = searchFormView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on('@submit', event => this.search(event.detail.value))
      .on('@reset', event => this.reset(event.detail));
  }

  search(keyword) {
    console.log(tag,keyword);
  }
  reset(){
    console.log(tag,"reset()");
  }
}
