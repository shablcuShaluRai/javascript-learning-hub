# Scope in JavaScript

## Table of Contents
1. [What is Scope?](#what-is-scope)
2. [Types of Scope](#types-of-scope)
3. [Scope Chain](#scope-chain)
4. [Lexical Scope](#lexical-scope)
5. [Block Scope vs Function Scope](#block-scope-vs-function-scope)
6. [Interview Questions](#interview-questions)
7. [Common Pitfalls](#common-pitfalls)
8. [Best Practices](#best-practices)

---

## What is Scope?

**Definition**: Scope determines the accessibility (visibility) of variables, functions, and objects in some particular part of your code during runtime.

**Simple Explanation**: Scope is the context in which variables are declared and can be accessed. It defines where you can use a variable and where you cannot.

```javascript
// Global scope - accessible everywhere
const globalVar = "I'm global!";

function myFunction() {
  // Function scope - accessible only inside this function
  const localVar = "I'm local!";

  console.log(globalVar);  // ✅ Can access global
  console.log(localVar);   // ✅ Can access local
}

myFunction();

console.log(globalVar);  // ✅ Can access global
console.log(localVar);   // ❌ ReferenceError: localVar is not defined
```

**Why is scope important?**
- **Security**: Prevents unauthorized access to variables
- **Namespace management**: Avoids naming conflicts
- **Memory management**: Variables are garbage collected when scope ends
- **Modularity**: Encapsulation and organization of code

---

## Types of Scope

JavaScript has three types of scope:

### 1. Global Scope

Variables declared outside any function or block have global scope.

```javascript
// Global scope
var globalVar1 = "I'm global with var";
let globalVar2 = "I'm global with let";
const globalVar3 = "I'm global with const";

function test() {
  console.log(globalVar1);  // Accessible
  console.log(globalVar2);  // Accessible
  console.log(globalVar3);  // Accessible
}

test();

console.log(globalVar1);  // Accessible
console.log(globalVar2);  // Accessible
console.log(globalVar3);  // Accessible
```

**Global variables in Browser vs Node.js:**

```javascript
// In Browser
var x = 10;
console.log(window.x);  // 10 (var creates property on window object)

let y = 20;
console.log(window.y);  // undefined (let/const don't create window properties)

// In Node.js
var x = 10;
console.log(global.x);  // undefined (different behavior in Node)
```

### 2. Function Scope

Variables declared inside a function are only accessible within that function.

```javascript
function myFunction() {
  var functionVar = "I'm in function scope";
  let functionLet = "Me too!";
  const functionConst = "Me three!";

  console.log(functionVar);    // ✅ Accessible
  console.log(functionLet);    // ✅ Accessible
  console.log(functionConst);  // ✅ Accessible
}

myFunction();

console.log(functionVar);    // ❌ ReferenceError
console.log(functionLet);    // ❌ ReferenceError
console.log(functionConst);  // ❌ ReferenceError
```

**Nested functions:**

```javascript
function outer() {
  const outerVar = "I'm in outer";

  function inner() {
    const innerVar = "I'm in inner";

    console.log(outerVar);  // ✅ Can access outer variable
    console.log(innerVar);  // ✅ Can access own variable
  }

  inner();

  console.log(outerVar);  // ✅ Can access own variable
  console.log(innerVar);  // ❌ ReferenceError - can't access inner variable
}

outer();
```

### 3. Block Scope

Variables declared with `let` and `const` inside a block `{}` are only accessible within that block.

```javascript
{
  let blockLet = "I'm block scoped";
  const blockConst = "Me too!";
  var blockVar = "I'm NOT block scoped";

  console.log(blockLet);    // ✅ Accessible
  console.log(blockConst);  // ✅ Accessible
  console.log(blockVar);    // ✅ Accessible
}

console.log(blockVar);    // ✅ Accessible (var ignores block scope!)
console.log(blockLet);    // ❌ ReferenceError
console.log(blockConst);  // ❌ ReferenceError
```

**Block scope in if statements:**

```javascript
if (true) {
  let x = 10;
  const y = 20;
  var z = 30;
}

console.log(z);  // 30 (var is function-scoped, not block-scoped)
console.log(x);  // ReferenceError
console.log(y);  // ReferenceError
```

**Block scope in for loops:**

```javascript
// With let - each iteration has its own scope
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2

// With var - all iterations share the same scope
for (var j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Output: 3, 3, 3
```

---

## Scope Chain

When JavaScript looks for a variable, it searches in the current scope, then outer scopes, moving up the chain until it finds the variable or reaches the global scope.

```javascript
const global = "I'm global";

function level1() {
  const level1Var = "I'm in level 1";

  function level2() {
    const level2Var = "I'm in level 2";

    function level3() {
      const level3Var = "I'm in level 3";

      // Can access all outer scopes
      console.log(level3Var);  // Own scope
      console.log(level2Var);  // Parent scope
      console.log(level1Var);  // Grandparent scope
      console.log(global);     // Global scope
    }

    level3();
  }

  level2();
}

level1();
```

**Visual Representation:**

```
┌─────────────────────────────────┐
│ Global Scope                    │
│  global = "I'm global"          │
│                                 │
│  ┌─────────────────────────┐   │
│  │ level1() Scope          │   │
│  │  level1Var = "..."      │   │
│  │                         │   │
│  │  ┌─────────────────┐   │   │
│  │  │ level2() Scope  │   │   │
│  │  │  level2Var      │   │   │
│  │  │                 │   │   │
│  │  │  ┌──────────┐  │   │   │
│  │  │  │ level3() │  │   │   │
│  │  │  │ Access:  │  │   │   │
│  │  │  │ level3Var│  │   │   │
│  │  │  │ level2Var│  │   │   │
│  │  │  │ level1Var│  │   │   │
│  │  │  │ global   │  │   │   │
│  │  │  └──────────┘  │   │   │
│  │  └─────────────────┘   │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Scope chain lookup example:**

```javascript
let a = 10;

function outer() {
  let b = 20;

  function inner() {
    let c = 30;

    console.log(a);  // Looks in: inner → outer → global → Found! (10)
    console.log(b);  // Looks in: inner → outer → Found! (20)
    console.log(c);  // Looks in: inner → Found! (30)
    console.log(d);  // Looks in: inner → outer → global → Not found! (ReferenceError)
  }

  inner();
}

outer();
```

---

## Lexical Scope

**Definition**: Lexical scope means that scope is determined by where functions and variables are authored in the code, not where they are called from.

```javascript
function outer() {
  const message = "Hello from outer";

  function inner() {
    console.log(message);  // Accesses message from lexical parent
  }

  return inner;
}

const myFunc = outer();
myFunc();  // "Hello from outer"
// inner() remembers the scope where it was defined, not where it's called
```

**Lexical scope example:**

```javascript
const name = "Global Name";

function displayName() {
  console.log(name);  // Which 'name'? The one from lexical scope!
}

function test() {
  const name = "Test Name";
  displayName();  // "Global Name" (not "Test Name")
}

test();
```

**Why "Global Name"?** Because `displayName` is defined in global scope where `name = "Global Name"`. Lexical scope is determined by where the function is **written**, not where it's **called**.

---

## Block Scope vs Function Scope

### Comparison

```javascript
// Function Scope (var)
function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x);  // 10 - accessible outside if block
}

// Block Scope (let/const)
function testLet() {
  if (true) {
    let y = 20;
  }
  console.log(y);  // ReferenceError - not accessible outside if block
}

testVar();  // Works
testLet();  // Error
```

### var vs let/const

```javascript
// var - function scoped
function testVar() {
  var x = 1;

  if (true) {
    var x = 2;  // Same variable, overwrites previous value
    console.log(x);  // 2
  }

  console.log(x);  // 2
}

// let - block scoped
function testLet() {
  let x = 1;

  if (true) {
    let x = 2;  // Different variable, block scoped
    console.log(x);  // 2
  }

  console.log(x);  // 1
}

testVar();
testLet();
```

### Loop Scope

```javascript
// var - no block scope
for (var i = 0; i < 3; i++) {
  // i is in function scope (or global if not in function)
}
console.log(i);  // 3 - still accessible!

// let - block scoped
for (let j = 0; j < 3; j++) {
  // j is block scoped to this loop
}
console.log(j);  // ReferenceError - not accessible!
```

---

## Interview Questions

### Question 1: What is scope in JavaScript?

**Answer:**

Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime. It determines where variables can be accessed or referenced.

**Three types of scope:**

1. **Global Scope** - Accessible everywhere
```javascript
var globalVar = "I'm global";

function test() {
  console.log(globalVar);  // Accessible
}

console.log(globalVar);  // Accessible
```

2. **Function Scope** - Accessible only within the function
```javascript
function test() {
  var localVar = "I'm local";
  console.log(localVar);  // Accessible
}

console.log(localVar);  // ReferenceError
```

3. **Block Scope** - Accessible only within the block (let/const only)
```javascript
{
  let blockVar = "I'm block scoped";
  console.log(blockVar);  // Accessible
}

console.log(blockVar);  // ReferenceError
```

---

### Question 2: What is the difference between var, let, and const in terms of scope?

**Answer:**

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Can redeclare? | Yes | No | No |
| Can reassign? | Yes | Yes | No |
| Hoisted? | Yes (initialized undefined) | Yes (not initialized - TDZ) | Yes (not initialized - TDZ) |

**Examples:**

```javascript
// var - function scoped
function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x);  // 10 - accessible
}

// let - block scoped
function testLet() {
  if (true) {
    let y = 20;
  }
  console.log(y);  // ReferenceError
}

// const - block scoped, can't reassign
function testConst() {
  const z = 30;
  z = 40;  // TypeError: Assignment to constant variable
}
```

---

### Question 3: What is the scope chain?

**Answer:**

The scope chain is the hierarchy of scopes that JavaScript uses to look up variables. When a variable is referenced, JavaScript:
1. Looks in the current scope
2. If not found, looks in the outer scope
3. Continues up the chain until global scope
4. If still not found, throws ReferenceError

```javascript
const global = "Global";

function level1() {
  const level1Var = "Level 1";

  function level2() {
    const level2Var = "Level 2";

    console.log(level2Var);  // Found in level2 (current scope)
    console.log(level1Var);  // Found in level1 (parent scope)
    console.log(global);     // Found in global scope
    console.log(notFound);   // ReferenceError (not in chain)
  }

  level2();
}

level1();
```

---

### Question 4: What is lexical scope?

**Answer:**

Lexical scope (also called static scope) means that the scope of a variable is determined by its position in the source code. Inner functions have access to variables defined in outer functions.

```javascript
function outer() {
  const outerVar = "I'm from outer";

  function inner() {
    // inner can access outerVar because of lexical scoping
    console.log(outerVar);  // "I'm from outer"
  }

  return inner;
}

const myFunc = outer();
myFunc();  // "I'm from outer"
```

**Key point**: The scope is determined by where the function is **defined**, not where it is **called**.

```javascript
const name = "Global";

function printName() {
  console.log(name);
}

function test() {
  const name = "Local";
  printName();  // "Global" (not "Local")
}

test();
```

---

### Question 5: What will be the output?

```javascript
var a = 10;

function outer() {
  var a = 20;

  function inner() {
    var a = 30;
    console.log(a);
  }

  inner();
  console.log(a);
}

outer();
console.log(a);
```

**Answer:**

Output:
```
30
20
10
```

**Explanation:**
- `inner()` prints its own `a` (30)
- `outer()` prints its own `a` (20)
- Global prints its own `a` (10)

Each function has its own scope with its own `a` variable.

---

### Question 6: What is variable shadowing?

**Answer:**

Variable shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope, "shadowing" the outer variable.

```javascript
let x = 10;  // Outer scope

function test() {
  let x = 20;  // Shadows outer x
  console.log(x);  // 20
}

test();
console.log(x);  // 10 (outer x unchanged)
```

**Another example:**

```javascript
const name = "Global";

function outer() {
  const name = "Outer";

  function inner() {
    const name = "Inner";
    console.log(name);  // "Inner" (shadows all outer 'name' variables)
  }

  inner();
  console.log(name);  // "Outer"
}

outer();
console.log(name);  // "Global"
```

---

### Question 7: Explain this output:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

**Answer:**

Output (after 1 second):
```
3
3
3
```

**Why?**
- `var` is function-scoped (not block-scoped)
- All three setTimeout callbacks share the same `i` variable
- By the time callbacks execute, the loop has finished and `i = 3`

**Solution 1: Use let (block scope)**
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Output: 0, 1, 2
// Each iteration has its own 'i'
```

**Solution 2: Use IIFE**
```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 1000);
  })(i);
}
// Output: 0, 1, 2
```

---

### Question 8: What is the difference between global and window object?

**Answer:**

In browsers, `window` is the global object. Variables declared with `var` in global scope become properties of the `window` object.

```javascript
// In Browser
var x = 10;
console.log(window.x);  // 10 (var creates window property)

let y = 20;
console.log(window.y);  // undefined (let doesn't create window property)

const z = 30;
console.log(window.z);  // undefined (const doesn't create window property)

// Implicit global (without var/let/const)
function test() {
  a = 40;  // Creates global variable (bad practice!)
}
test();
console.log(window.a);  // 40
```

**In Node.js:**
```javascript
var x = 10;
console.log(global.x);  // undefined (different behavior)
```

---

## Common Pitfalls

### 1. Accidental Global Variables

```javascript
function test() {
  x = 10;  // No var/let/const - creates global variable!
}

test();
console.log(x);  // 10 (accessible globally!)

// Fix: Always use var/let/const
function test() {
  let x = 10;  // Properly scoped
}
```

### 2. var in Loops

```javascript
// Problem
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3

// Solution: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
```

### 3. Block Scope Confusion

```javascript
// This doesn't work as expected with var
if (true) {
  var x = 10;
}
console.log(x);  // 10 (var ignores block scope!)

// Use let/const for proper block scoping
if (true) {
  let y = 20;
}
console.log(y);  // ReferenceError (as expected)
```

### 4. Variable Shadowing Issues

```javascript
let count = 0;

function increment() {
  let count = 1;  // Shadows outer count
  count++;
  console.log(count);  // 2
}

increment();
console.log(count);  // 0 (outer count unchanged!)
```

### 5. Closure Scope Misunderstanding

```javascript
function createFunctions() {
  var functions = [];

  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log(i);
    });
  }

  return functions;
}

const funcs = createFunctions();
funcs[0]();  // 3 (not 0!)
funcs[1]();  // 3 (not 1!)
funcs[2]();  // 3 (not 2!)
```

---

## Best Practices

### 1. Always Declare Variables

```javascript
// ❌ Bad - creates global
function test() {
  count = 10;
}

// ✅ Good - properly scoped
function test() {
  let count = 10;
}
```

### 2. Use let and const Instead of var

```javascript
// ❌ Bad - function scoped, can cause bugs
var x = 10;

// ✅ Good - block scoped, more predictable
let y = 20;
const z = 30;
```

### 3. Minimize Global Variables

```javascript
// ❌ Bad - pollutes global scope
var config = {};
var utils = {};
var data = {};

// ✅ Good - use module pattern
const App = {
  config: {},
  utils: {},
  data: {}
};
```

### 4. Use Block Scope

```javascript
// ✅ Good - variables scoped to where they're needed
function process(items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // i and item only exist in this block
  }
  // i and item not accessible here
}
```

### 5. Understand Scope Chain

```javascript
// ✅ Good - clear scope hierarchy
function outer() {
  const outerVar = 'outer';

  function inner() {
    const innerVar = 'inner';
    console.log(outerVar, innerVar);  // Both accessible
  }

  inner();
}
```

---

## Summary

### Key Takeaways

1. **Scope determines variable accessibility** - where variables can be accessed
2. **Three types**: Global, Function, Block scope
3. **var is function-scoped**, let/const are block-scoped
4. **Scope chain** - JavaScript looks up the chain for variables
5. **Lexical scope** - determined by where code is written, not called
6. **Variable shadowing** - inner variables can hide outer ones

### Scope Comparison

| Aspect | Global | Function | Block |
|--------|--------|----------|-------|
| Accessibility | Everywhere | Inside function only | Inside block only |
| Created by | Top-level code | function keyword | {} with let/const |
| var behavior | Creates global | Creates function-scoped | Ignores block, uses function scope |
| let/const behavior | Creates global | Creates function-scoped | Creates block-scoped |

### Interview Tips

- Explain all three types of scope with examples
- Show the difference between var, let, and const
- Demonstrate scope chain lookup
- Explain lexical scoping and closures
- Know common pitfalls (loop variables, accidental globals)
- Understand variable shadowing

---

**Happy Learning! Master scope and you'll write better, bug-free JavaScript code! 🚀**
