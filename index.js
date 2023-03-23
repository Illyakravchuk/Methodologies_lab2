class List {
  #list = [];

  length() {
    return this.#list.length;
  }

  append(data) {
    if (typeof data !== 'string' || data.length !== 1) {
      throw new Error("Error. Wrong input data type, expected type char.");
    }
    this.#list.push(data);
  }

  insert(data, index) {
    if (typeof data !== 'string' || data.length !== 1) {
      throw new Error("Error. Wrong input data type, expected type char.");
    }
    if (index < 0 || index > this.#list.length) {
      throw new Error("Error. Incorrect index.");
    }
    this.#list.splice(index, 0, data);
  }

  delete(index) {
    if (index < 0 || index >= this.#list.length) {
      throw new Error("Error. Index out of range.");
    }
    return this.#list.splice(index, 1)[0];
  }

  deleteAll(data) {
    this.#list = this.#list.filter(element => element !== data);
  }

  get(index) {
    if (index < 0 || index >= this.#list.length) {
      throw new Error("Error. Index out of range.");
    }
    return this.#list[index];
  }

  clone() {
    const newList = new List();
    for (let i = 0; i < this.#list.length; i++) {
      newList.append(this.#list[i]);
    }
    return newList;
  }

  reverse() {
    this.#list.reverse();
  }

  findFirst(data) {
    return this.#list.indexOf(data);
  }

  findLast(data) {
    return this.#list.lastIndexOf(data);
  }

  clear() {
    this.#list.length = 0;
  }

  extend(list) {
    for (let i = 0; i < list.length(); i++) {
      this.#list.push(list.get(i));
    }
  }
}
  
module.exports = List;