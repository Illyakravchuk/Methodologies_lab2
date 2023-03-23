const LinkedList = require('./index');

const List = new LinkedList();

List.append('a');
List.append('b');
List.append('c');
List.append('d');
List.append('b');
List.append('c');
List.append('b');


console.log('we will get the length of the linked list =', List.length());
console.log('We will get the 2nd item from the linked list =', List.get(2));
console.log('We will get the 4th item from the linked list =', List.get(4));
console.log('We will get the 6th item from the linked list =', List.get(6));

List.insert('e', 3);
console.log('we will get the inserted element =', List.get(3));
console.log('we will get the current length of the linked list =', List.length());

List.delete(0);
console.log('we will get a new first element of the linked list =', List.get(0));
console.log('we will get the current length of the linked list =', List.length());

List.deleteAll('b');
console.log('we will get a new first element of the linked list =', List.get(0));
console.log('we will get the current length of the linked list =', List.length());

console.log('we will get the elements of the linked list =', List.get(0), List.get(1), List.get(2), List.get(3));
const List2 = List.clone();
console.log('we will get the length of the cloned linked list =', List2.length());
console.log('we will get the elements of cloned linked list =', List2.get(0), List2.get(1), List2.get(2), List2.get(3));


List2.reverse();
console.log('we will get the reversed second linked list elements =', List2.get(0), List2.get(1), List2.get(2), List2.get(3));
console.log('we will get the first linked list without changes =', List.get(0), List.get(1), List.get(2), List.get(3));
List.insert('g', 4);


console.log('we will get the first element of the linked list =', List.findFirst('c'));
console.log('we will get the second element of the linked list =', List.findLast('g'));

List2.clear();
console.log('we will get the length of the second linked list after cleaning =', List2.length());

const List3 = new LinkedList();
List3.append('q');
List3.append('f');
List3.append('j');
List3.append('k');
console.log('we will get the length of the first linked list =', List.length());
console.log('we will get the length of the third linked list =', List3.length());
List.extend(List3);
console.log('we will get the first linked list to which we have added the third =', List.length());
