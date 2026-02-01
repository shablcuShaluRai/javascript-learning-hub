# Array Methods in JavaScript

## Table of Contents
1. [What are Array Methods?](#what-are-array-methods)
2. [Iteration Methods](#iteration-methods)
3. [Transformation Methods](#transformation-methods)
4. [Search & Filter Methods](#search--filter-methods)
5. [Mutating Methods](#mutating-methods)
6. [Reducing Methods](#reducing-methods)
7. [Other Useful Methods](#other-useful-methods)
8. [Interview Questions](#interview-questions)
9. [Common Pitfalls](#common-pitfalls)
10. [Best Practices](#best-practices)

---

## What are Array Methods?

**Definition**: Array methods are built-in functions that allow you to perform operations on arrays without writing manual loops.

**Simple Explanation**: Think of array methods as powerful tools that help you search, transform, filter, and manipulate arrays easily.

```javascript
// Without array methods (manual loop)
let numbers = [1, 2, 3, 4, 5];
let doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
console.log(doubled);  // [2, 4, 6, 8, 10]

// With array methods (clean & readable)
let doubled2 = numbers.map(num => num * 2);
console.log(doubled2);  // [2, 4, 6, 8, 10]
```

---

## Iteration Methods

Methods that loop through array elements.

### forEach()

Executes a function for each array element. Does not return a new array.

```javascript
let fruits = ["apple", "banana", "orange"];

// Basic usage
fruits.forEach(fruit => {
  console.log(fruit);
});
// Output: "apple", "banana", "orange"

// With index
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// Output: "0: apple", "1: banana", "2: orange"

// With index and array
fruits.forEach((fruit, index, array) => {
  console.log(`${fruit} is at index ${index} in array of ${array.length}`);
});

// Practical example: Update DOM elements
let prices = [10, 20, 30];
prices.forEach((price, index) => {
  console.log(`Item ${index + 1}: $${price}`);
});
```

**Key points:**
- Returns `undefined`
- Cannot break or continue
- Use for side effects (logging, updating DOM, etc.)

---

## Transformation Methods

Methods that transform arrays into new arrays.

### map()

Creates a new array by transforming each element.

```javascript
let numbers = [1, 2, 3, 4, 5];

// Double each number
let doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// Square each number
let squared = numbers.map(num => num ** 2);
console.log(squared);  // [1, 4, 9, 16, 25]

// Extract property from objects
let users = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];

let names = users.map(user => user.name);
console.log(names);  // ["John", "Alice", "Bob"]

// Create HTML elements
let items = ["Apple", "Banana", "Orange"];
let listItems = items.map(item => `<li>${item}</li>`);
console.log(listItems);
// ["<li>Apple</li>", "<li>Banana</li>", "<li>Orange</li>"]

// With index
let withIndex = numbers.map((num, index) => `${index}: ${num}`);
console.log(withIndex);  // ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]
```

**Key points:**
- Returns a new array
- Original array unchanged
- Array length remains same

---

## Search & Filter Methods

Methods for finding and filtering elements.

### filter()

Creates a new array with elements that pass a test.

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

// Get numbers greater than 5
let greaterThan5 = numbers.filter(num => num > 5);
console.log(greaterThan5);  // [6, 7, 8, 9, 10]

// Filter objects
let users = [
  { name: "John", age: 30, active: true },
  { name: "Alice", age: 25, active: false },
  { name: "Bob", age: 35, active: true }
];

let activeUsers = users.filter(user => user.active);
console.log(activeUsers);
// [{ name: "John", age: 30, active: true }, { name: "Bob", age: 35, active: true }]

let adults = users.filter(user => user.age >= 30);
console.log(adults);
// [{ name: "John", age: 30, active: true }, { name: "Bob", age: 35, active: true }]

// Combining conditions
let activeAdults = users.filter(user => user.active && user.age >= 30);
console.log(activeAdults);
// [{ name: "John", age: 30, active: true }, { name: "Bob", age: 35, active: true }]

// Remove duplicates
let numbersWithDupes = [1, 2, 2, 3, 3, 3, 4];
let unique = numbersWithDupes.filter((num, index, array) => {
  return array.indexOf(num) === index;
});
console.log(unique);  // [1, 2, 3, 4]
```

### find()

Returns the first element that passes a test.

```javascript
let numbers = [1, 2, 3, 4, 5];

// Find first even number
let firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven);  // 2

// Find object
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
  { id: 3, name: "Bob" }
];

let user = users.find(user => user.id === 2);
console.log(user);  // { id: 2, name: "Alice" }

// Returns undefined if not found
let notFound = users.find(user => user.id === 999);
console.log(notFound);  // undefined
```

### findIndex()

Returns the index of the first element that passes a test.

```javascript
let numbers = [1, 2, 3, 4, 5];

let index = numbers.findIndex(num => num > 3);
console.log(index);  // 3 (index of 4)

// With objects
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" }
];

let userIndex = users.findIndex(user => user.name === "Alice");
console.log(userIndex);  // 1

// Returns -1 if not found
let notFound = users.findIndex(user => user.id === 999);
console.log(notFound);  // -1
```

### indexOf() & lastIndexOf()

Find index of a value.

```javascript
let fruits = ["apple", "banana", "orange", "banana"];

// indexOf - first occurrence
console.log(fruits.indexOf("banana"));  // 1
console.log(fruits.indexOf("grape"));   // -1 (not found)

// lastIndexOf - last occurrence
console.log(fruits.lastIndexOf("banana"));  // 3

// With start position
console.log(fruits.indexOf("banana", 2));  // 3 (starts searching from index 2)
```

### includes()

Checks if array contains a value.

```javascript
let fruits = ["apple", "banana", "orange"];

console.log(fruits.includes("banana"));  // true
console.log(fruits.includes("grape"));   // false

// With start position
console.log(fruits.includes("apple", 1));  // false (starts from index 1)

// Works with primitives, not objects
let numbers = [1, 2, 3];
console.log(numbers.includes(2));  // true
```

### some()

Tests if at least one element passes.

```javascript
let numbers = [1, 2, 3, 4, 5];

// Check if any number is even
let hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);  // true

// Check if any number > 10
let hasLarge = numbers.some(num => num > 10);
console.log(hasLarge);  // false

// With objects
let users = [
  { name: "John", age: 17 },
  { name: "Alice", age: 25 }
];

let hasAdult = users.some(user => user.age >= 18);
console.log(hasAdult);  // true
```

### every()

Tests if all elements pass.

```javascript
let numbers = [2, 4, 6, 8];

// Check if all are even
let allEven = numbers.every(num => num % 2 === 0);
console.log(allEven);  // true

// Check if all > 5
let allLarge = numbers.every(num => num > 5);
console.log(allLarge);  // false

// Validation
let users = [
  { name: "John", age: 25 },
  { name: "Alice", age: 30 }
];

let allAdults = users.every(user => user.age >= 18);
console.log(allAdults);  // true
```

---

## Mutating Methods

Methods that modify the original array.

### push() & pop()

Add/remove from end.

```javascript
let fruits = ["apple", "banana"];

// push - add to end
fruits.push("orange");
console.log(fruits);  // ["apple", "banana", "orange"]

// Can add multiple
fruits.push("grape", "mango");
console.log(fruits);  // ["apple", "banana", "orange", "grape", "mango"]

// pop - remove from end
let last = fruits.pop();
console.log(last);    // "mango"
console.log(fruits);  // ["apple", "banana", "orange", "grape"]
```

### unshift() & shift()

Add/remove from beginning.

```javascript
let fruits = ["banana", "orange"];

// unshift - add to beginning
fruits.unshift("apple");
console.log(fruits);  // ["apple", "banana", "orange"]

// Can add multiple
fruits.unshift("kiwi", "mango");
console.log(fruits);  // ["kiwi", "mango", "apple", "banana", "orange"]

// shift - remove from beginning
let first = fruits.shift();
console.log(first);   // "kiwi"
console.log(fruits);  // ["mango", "apple", "banana", "orange"]
```

### splice()

Add/remove elements at any position.

```javascript
let fruits = ["apple", "banana", "orange", "grape"];

// Remove elements
// splice(startIndex, deleteCount)
fruits.splice(1, 2);  // Remove 2 elements starting at index 1
console.log(fruits);  // ["apple", "grape"]

// Add elements
fruits = ["apple", "banana", "orange"];
fruits.splice(1, 0, "kiwi", "mango");  // Add at index 1, delete 0
console.log(fruits);  // ["apple", "kiwi", "mango", "banana", "orange"]

// Replace elements
fruits = ["apple", "banana", "orange"];
fruits.splice(1, 1, "kiwi");  // Remove 1, add 1 at index 1
console.log(fruits);  // ["apple", "kiwi", "orange"]

// Returns removed elements
fruits = ["apple", "banana", "orange", "grape"];
let removed = fruits.splice(1, 2);
console.log(removed);  // ["banana", "orange"]
console.log(fruits);   // ["apple", "grape"]
```

### sort()

Sorts array in place.

```javascript
let numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// Default sort (converts to strings)
numbers.sort();
console.log(numbers);  // [1, 1, 2, 3, 4, 5, 6, 9]

// With compare function for numbers
numbers = [3, 1, 4, 1, 5, 9, 2, 6];
numbers.sort((a, b) => a - b);  // Ascending
console.log(numbers);  // [1, 1, 2, 3, 4, 5, 6, 9]

numbers.sort((a, b) => b - a);  // Descending
console.log(numbers);  // [9, 6, 5, 4, 3, 2, 1, 1]

// Sort strings
let fruits = ["banana", "apple", "orange", "kiwi"];
fruits.sort();
console.log(fruits);  // ["apple", "banana", "kiwi", "orange"]

// Sort objects
let users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];

users.sort((a, b) => a.age - b.age);  // Sort by age
console.log(users);
// [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }, { name: "Bob", age: 35 }]

users.sort((a, b) => a.name.localeCompare(b.name));  // Sort by name
console.log(users);
// [{ name: "Alice", age: 25 }, { name: "Bob", age: 35 }, { name: "Charlie", age: 30 }]
```

### reverse()

Reverses array in place.

```javascript
let numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers);  // [5, 4, 3, 2, 1]

let fruits = ["apple", "banana", "orange"];
fruits.reverse();
console.log(fruits);  // ["orange", "banana", "apple"]
```

---

## Reducing Methods

Methods that reduce array to a single value.

### reduce()

Reduces array to a single value.

```javascript
let numbers = [1, 2, 3, 4, 5];

// Sum all numbers
let sum = numbers.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);  // 0 is initial value
console.log(sum);  // 15

// Shorthand
let sum2 = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum2);  // 15

// Product
let product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log(product);  // 120

// Find maximum
let max = numbers.reduce((acc, curr) => curr > acc ? curr : acc);
console.log(max);  // 5

// Count occurrences
let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
let count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count);  // { apple: 3, banana: 2, orange: 1 }

// Flatten array
let nested = [[1, 2], [3, 4], [5, 6]];
let flattened = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log(flattened);  // [1, 2, 3, 4, 5, 6]

// Group by property
let users = [
  { name: "John", age: 25 },
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
];

let grouped = users.reduce((acc, user) => {
  let age = user.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(user);
  return acc;
}, {});
console.log(grouped);
// { 25: [{ name: "John", age: 25 }, { name: "Bob", age: 25 }], 30: [{ name: "Alice", age: 30 }] }
```

### reduceRight()

Like reduce, but iterates from right to left.

```javascript
let numbers = [1, 2, 3, 4, 5];

let result = numbers.reduceRight((acc, curr) => acc - curr);
console.log(result);  // 5 - 4 - 3 - 2 - 1 = -5

// Building string from right
let letters = ["H", "e", "l", "l", "o"];
let reversed = letters.reduceRight((acc, curr) => acc + curr, "");
console.log(reversed);  // "olleH"
```

---

## Other Useful Methods

### slice()

Returns a shallow copy of a portion.

```javascript
let fruits = ["apple", "banana", "orange", "grape", "kiwi"];

// Get elements from index 1 to 3 (not including 3)
let sliced = fruits.slice(1, 3);
console.log(sliced);  // ["banana", "orange"]

// From index 2 to end
let sliced2 = fruits.slice(2);
console.log(sliced2);  // ["orange", "grape", "kiwi"]

// Last 2 elements
let last2 = fruits.slice(-2);
console.log(last2);  // ["grape", "kiwi"]

// Copy array
let copy = fruits.slice();
console.log(copy);  // ["apple", "banana", "orange", "grape", "kiwi"]
```

### concat()

Merges arrays.

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let combined = arr1.concat(arr2);
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Multiple arrays
let arr3 = [7, 8, 9];
let combined2 = arr1.concat(arr2, arr3);
console.log(combined2);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// With individual values
let combined3 = arr1.concat(4, 5, arr2);
console.log(combined3);  // [1, 2, 3, 4, 5, 4, 5, 6]
```

### join()

Joins elements into a string.

```javascript
let fruits = ["apple", "banana", "orange"];

// Default separator (comma)
let str1 = fruits.join();
console.log(str1);  // "apple,banana,orange"

// Custom separator
let str2 = fruits.join(" - ");
console.log(str2);  // "apple - banana - orange"

// No separator
let str3 = fruits.join("");
console.log(str3);  // "applebananaorange"

// Create HTML
let items = ["Item 1", "Item 2", "Item 3"];
let html = "<ul><li>" + items.join("</li><li>") + "</li></ul>";
console.log(html);
// "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>"
```

### flat() & flatMap()

Flatten nested arrays.

```javascript
// flat()
let nested = [1, 2, [3, 4], [5, [6, 7]]];

let flat1 = nested.flat();
console.log(flat1);  // [1, 2, 3, 4, 5, [6, 7]]

let flat2 = nested.flat(2);  // Flatten 2 levels
console.log(flat2);  // [1, 2, 3, 4, 5, 6, 7]

let flatAll = nested.flat(Infinity);  // Flatten all levels
console.log(flatAll);  // [1, 2, 3, 4, 5, 6, 7]

// flatMap() - map then flat
let numbers = [1, 2, 3];

let doubled = numbers.flatMap(num => [num, num * 2]);
console.log(doubled);  // [1, 2, 2, 4, 3, 6]

// Remove empty strings
let words = ["Hello", "", "World", ""];
let filtered = words.flatMap(word => word ? [word] : []);
console.log(filtered);  // ["Hello", "World"]
```

---

## Interview Questions

### Question 1: What's the difference between map() and forEach()?

**Answer:**

**forEach():**
- Executes function for each element
- Returns `undefined`
- Used for side effects (logging, updating DOM)
- Cannot break or return early

**map():**
- Creates and returns a new array
- Transforms each element
- Original array unchanged
- Returns new array with same length

```javascript
let numbers = [1, 2, 3, 4, 5];

// forEach - returns undefined
let result1 = numbers.forEach(num => num * 2);
console.log(result1);  // undefined

// map - returns new array
let result2 = numbers.map(num => num * 2);
console.log(result2);  // [2, 4, 6, 8, 10]

// forEach - for side effects
numbers.forEach(num => console.log(num));  // Logs each number

// map - for transformation
let doubled = numbers.map(num => num * 2);  // Creates new array
```

**When to use:**
- Use `forEach` when you need to perform actions (logging, updating)
- Use `map` when you need to transform data

---

### Question 2: What's the difference between filter() and find()?

**Answer:**

**filter():**
- Returns an array of ALL matching elements
- Returns empty array if no matches
- Always returns an array

**find():**
- Returns FIRST matching element
- Returns `undefined` if no match
- Returns the element itself (not array)

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

// filter - returns all matches
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6]

