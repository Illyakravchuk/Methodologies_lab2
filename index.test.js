const CircularList = require('./index.js');

describe('CircularList', () => {
  describe('length()', () => {
    it('should return 0 for an empty list', () => {
      const list = new CircularList();
      expect(list.length()).toEqual(0);
    });

    it('should return the correct length for a non-empty list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.length()).toEqual(3);
    });

    it('should return 1 for a list with a single element', () => {
      const list = new CircularList();
      list.append('a');
      expect(list.length()).toEqual(1);
    });
  });

  describe('append()', () => {
    it('should append a node to an empty list', () => {
      const list = new CircularList();
      list.append('A');
      expect(list.length()).toBe(1);
      expect(list.head.data).toBe('A');
      expect(list.head.next).toBe(list.head);
    });

    it('should append a node to a non-empty list', () => {
      const list = new CircularList();
      list.append('A');
      list.append('B');
      expect(list.length()).toBe(2);
      expect(list.head.data).toBe('A');
      expect(list.tail.data).toBe('B');
      expect(list.head.next.data).toBe('B');
      expect(list.tail.next).toBe(list.head);
    });

    it('should throw an error when given non-character data', () => {
      const list = new CircularList();
      expect(() => {
        list.append(1);
      }).toThrow('Error. Wrong input data type, expected type char.');
      expect(list.length()).toBe(0);
      expect(list.head).toBe(null);
      expect(list.tail).toBe(null);
    });

    it('should throw an error when given a string with more than one character', () => {
      const list = new CircularList();
      expect(() => {
        list.append('ab');
      }).toThrow('Error. Wrong input data type, expected type char.');
      expect(list.length()).toBe(0);
      expect(list.head).toBe(null);
      expect(list.tail).toBe(null);
    });
  });
  describe('insert()', () => {
    it('should insert a new element at index 0', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      list.insert('y', 0);
      expect(list.get(0)).toBe('y');
      expect(list.get(1)).toBe('a');
      expect(list.get(2)).toBe('b');
      expect(list.get(3)).toBe('c');
    });

    it('should insert a new element at the end of the list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      list.insert('y', 3);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
      expect(list.get(2)).toBe('c');
      expect(list.get(3)).toBe('y');
    });

    it('should insert a new element in the middle of the list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      list.insert('y', 1);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('y');
      expect(list.get(2)).toBe('b');
      expect(list.get(3)).toBe('c');
    });

    it('should throw an error if index is negative', () => {
      const list = new CircularList();
      expect(() => {
        list.insert('y', -1);
      }).toThrow('Error. Incorrect index.');
    });

    it('should throw an error if index is greater than the list size', () => {
      const list = new CircularList();
      list.append('a');
      expect(() => {
        list.insert('y', 2);
      }).toThrow('Error. Incorrect index.');
    });

    it('should throw an error if the input data type is not a string of length 1', () => {
      const list = new CircularList();
      expect(() => {
        list.insert('abc', 0);
      }).toThrow('Error. Wrong input data type, expected type char.');

      expect(() => {
        list.insert(null, 0);
      }).toThrow('Error. Wrong input data type, expected type char.');

      expect(() => {
        list.insert(123, 0);
      }).toThrow('Error. Wrong input data type, expected type char.');

      expect(() => {
        list.insert({}, 0);
      }).toThrow('Error. Wrong input data type, expected type char.');
    });
  });
  describe('delete()', () => {
    it('removes the first item from the list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      const deleted = list.delete(0);
      expect(deleted).toBe('a');
      expect(list.length()).toBe(2);
      expect(list.get(0)).toBe('b');
      expect(list.get(1)).toBe('c');
    });

    it('removes the last item from the list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      const deleted = list.delete(2);
      expect(deleted).toBe('c');
      expect(list.length()).toBe(2);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
    });

    it('removes an item from the middle of the list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      const deleted = list.delete(1);
      expect(deleted).toBe('b');
      expect(list.length()).toBe(2);
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('c');
    });

    it('throws an error if the index is out of range', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      expect(() => list.delete(3)).toThrowError('Error. Index out of range.');
      expect(() => list.delete(-1)).toThrowError('Error. Index out of range.');
    });

    it('throws an error if the list is empty', () => {
      const emptyList = new CircularList();
      expect(() => emptyList.delete(0)).toThrowError('Error. Index out of range.');
    });
  });

  describe('deleteAll', () => {
    it('should delete all nodes with the specified data from the list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      list.append('a');
      list.append('d');
      list.append('a');
      list.deleteAll('a');
      expect(list.length()).toEqual(3);
      expect(list.get(0)).toEqual('b');
      expect(list.get(1)).toEqual('c');
      expect(list.get(2)).toEqual('d');
    });

    it('should delete all nodes with the specified data from the list, including the head and tail nodes', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('a');
      list.deleteAll('a');
      expect(list.length()).toEqual(1);
      expect(list.get(0)).toEqual('b');
      expect(list.tail.data).toEqual('b');
      expect(list.head.data).toEqual('b');
    });

    it('should do nothing if the list is empty', () => {
      const list = new CircularList();
      list.deleteAll('a');
      expect(list.length()).toEqual(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    it('should do nothing if the specified data is not in the list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.deleteAll('c');
      expect(list.length()).toEqual(2);
      expect(list.get(0)).toEqual('a');
      expect(list.get(1)).toEqual('b');
    });
  });

  describe('get()', () => {
    it('gets the data at the specified index', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.get(0)).toBe('a');
      expect(list.get(1)).toBe('b');
      expect(list.get(2)).toBe('c');
    });

    it('throws an error when the index is out of range', () => {
      const list = new CircularList();
      expect(() => list.get(-1)).toThrow('Error. Index out of range.');
      expect(() => list.get(0)).toThrow('Error. Index out of range.');
      list.append('a');
      expect(() => list.get(1)).toThrow('Error. Index out of range.');
    });
  });

  describe('clone', () => {
    it('clones an empty list', () => {
      const list = new CircularList();
      const clonedList = list.clone();
      expect(clonedList.length()).toEqual(0);
    });

    it('clones a non-empty list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      const clonedList = list.clone();
      expect(clonedList.get(0)).toEqual('a');
      expect(clonedList.get(1)).toEqual('b');
    });
  });

  describe('reverse', () => {
    it('reverses an empty list', () => {
      const list = new CircularList();
      list.reverse();
      expect(list.length()).toEqual(0);
    });

    it('reverses a list with one item', () => {
      const list = new CircularList();
      list.append('a');
      list.reverse();
      expect(list.get(0)).toEqual('a');
    });

    it('reverses a list with multiple items', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      list.reverse();
      expect(list.get(0)).toEqual('c');
      expect(list.get(1)).toEqual('b');
      expect(list.get(2)).toEqual('a');
    });
  });

  describe('findFirst', () => {
    it('returns -1 for empty list', () => {
      const list = new CircularList();
      expect(list.findFirst('a')).toBe(-1);
    });
    it('returns -1 if element is not found', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.findFirst('d')).toBe(-1);
    });
    it('returns the index of the first occurrence of the element', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.findFirst('b')).toBe(1);
    });
  });

  describe('findLast', () => {
    it('returns -1 for empty list', () => {
      const list = new CircularList();
      expect(list.findLast('a')).toBe(-1);
    });
    it('returns -1 if element is not found', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.findLast('d')).toBe(-1);
    });
    test('returns the index of the last occurrence of the element', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('b');
      expect(list.findLast('b')).toBe(2);
    });
  });

  describe('clear()', () => {
    it('should clear the list', () => {
      const list = new CircularList();
      list.append('a');
      list.append('b');
      list.append('c');
      expect(list.size).toBe(3);
      list.clear();
      expect(list.size).toBe(0);
      expect(list.head).toBe(null);
      expect(list.tail).toBe(null);
    });
  });
  describe('extend()', () => {
    let linkedList;

    it('should take another list and add its elements to the current list', () => {
      linkedList = new CircularList();
      linkedList.append('a');
      linkedList.append('b');
      linkedList.append('c');
      const linkedList_2 = new CircularList();
      linkedList_2.append('x');
      linkedList_2.append('y');
      linkedList_2.append('z');

      linkedList_2.extend(linkedList);

      expect(linkedList_2.length()).toBe(6);

      expect(linkedList_2.get(0)).toBe('x');
      expect(linkedList_2.get(1)).toBe('y');
      expect(linkedList_2.get(2)).toBe('z');
      expect(linkedList_2.get(3)).toBe('a');
      expect(linkedList_2.get(4)).toBe('b');
      expect(linkedList_2.get(5)).toBe('c');
    });

    it('the lists must be independent', () => {
      linkedList = new CircularList();
      linkedList.append('a');
      linkedList.append('b');
      linkedList.append('c');
      const linkedList_2 = new CircularList();

      linkedList_2.extend(linkedList);

      linkedList_2.delete(0);

      expect(linkedList.length()).toBe(3);
      expect(linkedList_2.length()).toBe(2);
      linkedList_2.append('z');
      expect(linkedList.get(2)).toBe('c');
      expect(linkedList_2.get(2)).toBe('z');
    });
  });
});
