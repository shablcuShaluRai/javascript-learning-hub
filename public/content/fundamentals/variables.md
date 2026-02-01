# Variables in JavaScript

## Table of Contents
1. [What are Variables?](#what-are-variables)
2. [Variable Declaration Keywords](#variable-declaration-keywords)
3. [var vs let vs const](#var-vs-let-vs-const)
4. [Naming Conventions](#naming-conventions)
5. [Variable Scope](#variable-scope)
6. [Interview Questions](#interview-questions)
7. [Common Pitfalls](#common-pitfalls)
8. [Best Practices](#best-practices)

---

## What are Variables?

**Definition**: Variables are containers for storing data values. They give names to values so we can reference and manipulate them in our code.

**Simple Explanation**: Think of variables as labeled boxes where you can store information. You can put things in, take things out, and change what's inside.

```javascript
// Creating a variable
let age = 25;

// Using the variable
console.log(age);  // 25

// Changing the value
age = 26;
console.log(age);  // 26
```

**Why use variables?**
- Store data for later use
- Make code readable and maintainable
- Reuse values throughout your program
- Perform calculations and operations

---

## Variable Declaration Keywords

JavaScript has three keywords for declaring variables:

### 1. `var` (Old way - ES5)

```javascript
var name = "John";
var age = 30;

console.log(name);  // "John"
console.log(age);   // 30
```

**Characteristics:**
- Function-scoped (not block-scoped)
- Can be redeclared
- Can be updated
- Hoisted and initialized with `undefined`

### 2. `let` (Modern way - ES6)

```javascript
let name = "Alice";
let age = 25;

age = 26;  // Can update
console.log(age);  // 26

// let name = "Bob";  // Error: Cannot redeclare
```

**Characteristics:**
- Block-scoped
- Cannot be redeclared in same scope
- Can be updated
- Hoisted but not initialized (TDZ)

### 3. `const` (Modern way - ES6)

```javascript
const PI = 3.14159;
const MAX_SIZE = 100;

console.log(PI);  // 3.14159

// PI = 3.14;  // Error: Assignment to constant variable
```

**Characteristics:**
- Block-scoped
- Cannot be redeclared
- Cannot be reassigned
- Must be initialized at declaration
- Hoisted but not initialized (TDZ)

**Important Note about `const` with objects/arrays:**

```javascript
const person = { name: "John", age: 30 };

// Can modify properties
person.age = 31;  // ✅ Works
person.city = "NYC";  // ✅ Works

console.log(person);  // { name: "John", age: 31, city: "NYC" }

// Cannot reassign the entire object
// person = { name: "Alice" };  // ❌ Error

const numbers = [1, 2, 3];

// Can modify array
numbers.push(4);  // ✅ Works
numbers[0] = 10;  // ✅ Works

console.log(numbers);  // [10, 2, 3, 4]

// Cannot reassign the array
// numbers = [5, 6, 7];  // ❌ Error
```

---

## var vs let vs const

### Detailed Comparison

```javascript
// 1. SCOPE DIFFERENCE

// var - function scoped
function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x);  // 10 - accessible outside if block
}

// let - block scoped
function testLet() {
  if (true) {
    let y = 20;
  }
  console.log(y);  // ReferenceError - not accessible outside if block
}

// 2. REDECLARATION

// var - can redeclare
var name = "John";
var name = "Alice";  // ✅ No error
console.log(name);  // "Alice"

// let - cannot redeclare
let age = 25;
// let age = 30;  // ❌ SyntaxError: Identifier 'age' has already been declared

// const - cannot redeclare
const city = "NYC";
// const city = "LA";  // ❌ SyntaxError

// 3. REASSIGNMENT

// var - can reassign
var count = 1;
count = 2;  // ✅ Works

// let - can reassign
let total = 10;
total = 20;  // ✅ Works

// const - cannot reassign
const MAX = 100;
// MAX = 200;  // ❌ TypeError: Assignment to constant variable

// 4. HOISTING

console.log(a);  // undefined (var is hoisted and initialized)
var a = 10;

// console.log(b);  // ReferenceError (let is hoisted but not initialized - TDZ)
let b = 20;

// console.log(c);  // ReferenceError (const is hoisted but not initialized - TDZ)
const c = 30;

// 5. GLOBAL OBJECT PROPERTY

// In browser
var globalVar = "I'm global";
console.log(window.globalVar);  // "I'm global" (becomes window property)

let globalLet = "Also global";
console.log(window.globalLet);  // undefined (does NOT become window property)

const globalConst = "Me too";
console.log(window.globalConst);  // undefined (does NOT become window property)
```

### Comparison Table

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Can redeclare? | Yes | No | No |
| Can reassign? | Yes | Yes | No |
| Hoisted? | Yes (initialized undefined) | Yes (not initialized - TDZ) | Yes (not initialized - TDZ) |
| Must initialize at declaration? | No | No | Yes |
| Temporal Dead Zone? | No | Yes | Yes |
| Creates global property? | Yes (in browsers) | No | No |

---

## Naming Conventions

### Rules (Must Follow)

```javascript
// 1. Can contain letters, digits, underscores, dollar signs
let firstName = "John";
let age25 = 25;
let _private = "hidden";
let $amount = 100;

// 2. Must start with letter, underscore, or dollar sign
let name = "Alice";   // ✅
let _name = "Bob";    // ✅
let $name = "Charlie"; // ✅
// let 2name = "David";  // ❌ Cannot start with digit

// 3. Case-sensitive
let myName = "John";
let MyName = "Alice";
let MYNAME = "Bob";
// These are three different variables!

// 4. Cannot use reserved keywords
// let let = 5;      // ❌ Error
// let function = 5; // ❌ Error
// let class = 5;    // ❌ Error
```

### Best Practices (Should Follow)

```javascript
// 1. Use camelCase for variables
let firstName = "John";
let userAge = 25;
let isLoggedIn = true;

// 2. Use UPPERCASE for constants
const MAX_SIZE = 100;
const API_URL = "https://api.example.com";
const TAX_RATE = 0.15;

// 3. Use descriptive names
// ❌ Bad
let x = 25;
let data = [];
let temp = {};

// ✅ Good
let userAge = 25;
let todoItems = [];
let userSettings = {};

// 4. Boolean variables with is/has/can prefix
let isActive = true;
let hasPermission = false;
let canEdit = true;

// 5. Avoid single letter names (except in loops)
// ❌ Bad
let a = "John";
let b = 25;

// ✅ Good
let name = "John";
let age = 25;

// ✅ OK in loops
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

---

## Variable Scope

### Global Scope

Variables declared outside any function have global scope.

```javascript
let globalVar = "I'm global";

function test() {
  console.log(globalVar);  // Can access global variable
}

test();  // "I'm global"
console.log(globalVar);  // "I'm global"
```

### Function Scope (var)

Variables declared with `var` inside a function are function-scoped.

```javascript
function testScope() {
  var functionVar = "I'm function scoped";

  if (true) {
    var insideIf = "Also function scoped";
  }

  console.log(functionVar);  // ✅ Accessible
  console.log(insideIf);     // ✅ Accessible (var ignores block scope)
}

// console.log(functionVar);  // ❌ ReferenceError
```

### Block Scope (let/const)

Variables declared with `let` or `const` inside a block `{}` are block-scoped.

```javascript
function testBlockScope() {
  let functionVar = "I'm function scoped";

  if (true) {
    let blockVar = "I'm block scoped";
    const blockConst = "Me too!";

    console.log(functionVar);  // ✅ Can access function variable
    console.log(blockVar);     // ✅ Can access block variable
  }

  console.log(functionVar);  // ✅ Accessible
  // console.log(blockVar);  // ❌ ReferenceError - not accessible outside block
}
```

---

## Interview Questions

### Question 1: What is the difference between var, let, and const?

**Answer:**

**var:**
- Function-scoped
- Can be redeclared and reassigned
- Hoisted and initialized with `undefined`
- Creates property on global object (in browsers)

**let:**
- Block-scoped
- Cannot be redeclared but can be reassigned
- Hoisted but not initialized (Temporal Dead Zone)
- Does not create global object property

**const:**
- Block-scoped
- Cannot be redeclared or reassigned
- Must be initialized at declaration
- Hoisted but not initialized (TDZ)
- Objects/arrays can be mutated (properties can change)

```javascript
// var example
var x = 1;
var x = 2;  // ✅ Can redeclare
x = 3;      // ✅ Can reassign

// let example
let y = 1;
// let y = 2;  // ❌ Cannot redeclare
y = 3;      // ✅ Can reassign

// const example
const z = 1;
// const z = 2;  // ❌ Cannot redeclare
// z = 3;        // ❌ Cannot reassign
```

---

### Question 2: What will be the output?

```javascript
console.log(a);
var a = 10;
console.log(a);

console.log(b);
let b = 20;
```

**Answer:**

Output:
```
undefined
10
ReferenceError: Cannot access 'b' before initialization
```

**Explanation:**
- `var a` is hoisted and initialized with `undefined`, so first `console.log(a)` prints `undefined`
- After assignment, `a` is `10`
- `let b` is hoisted but NOT initialized (Temporal Dead Zone), so accessing it before declaration throws ReferenceError

---

### Question 3: Can you modify a const object?

**Answer:**

Yes! `const` prevents **reassignment** of the variable, but doesn't make the object immutable.

```javascript
const person = {
  name: "John",
  age: 30
};

// ✅ Can modify properties
person.age = 31;
person.city = "NYC";
console.log(person);  // { name: "John", age: 31, city: "NYC" }

// ❌ Cannot reassign the entire object
// person = { name: "Alice" };  // TypeError
```

**To make object truly immutable:**
```javascript
const person = Object.freeze({
  name: "John",
  age: 30
});

person.age = 31;  // Silently fails (throws error in strict mode)
console.log(person.age);  // 30 (unchanged)
```

---

## Common Pitfalls

### 1. Forgetting to Declare Variables

```javascript
function calculate() {
  result = 100;  // ❌ Creates global variable accidentally!
}

calculate();
console.log(result);  // 100 (global pollution)

// ✅ Always declare
function calculate() {
  let result = 100;
}
```

### 2. Using var in Loops

```javascript
// ❌ Problem
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3

// ✅ Solution: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
```

### 3. Not Initializing const

```javascript
const name;  // ❌ SyntaxError: Missing initializer in const declaration
name = "John";

// ✅ Must initialize at declaration
const name = "John";
```

---

## Best Practices

### 1. Use const by Default

```javascript
// ✅ Good - use const for values that don't change
const MAX_USERS = 100;
const API_KEY = "abc123";
const config = { timeout: 5000 };
```

### 2. Use let When You Need to Reassign

```javascript
// ✅ Good - use let for values that change
let count = 0;
let isLoading = false;

for (let i = 0; i < 10; i++) {
  count += i;
}
```

### 3. Never Use var in Modern Code

```javascript
// ❌ Bad - var has confusing scope rules
var x = 10;

// ✅ Good - use let or const
let x = 10;
const MAX = 100;
```

### 4. Use Descriptive Names

```javascript
// ❌ Bad
let x = 25;
let d = new Date();

// ✅ Good
let userAge = 25;
let createdDate = new Date();
```

---

## Summary

### Key Takeaways

1. **Use const by default**, let when you need reassignment, avoid var
2. **const doesn't make objects immutable** - only prevents reassignment
3. **let and const are block-scoped**, var is function-scoped
4. **Temporal Dead Zone** prevents accessing let/const before declaration
5. **Always declare variables** - avoid implicit globals

### Quick Reference

```javascript
// const - cannot reassign
const MAX = 100;
const user = { name: "John" };
user.name = "Alice";  // ✅ Can modify properties
// user = {};  // ❌ Cannot reassign

// let - can reassign
let count = 0;
count = 1;  // ✅ Works

// var - avoid in modern code
var x = 10;  // ⚠️ Function-scoped, can cause bugs
```

---

**Happy Learning! Master variables and you'll have a strong foundation for JavaScript! 🚀**