// find - returns first match
let firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven);  // 2

// No matches
let noMatch1 = numbers.filter(num => num > 10);
console.log(noMatch1);  // []

let noMatch2 = numbers.find(num => num > 10);
console.log(noMatch2);  // undefined
```

**When to use:**
- Use `filter` when you need multiple matches
- Use `find` when you need only the first match

---

### Question 3: Explain reduce() with an example.

**Answer:**

`reduce()` reduces an array to a single value by applying a function to each element.

**Syntax:**
```javascript
array.reduce((accumulator, currentValue) => {
  // return new accumulator
}, initialValue)
```

**Examples:**

```javascript
let numbers = [1, 2, 3, 4, 5];

// Sum
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);  // 15
// Execution: 0 + 1 = 1, 1 + 2 = 3, 3 + 3 = 6, 6 + 4 = 10, 10 + 5 = 15

// Product
let product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log(product);  // 120

// Find max
let max = numbers.reduce((acc, curr) => Math.max(acc, curr));
console.log(max);  // 5

// Count occurrences
let fruits = ["apple", "banana", "apple", "orange"];
let count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count);  // { apple: 2, banana: 1, orange: 1 }

// Calculate total price
let cart = [
  { name: "Apple", price: 1.5, qty: 3 },
  { name: "Banana", price: 0.8, qty: 2 }
];

