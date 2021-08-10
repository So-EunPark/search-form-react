const tag = "[store]";
console.log(tag);
export default class Store {
  
  constructor(storage) {
    if (!storage) throw "no storage";

    this.storage = storage;
  }
}
