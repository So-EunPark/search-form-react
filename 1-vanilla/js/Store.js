import { createNextId } from "./helpers.js";
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
    //선택된 탭
    this.selectedTab = TabType.KEYWORD;
  }
  //searchKeyword에 해당하는 상품을 검색할 수 있어야 함.
  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(
      (product) => product.name.includes(keyword));
    this.addHistory(keyword);
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  // 데이터베이스에서 history데이터를 날짜순으로 정렬해서 가져오기
  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }

  //정렬 메소드 -> 솔직히 이해안됨.
  _sortHistory(history1, history2){
    return history2.date - history1.date;
  }

  //지울 키워드를 받아서 데이터베이스의 historyData 갱신
  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== keyword)
  }

  addHistory(keyword) {
    keyword = keyword.trim();
    if (! keyword) {
      return ;
    }
    const hasHistory = this.storage.historyData.some(history => history.keyword === keyword);
    if (hasHistory) {
      this.removeHistory(keyword);
    }
    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({id,keyword,date});
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }
}