let total = cart.reduce((acc, item) => {
  return acc + (item.price * item.qty);
}, 0);
console.log(total);  // 6.1
```

---

### Question 4: What will be the output?

```javascript
let arr = [1, 2, 3];
let result = arr.map(x => x * 2).filter(x => x > 2);
console.log(result);
```

**Answer:**

Output: `[4, 6]`

**Explanation:**

```javascript
let arr = [1, 2, 3];

// Step 1: map(x => x * 2)
// [1, 2, 3] becomes [2, 4, 6]

// Step 2: filter(x => x > 2)
// [2, 4, 6] filtered to [4, 6] (only values > 2)

console.log(result);  // [4, 6]
```

This is called **method chaining** - you can chain array methods together.

---

### Question 5: How do you remove duplicates from an array?

**Answer:**

**Method 1: Using Set** (Easiest)

```javascript
let numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5];
let unique = [...new Set(numbers)];
console.log(unique);  // [1, 2, 3, 4, 5]
```

**Method 2: Using filter()**

```javascript
let numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5];
let unique = numbers.filter((num, index, array) => {
  return array.indexOf(num) === index;
});
console.log(unique);  // [1, 2, 3, 4, 5]
```

**Method 3: Using reduce()**

```javascript
let numbers = [1, 2, 2, 3, 3, 3, 4, 5, 5];
let unique = numbers.reduce((acc, num) => {
  if (!acc.includes(num)) acc.push(num);
  return acc;
}, []);
console.log(unique);  // [1, 2, 3, 4, 5]
```

**For objects:**

```javascript
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
  { id: 1, name: "John" }  // Duplicate
];

