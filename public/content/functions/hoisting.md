# Hoisting in JavaScript

## Table of Contents
1. [What is Hoisting?](#what-is-hoisting)
2. [How Hoisting Works](#how-hoisting-works)
3. [Variable Hoisting](#variable-hoisting)
4. [Function Hoisting](#function-hoisting)
5. [Class Hoisting](#class-hoisting)
6. [Interview Questions](#interview-questions)
7. [Common Pitfalls](#common-pitfalls)
8. [Best Practices](#best-practices)

---

## What is Hoisting?

**Definition**: Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope (script or function) before code execution.

**Simple Explanation**: During the creation phase of execution context, JavaScript scans for variable and function declarations and moves them to the top. However, only **declarations** are hoisted, not **initializations**.

```javascript
// This code works!
console.log(myName);  // undefined (not ReferenceError!)
var myName = "John";

// Behind the scenes, JavaScript treats it like this:
var myName;           // Declaration hoisted
console.log(myName);  // undefined
myName = "John";      // Assignment stays in place
```

**Key Point**: Hoisting happens during the compilation phase, before the code is executed.

---

## How Hoisting Works

### The Two Phases

JavaScript code execution happens in two phases:

1. **Creation Phase** (Compilation)
   - Memory is allocated for variables and functions
   - Declarations are hoisted
   - Variables are initialized with `undefined`
   - Functions are stored with their entire definition

2. **Execution Phase**
   - Code runs line by line
   - Values are assigned to variables
   - Functions are executed

### Visual Representation

```javascript
// What you write
console.log(x);
var x = 5;
greet();

function greet() {
  console.log("Hello!");
}

// How JavaScript sees it (conceptually)
function greet() {      // Function declaration hoisted to top
  console.log("Hello!");
}

var x;                  // Variable declaration hoisted
console.log(x);         // undefined
x = 5;                  // Assignment happens here
greet();                // "Hello!"
```

---

## Variable Hoisting

### `var` Hoisting

Variables declared with `var` are hoisted and initialized with `undefined`.

```javascript
console.log(name);  // undefined (not ReferenceError)
var name = "Alice";
console.log(name);  // "Alice"

// JavaScript interprets this as:
var name;           // Hoisted to top, initialized with undefined
console.log(name);  // undefined
name = "Alice";
console.log(name);  // "Alice"
```

### `let` and `const` Hoisting

Variables declared with `let` and `const` are hoisted but NOT initialized. Accessing them before declaration causes a ReferenceError. This period is called the **Temporal Dead Zone (TDZ)**.

```javascript
console.log(age);   // ReferenceError: Cannot access 'age' before initialization
let age = 25;

console.log(city);  // ReferenceError: Cannot access 'city' before initialization
const city = "Mumbai";
```

**Why?** `let` and `const` are hoisted but remain uninitialized until their declaration is reached.

```javascript
// Temporal Dead Zone Example
{
  // TDZ starts
  console.log(x);  // ReferenceError
  // TDZ continues
  let x = 10;      // TDZ ends
  console.log(x);  // 10
}
```

### Comparison Table

| Feature | var | let | const |
|---------|-----|-----|-------|
| Hoisted? | Yes | Yes | Yes |
| Initialized on hoisting? | Yes (undefined) | No | No |
| Temporal Dead Zone? | No | Yes | Yes |
| Can access before declaration? | Yes (undefined) | No (ReferenceError) | No (ReferenceError) |
| Re-assignable? | Yes | Yes | No |

---

## Function Hoisting

### Function Declarations

Function declarations are fully hoisted - both name and definition.

```javascript
// This works!
greet();  // "Hello!"

function greet() {
  console.log("Hello!");
}

// JavaScript sees it as:
function greet() {      // Entire function hoisted
  console.log("Hello!");
}
greet();  // "Hello!"
```

**Multiple function declarations:**

```javascript
sayHi();  // "Second definition"

function sayHi() {
  console.log("First definition");
}

function sayHi() {
  console.log("Second definition");
}

// The last definition wins because all are hoisted,
// and the second one overwrites the first
```

### Function Expressions

Function expressions are NOT hoisted like function declarations. They follow variable hoisting rules.

```javascript
// This throws an error!
greet();  // TypeError: greet is not a function

var greet = function() {
  console.log("Hello!");
};

// JavaScript sees it as:
var greet;              // Only declaration hoisted, initialized with undefined
greet();                // TypeError: undefined is not a function
greet = function() {    // Assignment happens here
  console.log("Hello!");
};
```

**With let/const:**

```javascript
sayHello();  // ReferenceError: Cannot access 'sayHello' before initialization

const sayHello = function() {
  console.log("Hello!");
};
```

### Arrow Functions

Arrow functions are function expressions, so they follow the same hoisting rules.

```javascript
greet();  // ReferenceError: Cannot access 'greet' before initialization

const greet = () => {
  console.log("Hello!");
};
```

### Function Declaration vs Expression

```javascript
// ✅ Function Declaration - Works!
hoistedFunction();  // "I'm hoisted!"

function hoistedFunction() {
  console.log("I'm hoisted!");
}

// ❌ Function Expression - Doesn't work!
nonHoistedFunction();  // TypeError

var nonHoistedFunction = function() {
  console.log("I'm not hoisted!");
};

// ❌ Arrow Function - Doesn't work!
arrowFunction();  // ReferenceError

const arrowFunction = () => {
  console.log("I'm not hoisted!");
};
```

---

## Class Hoisting

Classes are hoisted but remain uninitialized (like `let` and `const`). They are in the temporal dead zone until the declaration is evaluated.

```javascript
// This doesn't work!
const person = new Person();  // ReferenceError: Cannot access 'Person' before initialization

class Person {
  constructor(name) {
    this.name = name;
  }
}

// This works!
class Animal {
  constructor(name) {
    this.name = name;
  }
}

const dog = new Animal("Buddy");  // ✅ Works
```

---

## Interview Questions

### Question 1: What is hoisting? Explain with examples.

**Answer:**

Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope before code execution. Only **declarations** are hoisted, not **initializations**.

```javascript
// Variable hoisting
console.log(x);  // undefined (not ReferenceError)
var x = 5;
console.log(x);  // 5

// Function hoisting
greet();  // "Hello!"
function greet() {
  console.log("Hello!");
}

// Behind the scenes:
var x;
function greet() {
  console.log("Hello!");
}

console.log(x);  // undefined
greet();         // "Hello!"
x = 5;
console.log(x);  // 5
```

**Key Points:**
- Hoisting happens during compilation phase
- `var` declarations are hoisted and initialized with `undefined`
- Function declarations are fully hoisted
- `let`, `const`, and classes are hoisted but not initialized (Temporal Dead Zone)

---

### Question 2: What will be the output of this code?

```javascript
var x = 10;

function test() {
  console.log(x);
  var x = 20;
  console.log(x);
}

test();
```

**Answer:**

Output:
```
undefined
20
```

**Explanation:**

The local `var x` inside `test()` is hoisted to the top of the function scope, shadowing the global `x`.

```javascript
var x = 10;

function test() {
  var x;           // Hoisted, initialized with undefined
  console.log(x);  // undefined (not 10!)
  x = 20;
  console.log(x);  // 20
}

test();
```

**Why not 10 then 20?** Because the local `var x` declaration is hoisted, creating a local variable that shadows the global one. Before assignment, it's `undefined`.

---

### Question 3: Difference between `var`, `let`, and `const` hoisting?

**Answer:**

```javascript
// var - Hoisted and initialized with undefined
console.log(a);  // undefined
var a = 10;

// let - Hoisted but not initialized (TDZ)
console.log(b);  // ReferenceError: Cannot access 'b' before initialization
let b = 20;

// const - Hoisted but not initialized (TDZ)
console.log(c);  // ReferenceError: Cannot access 'c' before initialization
const c = 30;
```

**Comparison:**

| Aspect | var | let | const |
|--------|-----|-----|-------|
| Hoisted? | Yes | Yes | Yes |
| Initialized on hoisting? | Yes (undefined) | No | No |
| TDZ? | No | Yes | Yes |
| Can use before declaration? | Yes (undefined) | No (ReferenceError) | No (ReferenceError) |
| Scope | Function | Block | Block |

**Temporal Dead Zone Example:**

```javascript
{
  // TDZ starts
  console.log(x);  // ReferenceError
  // TDZ continues
  let x = 10;      // TDZ ends
  console.log(x);  // 10
}
```

---

### Question 4: What will be the output?

```javascript
function test() {
  console.log(a);
  console.log(foo());

  var a = 1;
  function foo() {
    return 2;
  }
}

test();
```

**Answer:**

Output:
```
undefined
2
```

**Explanation:**

Both the variable `a` and function `foo` are hoisted:

```javascript
function test() {
  var a;           // Variable hoisted, initialized with undefined
  function foo() {  // Function fully hoisted
    return 2;
  }

  console.log(a);    // undefined
  console.log(foo()); // 2

  a = 1;
}

test();
```

- `a` is hoisted as `undefined`
- `foo` is fully hoisted with its definition
- Function declarations are prioritized over variable declarations

---

### Question 5: What is the Temporal Dead Zone (TDZ)?

**Answer:**

The **Temporal Dead Zone** is the period between entering scope and variable declaration where the variable cannot be accessed. It exists for `let`, `const`, and `class`.

```javascript
{
  // TDZ starts for 'x'
  console.log(x);  // ReferenceError: Cannot access 'x' before initialization

  // TDZ continues

  let x = 10;  // TDZ ends

  // Now x can be used
  console.log(x);  // 10
}
```

**Why does TDZ exist?**
- Catches errors early (accessing before declaration is likely a bug)
- Makes code more predictable
- Prevents issues from `var` hoisting

**TDZ with function parameters:**

```javascript
function test(a = b, b) {
  // b is in TDZ when a tries to use it
}

test(undefined, 1);  // ReferenceError: Cannot access 'b' before initialization
```

**Valid example:**

```javascript
function test(a, b = a) {
  // a is already initialized when b uses it
  console.log(a, b);
}

test(1);  // 1, 1
```

---

### Question 6: Function declaration vs function expression hoisting?

**Answer:**

**Function Declaration** - Fully hoisted (name + definition):

```javascript
// ✅ Works!
greet();  // "Hello from declaration"

function greet() {
  console.log("Hello from declaration");
}
```

**Function Expression** - Only variable name hoisted:

```javascript
// ❌ Doesn't work!
greet();  // TypeError: greet is not a function

var greet = function() {
  console.log("Hello from expression");
};

// JavaScript sees:
var greet;           // Only declaration hoisted (undefined)
greet();             // TypeError: undefined is not a function
greet = function() { // Assignment happens here
  console.log("Hello from expression");
};
```

**With let/const:**

```javascript
sayHi();  // ReferenceError: Cannot access 'sayHi' before initialization

const sayHi = function() {
  console.log("Hi!");
};
```

**Summary:**

| Type | Hoisted? | Can call before declaration? |
|------|----------|------------------------------|
| Function Declaration | Fully | Yes ✅ |
| Function Expression (var) | Variable only | No (TypeError) |
| Function Expression (let/const) | Variable only | No (ReferenceError) |
| Arrow Function | No (follows let/const rules) | No (ReferenceError) |

---

### Question 7: What will be the output?

```javascript
var a = 1;

function test() {
  a = 10;
  return;
  function a() {}
}

test();
console.log(a);
```

**Answer:**

Output: `1`

**Explanation:**

Function declaration `function a() {}` is hoisted to the top of `test()` and creates a local variable `a`. The assignment `a = 10` modifies this local `a`, not the global one.

```javascript
var a = 1;

function test() {
  function a() {}  // Hoisted - creates local 'a'
  a = 10;          // Modifies local 'a', not global
  return;
}

test();
console.log(a);  // 1 (global 'a' unchanged)
```

---

### Question 8: Explain this output:

```javascript
console.log(typeof myFunc);
console.log(typeof myVar);

var myVar = "Hello";
function myFunc() {
  return "World";
}
```

**Answer:**

Output:
```
function
undefined
```

**Explanation:**

```javascript
// After hoisting:
function myFunc() {    // Function fully hoisted
  return "World";
}
var myVar;             // Variable hoisted, value is undefined

console.log(typeof myFunc);  // "function"
console.log(typeof myVar);   // "undefined"

myVar = "Hello";
```

- `myFunc` is a function declaration, fully hoisted
- `myVar` is hoisted but only initialized as `undefined`
- `typeof undefined` returns `"undefined"`

---

## Common Pitfalls

### 1. Assuming `let` and `const` aren't hoisted

**Misconception:** "let and const are not hoisted"

**Reality:** They ARE hoisted, but not initialized (TDZ).

```javascript
// This proves let is hoisted
let x = 1;

{
  console.log(x);  // ReferenceError (not 1!)
  let x = 2;
}

// If let wasn't hoisted, it would print 1 (from outer scope)
// But it throws ReferenceError because local let is hoisted but in TDZ
```

### 2. Function expressions and declarations confusion

```javascript
// ❌ This doesn't work
sayHi();  // TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi!");
};

// ✅ This works
sayHello();  // "Hello!"

function sayHello() {
  console.log("Hello!");
}
```

### 3. Variable shadowing

```javascript
var name = "Global";

function test() {
  console.log(name);  // undefined (not "Global"!)
  var name = "Local";
  console.log(name);  // "Local"
}

test();

// Local var name shadows global, and is hoisted as undefined
```

### 4. Hoisting in loops

```javascript
// ❌ All functions reference the same i
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // 3, 3, 3
  }, 100);
}

// ✅ Use let for block scope
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // 0, 1, 2
  }, 100);
}
```

### 5. Class hoisting

```javascript
// ❌ Doesn't work
const p = new Person();  // ReferenceError

class Person {
  constructor(name) {
    this.name = name;
  }
}

// ✅ Declare first
class Person {
  constructor(name) {
    this.name = name;
  }
}

const p = new Person("John");
```

---

## Best Practices

### 1. Declare variables at the top

```javascript
// ✅ Good - explicit and clear
function process() {
  let data;
  let result;
  let error;

  // ... rest of the code
}

// ❌ Bad - declarations scattered
function process() {
  // some code
  let data = getData();
  // more code
  let result = processData(data);
  // even more code
  let error = null;
}
```

### 2. Use `let` and `const` instead of `var`

```javascript
// ✅ Good - no hoisting confusion
const MAX_SIZE = 100;
let count = 0;

// ❌ Bad - var hoisting can cause bugs
var count = 0;
```

### 3. Prefer function declarations for named functions

```javascript
// ✅ Good - can be called anywhere
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

const total = calculateTotal(cartItems);

// ⚠️ OK but less flexible
const calculateTotal = function(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

### 4. Use function expressions for callbacks

```javascript
// ✅ Good - clear intent
array.map(function(item) {
  return item * 2;
});

// ✅ Better - arrow function
array.map(item => item * 2);
```

### 5. Avoid relying on hoisting

```javascript
// ❌ Bad - relies on hoisting
function test() {
  x = 10;
  console.log(x);
  var x;
}

// ✅ Good - explicit and clear
function test() {
  var x;
  x = 10;
  console.log(x);
}

// ✅ Better - use let/const
function test() {
  let x = 10;
  console.log(x);
}
```

### 6. Initialize variables when declaring

```javascript
// ✅ Good
let count = 0;
let items = [];
let user = null;

// ❌ Bad - uninitialized
let count;
let items;
let user;
// ... many lines later
count = 0;
```

---

## Summary

### Key Takeaways

1. **Hoisting moves declarations** to the top of scope, not initializations
2. **var** is hoisted and initialized with `undefined`
3. **let/const** are hoisted but not initialized (TDZ)
4. **Function declarations** are fully hoisted
5. **Function expressions** follow variable hoisting rules
6. **Classes** are hoisted but not initialized

### Hoisting Behavior

| Declaration Type | Hoisted? | Initialized? | Accessible Before Declaration? |
|-----------------|----------|--------------|--------------------------------|
| `var` | Yes | Yes (undefined) | Yes (undefined) |
| `let` | Yes | No (TDZ) | No (ReferenceError) |
| `const` | Yes | No (TDZ) | No (ReferenceError) |
| function declaration | Yes | Yes (fully) | Yes |
| function expression | Variable only | Depends on var/let/const | No |
| class | Yes | No (TDZ) | No (ReferenceError) |

### Interview Tips

- Explain both phases: creation (hoisting) and execution
- Mention Temporal Dead Zone for let/const
- Give examples showing var vs let/const differences
- Explain function declaration vs expression hoisting
- Know common gotchas (variable shadowing, loop issues)

### Best Practices

1. Use `let` and `const` instead of `var`
2. Declare variables at the top of their scope
3. Initialize variables when declaring them
4. Use function declarations for named functions
5. Don't rely on hoisting behavior
6. Be aware of TDZ with let/const/class

---

**Happy Learning! Understanding hoisting will help you avoid many JavaScript pitfalls! 🚀**
