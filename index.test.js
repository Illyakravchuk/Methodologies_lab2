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
});