let unique = users.filter((user, index, array) => {
  return array.findIndex(u => u.id === user.id) === index;
});
console.log(unique);
// [{ id: 1, name: "John" }, { id: 2, name: "Alice" }]
```

---

## Common Pitfalls

### 1. Modifying Array While Iterating

```javascript
// ❌ Wrong - modifying during iteration
let numbers = [1, 2, 3, 4, 5];
numbers.forEach((num, index) => {
  if (num % 2 === 0) {
    numbers.splice(index, 1);  // Dangerous!
  }
});
console.log(numbers);  // Unexpected result

// ✅ Correct - use filter
let numbers2 = [1, 2, 3, 4, 5];
let odds = numbers2.filter(num => num % 2 !== 0);
console.log(odds);  // [1, 3, 5]
```

### 2. Not Returning in map()

```javascript
// ❌ Wrong - no return
let numbers = [1, 2, 3];
let doubled = numbers.map(num => {
  num * 2;  // Missing return!
});
console.log(doubled);  // [undefined, undefined, undefined]

// ✅ Correct
let doubled2 = numbers.map(num => num * 2);
console.log(doubled2);  // [2, 4, 6]
```

### 3. Forgetting Initial Value in reduce()

```javascript
// ❌ Can cause issues
let numbers = [];
let sum = numbers.reduce((acc, curr) => acc + curr);  // Error!

