class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  length() {
    return this.size;
  }

  append(data) {
    const isString = typeof data === 'string';
    if (isString && data.length === 1) {
      const node = new Node(data);
      if (!this.head) {
        this.head = node;
        this.tail = node;
        node.next = this.head;
      } else {
        this.tail.next = node;
        node.next = this.head;
        this.tail = node;
      }
      this.size++;
    } else {
      throw new Error('Error. Wrong input data type, expected type char.');
    }
  }

  insert(data, index) {
    if (typeof data !== 'string' || data.length !== 1) {
      throw new Error('Error. Wrong input data type, expected type char.');
    }
    if (index < 0 || index > this.size) {
      throw new Error('Error. Incorrect index.');
    }

    const node = new Node(data);

    if (this.size === 0) {
      this.head = node;
      this.tail = node;
      node.next = node;
    } else if (index === 0) {
      node.next = this.head;
      this.head = node;
      this.tail.next = node;
    } else if (index === this.size) {
      this.tail.next = node;
      this.tail = node;
      node.next = this.head;
    } else {
      let current = this.head;
      let i = 0;
      while (i < index - 1) {
        current = current.next;
        i++;
      }
      node.next = current.next;
      current.next = node;
    }
    this.size++;
  }

  delete(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Error. Index out of range.');
    }

    let deletedItem = null;

    if (this.size === 1) {
      deletedItem = this.head.data;
      this.head = null;
      this.tail = null;
    } else if (index === 0) {
      deletedItem = this.head.data;
      this.head = this.head.next;
      this.tail.next = this.head;
    } else {
      let current = this.head;
      let i = 0;

      while (i < index - 1) {
        current = current.next;
        i++;
      }

      deletedItem = current.next.data;
      current.next = current.next.next;

      if (index === this.size - 1) {
        this.tail = current;
      }
    }

    this.size--;
    return deletedItem;
  }

  deleteAll(data) {
    let current = this.head;
    let prev = this.tail;
    let i = 0;
    while (i < this.size) {
      if (current.data === data) {
        if (i === 0) {
          this.head = this.head.next;
          this.tail.next = this.head;
          prev = this.tail;
        } else {
          prev.next = current.next;
          if (i === this.size - 1) this.tail = prev;
        }
        this.size--;
        i--;
      } else {
        prev = current;
      }
      current = current.next;
      i++;
    }
  }

  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Error. Index out of range.');
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  clone() {
    const newList = new CircularList();
    let current = this.head;
    let i = 0;
    while (i < this.size) {
      newList.append(current.data);
      current = current.next;
      i++;
    }
    return newList;
  }

  reverse() {
    let current = this.head;
    let prev = this.tail;
    let i = 0;
    while (i < this.size) {
      const { next } = current;
      current.next = prev;
      prev = current;
      current = next;
      i++;
    }
    this.head = prev;
    if (this.size > 0) this.tail = this.head.next;
  }

  findFirst(data) {
    let current = this.head;
    let i = 0;
    while (i < this.size) {
      if (current.data === data) return i;
      current = current.next;
      i++;
    }
    return -1;
  }

  findLast(data) {
    let current = this.head;
    let i = 0;
    let lastIndex = -1;
    while (i < this.size) {
      if (current.data === data) lastIndex = i;
      current = current.next;
      i++;
    }
    return lastIndex;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  extend(list) {
    let current = list.head;
    let i = 0;
    while (i < list.size) {
      this.append(current.data);
      current = current.next;
      i++;
    }
  }
}

module.exports = CircularList;
