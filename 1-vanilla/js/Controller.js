const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView, searchResultView, tabView}) {
    console.log(tag, "constructor");
    this.store = store;
    
    //내부 변수
    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;

    //이벤트 처리
    this.subscribeViewEvents();

    //렌더링
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on('@submit', event => this.search(event.detail.value))
      .on('@reset', event => this.reset());
      
    this.tabView.on("@change", event => this.changeTab(event.detail.value));
  }

  search(keyword) {
    console.log(tag,`search(${keyword})`);

    this.store.search(keyword);
    this.render();
  }
  reset(){
    console.log(tag,"reset()");
    this.store.searchKeyword = "";
    this.store.searchResult=[];
    this.render();
  }
  changeTab(tab) {
    console.log(tag,"changeTab",tab);
    this.store.selectedTab = tab;
    this.render();
  }


  // 컨트롤러가 관리하고 있는 뷰들을 이용해서 화면에 출력하는 기능
  // 어떨 땐 검색결과가 보이고, 어떨 땐 숨겨야 한다.
  render() {
    //검색어를 입력했을 때, 해당 검색어 결과 보이기.
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }
    // 검색결과 없을때 결과화면 hide, 탭 show
    this.searchResultView.hide();
    this.tabView.show(this.store.selectedTab);
  }
  renderSearchResult() {
    this.tabView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
  
}