// ✅ Correct - provide initial value
let sum2 = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum2);  // 0
```

### 4. Using forEach When You Need map

```javascript
// ❌ Bad - using forEach to build array
let numbers = [1, 2, 3];
let doubled = [];
numbers.forEach(num => {
  doubled.push(num * 2);
});

// ✅ Good - use map
let doubled2 = numbers.map(num => num * 2);
```

---

## Best Practices

### 1. Use the Right Method

```javascript
let numbers = [1, 2, 3, 4, 5];

// For transformation - use map
let doubled = numbers.map(n => n * 2);

// For filtering - use filter
let evens = numbers.filter(n => n % 2 === 0);

// For finding one - use find
let firstEven = numbers.find(n => n % 2 === 0);

// For checking existence - use some
let hasEven = numbers.some(n => n % 2 === 0);

// For checking all - use every
let allPositive = numbers.every(n => n > 0);

// For reduction - use reduce
let sum = numbers.reduce((a, c) => a + c, 0);
```

### 2. Chain Methods

```javascript
let users = [
  { name: "John", age: 25, active: true },
  { name: "Alice", age: 30, active: false },
  { name: "Bob", age: 35, active: true }
];

// Chain multiple operations
let activeNames = users
  .filter(user => user.active)
  .map(user => user.name)
  .sort();

