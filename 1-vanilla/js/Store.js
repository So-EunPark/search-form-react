import { TabType } from "./views/TabView.js";

const tag = "[store]";
console.log(tag);
export default class Store {
  
  constructor(storage) {
    if (!storage) throw "no storage";

    this.storage = storage;

    //검색어 빈문자열로 초기화
    this.searchKeyword = "";
    //검색 결과
    this.searchResult = [];

    this.selectedTab = TabType.KEYWORD;
  }
  //searchKeyword에 해당하는 상품을 검색할 수 있어야 함.
  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(
      (product) => product.name.includes(keyword));
  }
}