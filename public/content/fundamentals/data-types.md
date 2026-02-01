# Data Types in JavaScript

## Table of Contents
1. [What are Data Types?](#what-are-data-types)
2. [Primitive Data Types](#primitive-data-types)
3. [Reference Data Types](#reference-data-types)
4. [Type Checking](#type-checking)
5. [Interview Questions](#interview-questions)
6. [Common Pitfalls](#common-pitfalls)
7. [Best Practices](#best-practices)

---

## What are Data Types?

**Definition**: Data types specify what kind of value a variable can hold. JavaScript is a dynamically typed language, meaning variables can hold values of any type without type declaration.

**Simple Explanation**: Think of data types as categories of information - like numbers for math, text for messages, true/false for yes/no questions, etc.

```javascript
let age = 25;           // Number
let name = "John";      // String
let isActive = true;    // Boolean
let person = {};        // Object

// Same variable can hold different types
let value = 42;
value = "now I'm a string";
value = true;
```

**Why data types matter:**
- Determine what operations you can perform
- Affect how values are stored in memory
- Impact comparison and equality checks
- Important for type conversion and coercion

---

## Primitive Data Types

Primitive types are immutable (cannot be changed) and stored directly in the variable.

### 1. String

Represents textual data enclosed in quotes.

```javascript
// Three ways to create strings
let single = 'Hello';
let double = "World";
let backtick = `Template literal`;

// String concatenation
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName);  // "John Doe"

// Template literals (ES6)
let age = 25;
let message = `My name is ${firstName} and I'm ${age} years old`;
console.log(message);  // "My name is John and I'm 25 years old"

// String properties and methods
let text = "JavaScript";
console.log(text.length);           // 10
console.log(text.toLowerCase());    // "javascript"
console.log(text.toUpperCase());    // "JAVASCRIPT"
console.log(text.charAt(0));        // "J"
console.log(text.includes("Script")); // true
console.log(text.slice(0, 4));      // "Java"

// Multi-line strings
let multiLine = `This is
a multi-line
string`;

// Escape characters
let quote = "He said, \"Hello!\"";
let path = "C:\\Users\\Documents";
let newLine = "First line\nSecond line";
```

### 2. Number

Represents both integers and floating-point numbers.

```javascript
// Different number formats
let integer = 42;
let float = 3.14;
let negative = -10;
let scientific = 2.5e6;  // 2500000

// Special numeric values
console.log(Infinity);        // Infinity
console.log(-Infinity);       // -Infinity
console.log(1 / 0);          // Infinity
console.log(NaN);            // NaN (Not a Number)
console.log(0 / 0);          // NaN
console.log("abc" * 2);      // NaN

// Number methods
let num = 123.456;
console.log(num.toFixed(2));        // "123.46"
console.log(num.toPrecision(4));    // "123.5"
console.log(parseInt("42px"));      // 42
console.log(parseFloat("3.14abc")); // 3.14
console.log(Number.isInteger(42));  // true
console.log(Number.isNaN(NaN));     // true

// Number constants
console.log(Number.MAX_VALUE);      // Largest number
console.log(Number.MIN_VALUE);      // Smallest positive number
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// Binary, Octal, Hexadecimal
let binary = 0b1010;    // 10 in decimal
let octal = 0o12;       // 10 in decimal
let hex = 0xA;          // 10 in decimal
```

### 3. Boolean

Represents logical values: true or false.

```javascript
let isActive = true;
let isCompleted = false;

// Boolean from comparisons
let isGreater = 10 > 5;      // true
let isEqual = 10 === 10;     // true
let isLess = 5 > 10;         // false

// Boolean in conditions
let age = 18;
if (age >= 18) {
  console.log("Adult");      // Executes
}

// Truthy and Falsy values
// Falsy: false, 0, "", null, undefined, NaN
// Truthy: everything else

if (0) {
  console.log("Won't print");  // 0 is falsy
}

if ("hello") {
  console.log("Prints");       // Non-empty string is truthy
}

// Boolean() function
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean("text"));   // true
console.log(Boolean(null));     // false
console.log(Boolean(undefined)); // false
```

### 4. Undefined

A variable that has been declared but not assigned a value.

```javascript
let x;
console.log(x);  // undefined
console.log(typeof x);  // "undefined"

// Function with no return
function test() {
  // no return statement
}
console.log(test());  // undefined

// Missing object property
let person = { name: "John" };
console.log(person.age);  // undefined

// Missing array element
let arr = [1, 2, 3];
console.log(arr[10]);  // undefined

// Function parameter not provided
function greet(name) {
  console.log(name);
}
greet();  // undefined
```

### 5. Null

Represents intentional absence of any value.

```javascript
let value = null;
console.log(value);  // null
console.log(typeof value);  // "object" (this is a bug in JavaScript!)

// Null vs Undefined
let a;              // undefined (not assigned)
let b = null;       // null (intentionally empty)

console.log(a == null);   // true (loose equality)
console.log(a === null);  // false (strict equality)
console.log(b == null);   // true
console.log(b === null);  // true

// Common use cases
let selectedUser = null;  // No user selected

function findUser(id) {
  // If user not found, return null
  return null;
}

// Clearing a value
let data = { name: "John" };
data = null;  // Clear the object
```

### 6. Symbol (ES6)

Creates unique identifiers.

```javascript
// Creating symbols
let sym1 = Symbol();
let sym2 = Symbol("description");
let sym3 = Symbol("description");

console.log(sym2 === sym3);  // false (each Symbol is unique!)

// Symbols as object keys
let id = Symbol("id");
let user = {
  name: "John",
  [id]: 123
};

console.log(user[id]);       // 123
console.log(user.id);        // undefined

// Symbols are hidden in for...in
for (let key in user) {
  console.log(key);  // Only "name" (Symbol is hidden)
}

// Global symbols
let globalSym = Symbol.for("app.id");
let sameSym = Symbol.for("app.id");
console.log(globalSym === sameSym);  // true

// Well-known symbols
let obj = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (let value of obj) {
  console.log(value);  // 1, 2, 3
}
```

### 7. BigInt (ES2020)

Represents integers larger than Number.MAX_SAFE_INTEGER.

```javascript
// Creating BigInt
let big1 = 1234567890123456789012345678901234567890n;
let big2 = BigInt("1234567890123456789012345678901234567890");

console.log(typeof big1);  // "bigint"

// BigInt operations
let a = 10n;
let b = 20n;
console.log(a + b);   // 30n
console.log(a * b);   // 200n
console.log(b / a);   // 2n (no decimal part)

// Cannot mix BigInt and Number
// console.log(10n + 5);  // TypeError

// Must convert
console.log(10n + BigInt(5));  // 15n
console.log(Number(10n) + 5);  // 15

// Comparison works
console.log(10n > 5);   // true
console.log(10n === 10); // false (different types)
console.log(10n == 10);  // true (loose equality)
```

---

## Reference Data Types

Reference types store a reference to the location in memory where the data is stored.

### 1. Object

Collections of key-value pairs.

```javascript
// Creating objects
let person = {
  name: "John",
  age: 30,
  isEmployed: true,
  greet: function() {
    console.log("Hello!");
  }
};

// Accessing properties
console.log(person.name);        // "John" (dot notation)
console.log(person["age"]);      // 30 (bracket notation)

// Adding properties
person.city = "NYC";
person["country"] = "USA";

// Modifying properties
person.age = 31;

// Deleting properties
delete person.isEmployed;

// Object methods
console.log(Object.keys(person));    // ["name", "age", "greet", "city", "country"]
console.log(Object.values(person));  // ["John", 31, function, "NYC", "USA"]
console.log(Object.entries(person)); // [["name", "John"], ["age", 31], ...]

// Nested objects
let user = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "NYC"
  }
};

console.log(user.address.city);  // "NYC"

// Object.assign() - shallow copy
let copy = Object.assign({}, person);

// Spread operator - shallow copy
let copy2 = { ...person };
```

### 2. Array

Ordered collections of values.

```javascript
// Creating arrays
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "two", true, null, { name: "John" }];
let empty = [];

// Accessing elements
console.log(numbers[0]);   // 1 (first element)
console.log(numbers[4]);   // 5 (last element)
console.log(numbers.length); // 5

// Modifying arrays
numbers[0] = 10;
numbers.push(6);          // Add to end
numbers.pop();            // Remove from end
numbers.unshift(0);       // Add to beginning
numbers.shift();          // Remove from beginning

// Array methods
let fruits = ["apple", "banana", "orange"];

// Adding/Removing
fruits.push("grape");           // ["apple", "banana", "orange", "grape"]
fruits.pop();                   // ["apple", "banana", "orange"]
fruits.unshift("mango");        // ["mango", "apple", "banana", "orange"]
fruits.shift();                 // ["apple", "banana", "orange"]

// Slicing
console.log(fruits.slice(1, 3)); // ["banana", "orange"]

// Splicing
fruits.splice(1, 1, "kiwi");    // Replace 1 element at index 1
console.log(fruits);            // ["apple", "kiwi", "orange"]

// Searching
console.log(fruits.indexOf("kiwi"));     // 1
console.log(fruits.includes("apple"));   // true
console.log(fruits.find(f => f === "kiwi")); // "kiwi"

// Iterating
fruits.forEach(fruit => console.log(fruit));

// Transforming
let upperFruits = fruits.map(f => f.toUpperCase());
console.log(upperFruits);  // ["APPLE", "KIWI", "ORANGE"]

// Filtering
let longFruits = fruits.filter(f => f.length > 5);
console.log(longFruits);  // ["orange"]

// Reducing
let nums = [1, 2, 3, 4, 5];
let sum = nums.reduce((total, num) => total + num, 0);
console.log(sum);  // 15
```

### 3. Function

Functions are first-class objects in JavaScript.

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression
let sayHi = function(name) {
  return `Hi, ${name}!`;
};

// Arrow function
let sayHey = (name) => `Hey, ${name}!`;

// Function as object property
let obj = {
  greet: function() {
    console.log("Hello!");
  }
};

// Function as argument
function executeCallback(callback) {
  callback();
}

executeCallback(() => console.log("Callback executed"));

// Function returning function
function outer() {
  return function inner() {
    console.log("Inner function");
  };
}

let fn = outer();
fn();  // "Inner function"

// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let john = new Person("John", 30);
console.log(john.name);  // "John"
```

### 4. Date

Built-in object for handling dates and times.

```javascript
// Creating dates
let now = new Date();
let specific = new Date("2024-01-01");
let fromComponents = new Date(2024, 0, 1, 12, 30, 0); // Month is 0-indexed!

// Getting date components
console.log(now.getFullYear());   // 2024
console.log(now.getMonth());      // 0-11 (0 = January)
console.log(now.getDate());       // 1-31
console.log(now.getDay());        // 0-6 (0 = Sunday)
console.log(now.getHours());      // 0-23
console.log(now.getMinutes());    // 0-59
console.log(now.getSeconds());    // 0-59

// Setting date components
now.setFullYear(2025);
now.setMonth(11);  // December
now.setDate(25);   // Christmas!

// Formatting
console.log(now.toString());
console.log(now.toDateString());
console.log(now.toTimeString());
console.log(now.toISOString());
console.log(now.toLocaleDateString());

// Timestamps
let timestamp = Date.now();  // Current timestamp
console.log(timestamp);      // milliseconds since Jan 1, 1970

// Date arithmetic
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
```

---

## Type Checking

### typeof Operator

Returns a string indicating the type of a value.

```javascript
// Primitive types
console.log(typeof "hello");      // "string"
console.log(typeof 42);           // "number"
console.log(typeof 42n);          // "bigint"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof Symbol());     // "symbol"

// Reference types
console.log(typeof {});           // "object"
console.log(typeof []);           // "object" (arrays are objects!)
console.log(typeof null);         // "object" (JavaScript bug!)
console.log(typeof function(){}); // "function"

// Special cases
console.log(typeof NaN);          // "number" (NaN is a number!)
console.log(typeof Infinity);     // "number"
```

### instanceof Operator

Checks if an object is an instance of a specific class/constructor.

```javascript
let arr = [1, 2, 3];
let date = new Date();
let obj = {};

console.log(arr instanceof Array);    // true
console.log(arr instanceof Object);   // true (arrays inherit from Object)
console.log(date instanceof Date);    // true
console.log(obj instanceof Object);   // true

// Custom constructor
function Person(name) {
  this.name = name;
}

let john = new Person("John");
console.log(john instanceof Person);  // true
console.log(john instanceof Object);  // true

// instanceof doesn't work with primitives
console.log("hello" instanceof String);  // false
console.log(42 instanceof Number);       // false
```

### Other Type Checking Methods

```javascript
// Array.isArray()
console.log(Array.isArray([]));        // true
console.log(Array.isArray({}));        // false
console.log(Array.isArray("string")); // false

// Number.isNaN()
console.log(Number.isNaN(NaN));        // true
console.log(Number.isNaN("text"));     // false (not NaN)
console.log(isNaN("text"));            // true (converts to number first)

// Number.isInteger()
console.log(Number.isInteger(42));     // true
console.log(Number.isInteger(42.5));   // false

// Number.isFinite()
console.log(Number.isFinite(42));      // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN));     // false

// Object.prototype.toString.call() - most reliable
console.log(Object.prototype.toString.call([]));        // "[object Array]"
console.log(Object.prototype.toString.call({}));        // "[object Object]"
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"
console.log(Object.prototype.toString.call(null));      // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
```

---

## Interview Questions

### Question 1: What are the primitive data types in JavaScript?

**Answer:**

JavaScript has **7 primitive data types**:

1. **String** - textual data (`"hello"`)
2. **Number** - integers and floats (`42`, `3.14`)
3. **BigInt** - large integers (`123n`)
4. **Boolean** - true or false
5. **Undefined** - variable declared but not assigned
6. **Null** - intentional absence of value
7. **Symbol** - unique identifiers

```javascript
let str = "text";        // string
let num = 42;            // number
let big = 123n;          // bigint
let bool = true;         // boolean
let undef;               // undefined
let empty = null;        // null
let sym = Symbol("id");  // symbol
```

**Key characteristic**: Primitives are **immutable** - their values cannot be changed.

```javascript
let str = "hello";
str[0] = "H";  // Doesn't work
console.log(str);  // Still "hello"

str = "Hello";  // This works (reassignment, not mutation)
```

---

### Question 2: What's the difference between null and undefined?

**Answer:**

**undefined:**
- Variable declared but not assigned a value
- Default value of uninitialized variables
- Returned by functions with no return statement
- Type: `"undefined"`

**null:**
- Intentional absence of value
- Must be explicitly assigned
- Represents "no value" or "empty"
- Type: `"object"` (JavaScript bug)

```javascript
// undefined examples
let x;
console.log(x);  // undefined

function test() {}
console.log(test());  // undefined

let obj = { name: "John" };
console.log(obj.age);  // undefined

// null examples
let selectedUser = null;  // Intentionally empty

function findUser(id) {
  // User not found
  return null;
}

// Comparison
console.log(undefined == null);   // true (loose equality)
console.log(undefined === null);  // false (different types)
```

**When to use:**
- Use `undefined` for "not yet set" or "doesn't exist"
- Use `null` for "intentionally empty" or "no value"

---

### Question 3: Why does typeof null return "object"?

**Answer:**

`typeof null` returns `"object"` due to a **bug in JavaScript** that has been kept for backwards compatibility.

```javascript
console.log(typeof null);  // "object" (bug!)
console.log(typeof undefined);  // "undefined" (correct)
```

**Historical reason:**
- In the original JavaScript implementation, values were represented with a type tag and a value
- Objects had a type tag of 0
- `null` was represented as NULL pointer (0x00), which was interpreted as object type tag

**How to check for null:**

```javascript
// ❌ Wrong - doesn't distinguish null from objects
if (typeof value === "object") {
  // Could be object, array, or null!
}

// ✅ Correct - explicit null check
if (value === null) {
  console.log("It's null");
}

// ✅ Correct - check if it's an object but not null
if (typeof value === "object" && value !== null) {
  console.log("It's an object");
}

// ✅ Better - use Object.prototype.toString
Object.prototype.toString.call(null);  // "[object Null]"
```

---

### Question 4: What's the difference between primitive and reference types?

**Answer:**

**Primitive Types:**
- Stored directly in variable location (stack)
- Immutable (cannot be changed)
- Compared by value
- Copying creates independent copy

```javascript
// Primitives - stored by value
let a = 10;
let b = a;  // Copies the value

b = 20;
console.log(a);  // 10 (unchanged)
console.log(b);  // 20

// Primitives - compared by value
console.log(5 === 5);          // true
console.log("hello" === "hello"); // true
```

**Reference Types:**
- Stored as reference to memory location (heap)
- Mutable (can be changed)
- Compared by reference
- Copying creates reference to same object

```javascript
// Reference types - stored by reference
let obj1 = { name: "John" };
let obj2 = obj1;  // Copies the reference, not the object

obj2.name = "Alice";
console.log(obj1.name);  // "Alice" (changed!)
console.log(obj2.name);  // "Alice"

// Reference types - compared by reference
console.log({} === {});  // false (different references)
console.log([] === []);  // false

let arr1 = [1, 2, 3];
let arr2 = arr1;
console.log(arr1 === arr2);  // true (same reference)

// Deep copy to create independent copy
let original = { name: "John", age: 30 };
let copy = { ...original };  // Shallow copy
let deepCopy = JSON.parse(JSON.stringify(original));  // Deep copy
```

**Summary:**

| Feature | Primitive | Reference |
|---------|-----------|-----------|
| Storage | Stack (by value) | Heap (by reference) |
| Mutability | Immutable | Mutable |
| Comparison | By value | By reference |
| Copying | Creates independent copy | Creates reference |
| Examples | String, Number, Boolean | Object, Array, Function |

---

### Question 5: What will be the output and why?

```javascript
let a = [1, 2, 3];
let b = a;
let c = [1, 2, 3];

console.log(a == b);
console.log(a === b);
console.log(a == c);
console.log(a === c);
```

**Answer:**

Output:
```
true
true
false
false
```

**Explanation:**

```javascript
let a = [1, 2, 3];
let b = a;  // b references the SAME array as a
let c = [1, 2, 3];  // c is a NEW array (different reference)

// a and b point to the same array in memory
console.log(a == b);   // true (same reference)
console.log(a === b);  // true (same reference)

// a and c are different arrays (different references)
console.log(a == c);   // false (different references)
console.log(a === c);  // false (different references)

// Even though they have the same content
console.log(a[0] === c[0]);  // true (primitive values match)
```

**Key concept**: Arrays and objects are compared by reference, not by content.

**To compare array contents:**

```javascript
// Method 1: JSON.stringify
console.log(JSON.stringify(a) === JSON.stringify(c));  // true

// Method 2: Loop and compare elements
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

console.log(arraysEqual(a, c));  // true

// Method 3: Array methods
console.log(a.every((val, i) => val === c[i]));  // true
```

---

### Question 6: What are truthy and falsy values in JavaScript?

**Answer:**

**Falsy values** (6 values that evaluate to false):
1. `false`
2. `0` (and `-0`)
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`

**Everything else is truthy**, including:
- `true`
- Any non-zero number (`42`, `-1`, `3.14`)
- Any non-empty string (`"hello"`, `"false"`, `" "`)
- Objects `{}`
- Arrays `[]`
- Functions

```javascript
// Falsy values
if (false) console.log("Won't print");
if (0) console.log("Won't print");
if ("") console.log("Won't print");
if (null) console.log("Won't print");
if (undefined) console.log("Won't print");
if (NaN) console.log("Won't print");

// Truthy values
if (true) console.log("Prints");        // ✅
if (1) console.log("Prints");           // ✅
if ("hello") console.log("Prints");     // ✅
if ({}) console.log("Prints");          // ✅ Empty object is truthy!
if ([]) console.log("Prints");          // ✅ Empty array is truthy!
if (function(){}) console.log("Prints"); // ✅

// Common gotcha
if ("false") console.log("Prints");     // ✅ String "false" is truthy!
if (" ") console.log("Prints");         // ✅ String with space is truthy!

// Using Boolean() to check
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean([]));       // true
console.log(Boolean({}));       // true
```

**Practical use:**

```javascript
// Default values
function greet(name) {
  name = name || "Guest";  // If name is falsy, use "Guest"
  console.log(`Hello, ${name}!`);
}

greet("John");  // "Hello, John!"
greet("");      // "Hello, Guest!" (empty string is falsy)
greet();        // "Hello, Guest!" (undefined is falsy)

// Modern alternative: Nullish coalescing
function greet2(name) {
  name = name ?? "Guest";  // Only if null or undefined
  console.log(`Hello, ${name}!`);
}

greet2("");  // "Hello, !" (empty string is NOT null/undefined)
```

---

## Common Pitfalls

### 1. typeof null Returns "object"

```javascript
// ❌ Wrong - doesn't detect null
if (typeof value === "object") {
  // Could be object, array, or null!
}

// ✅ Correct - check for null first
if (value !== null && typeof value === "object") {
  console.log("It's an object");
}

// ✅ Better - explicit null check
if (value === null) {
  console.log("It's null");
}
```

### 2. typeof Array Returns "object"

```javascript
let arr = [1, 2, 3];

// ❌ Wrong
console.log(typeof arr);  // "object"

// ✅ Correct
console.log(Array.isArray(arr));  // true
```

### 3. NaN is of Type "number"

```javascript
let result = "text" * 2;

console.log(result);        // NaN
console.log(typeof result); // "number" (surprising!)

// ❌ Wrong - NaN never equals itself
console.log(NaN === NaN);   // false

// ✅ Correct
console.log(Number.isNaN(result));  // true
console.log(isNaN(result));         // true
```

### 4. Comparing Objects and Arrays

```javascript
// ❌ Wrong - compares references
console.log({} === {});    // false
console.log([1] === [1]);  // false

// ✅ Correct - compare contents
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log(JSON.stringify(arr1) === JSON.stringify(arr2));  // true
```

### 5. Empty Array and Object are Truthy

```javascript
// ❌ Wrong assumption
if ([]) {
  console.log("Empty array is truthy!");  // Prints!
}

if ({}) {
  console.log("Empty object is truthy!");  // Prints!
}

// ✅ Correct - check length or keys
if (arr.length > 0) {
  console.log("Array has elements");
}

if (Object.keys(obj).length > 0) {
  console.log("Object has properties");
}
```

---

## Best Practices

### 1. Use Strict Equality (===)

```javascript
// ❌ Bad - loose equality
console.log(0 == false);    // true (confusing!)
console.log("" == false);   // true
console.log(null == undefined); // true

// ✅ Good - strict equality
console.log(0 === false);   // false
console.log("" === false);  // false
console.log(null === undefined); // false
```

### 2. Check for null and undefined

```javascript
// ❌ Bad - doesn't distinguish null from undefined
if (value == null) {
  // Both null and undefined
}

// ✅ Good - explicit checks
if (value === null) {
  console.log("Explicitly null");
}

if (value === undefined) {
  console.log("Undefined");
}

// ✅ Good - check for both
if (value == null) {
  console.log("null or undefined");
}
```

### 3. Use Array.isArray() for Arrays

```javascript
// ❌ Bad
if (typeof arr === "object") {
  // Could be object, array, or null!
}

// ✅ Good
if (Array.isArray(arr)) {
  console.log("It's an array");
}
```

### 4. Use Number.isNaN() for NaN

```javascript
// ❌ Bad - converts to number first
console.log(isNaN("text"));  // true (confusing!)

// ✅ Good - checks actual NaN
console.log(Number.isNaN("text"));  // false
console.log(Number.isNaN(NaN));     // true
```

### 5. Be Aware of Type Coercion

```javascript
// ❌ Bad - implicit coercion
console.log("5" + 3);   // "53" (string concatenation)
console.log("5" - 3);   // 2 (numeric subtraction)

// ✅ Good - explicit conversion
console.log(Number("5") + 3);  // 8
console.log(String(5) + "3");  // "53"
```

---

## Summary

### Key Takeaways

1. **7 Primitive Types**: String, Number, BigInt, Boolean, Undefined, Null, Symbol
2. **Reference Types**: Object, Array, Function, Date, etc.
3. **Primitives are immutable**, reference types are mutable
4. **typeof has quirks**: `typeof null === "object"`, `typeof [] === "object"`
5. **Use strict equality (===)** to avoid type coercion issues
6. **Falsy values**: `false`, `0`, `""`, `null`, `undefined`, `NaN`

### Quick Reference

```javascript
// Type checking
typeof "text"          // "string"
typeof 42              // "number"
typeof true            // "boolean"
typeof undefined       // "undefined"
typeof null            // "object" (bug!)
typeof {}              // "object"
typeof []              // "object"
Array.isArray([])      // true

// Falsy values (only 6)
false, 0, "", null, undefined, NaN

// Everything else is truthy (including)
true, 1, "hello", {}, [], function(){}

// Type conversion
Number("42")           // 42
String(42)             // "42"
Boolean(0)             // false
parseInt("42px")       // 42
parseFloat("3.14")     // 3.14
```

---

**Happy Learning! Master data types and you'll avoid countless JavaScript bugs! 🚀**