console.log(activeNames);  // ["Bob", "John"]
```

### 3. Use Descriptive Names

```javascript
// ❌ Bad
let x = arr.map(a => a * 2);

// ✅ Good
let doubledNumbers = numbers.map(number => number * 2);
```

### 4. Prefer Immutability

```javascript
// ❌ Bad - mutates original
let numbers = [3, 1, 4];
numbers.sort();

// ✅ Good - create copy
let numbers2 = [3, 1, 4];
let sorted = [...numbers2].sort();
```

---

## Summary

### Key Takeaways

1. **Iteration**: `forEach` for side effects
2. **Transformation**: `map` creates new array
3. **Filtering**: `filter` for multiple, `find` for one
4. **Checking**: `some` (any), `every` (all), `includes` (contains)
5. **Reduction**: `reduce` for single value
6. **Mutating**: `push/pop`, `unshift/shift`, `splice`, `sort`, `reverse`
7. **Non-mutating**: `slice`, `concat`, `join`, `flat`

### Quick Reference

```javascript
// Iteration
arr.forEach(callback)

// Transformation
arr.map(callback)

// Filtering
arr.filter(callback)
arr.find(callback)
arr.findIndex(callback)

// Checking
arr.includes(value)
arr.some(callback)
arr.every(callback)
arr.indexOf(value)

// Reduction
arr.reduce(callback, initial)

// Mutating
arr.push(...items)
arr.pop()
arr.unshift(...items)
arr.shift()
arr.splice(start, delete, ...add)
arr.sort(compareFunc)
arr.reverse()

// Non-mutating
arr.slice(start, end)
arr.concat(...arrays)
arr.join(separator)
arr.flat(depth)
arr.flatMap(callback)
```

---

**Happy Learning! Master array methods and you'll write cleaner, more functional JavaScript! 🚀**
