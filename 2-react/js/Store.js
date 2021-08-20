import { createNextId } from "./helpers.js";
import storage from "./storage.js";

const tag = "[store]";
console.log(tag);

class Store {
  constructor(storage) {
    if (!storage) throw "no storage";

    this.storage = storage;
  }
  //searchKeyword에 해당하는 상품을 검색할 수 있어야 함.
  search(keyword) {
    this.addHistory(keyword);
    return this.storage.productData.filter((product) =>
      product.name.includes(keyword)
    );
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  //날짜의 역순으로 반환해줘야한다.
  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(history1, history2) {
    return history2.date - history1.date;
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== keyword
    );
  }

  addHistory(keyword = "") {
    keyword = keyword.trim();

    if (!keyword) {
      return;
    }

    const hasHistory = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );

    if (hasHistory) {
      this.removeHistory(keyword);
    }
    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({ id, keyword, date });
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }
}
const store = new Store(storage);
export default store;
