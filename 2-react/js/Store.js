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
    return this.storage.productData.filter(
      (product) => product.name.includes(keyword)
      );
  }
}
const store = new Store(storage);
export default store;