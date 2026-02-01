# Closures in JavaScript

## Table of Contents
1. [What is a Closure?](#what-is-a-closure)
2. [How Closures Work](#how-closures-work)
3. [Practical Examples](#practical-examples)
4. [Common Use Cases](#common-use-cases)
5. [Interview Questions](#interview-questions)
6. [Common Pitfalls](#common-pitfalls)
7. [Best Practices](#best-practices)

---

## What is a Closure?

**Definition**: A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.

**Simple Explanation**: When a function is created, it "remembers" the environment in which it was created. It can access variables from that environment even when executed elsewhere.

```javascript
function outer() {
  let count = 0;  // Variable in outer scope

  function inner() {
    count++;  // inner() can access count
    console.log(count);
  }

  return inner;
}

const counter = outer();
counter();  // 1
counter();  // 2
counter();  // 3

// inner() still has access to 'count' even though outer() has finished executing!
```

**Why is this special?**
Normally, when a function finishes executing, its local variables are garbage collected. But with closures, the inner function keeps a reference to those variables, so they stay alive.

---

## How Closures Work

### The Scope Chain

JavaScript uses lexical scoping (also called static scoping), which means inner functions have access to variables in their outer functions.

```javascript
const global = "I'm global";

function level1() {
  const level1Var = "I'm in level 1";

  function level2() {
    const level2Var = "I'm in level 2";

    function level3() {
      // This function has access to ALL outer scopes
      console.log(global);      // Accessible
      console.log(level1Var);   // Accessible
      console.log(level2Var);   // Accessible
    }

    return level3;
  }

  return level2();
}

const myFunc = level1();
myFunc();
// Output:
// I'm global
// I'm in level 1
// I'm in level 2
```

### Visual Representation

```
┌─────────────────────────────────────┐
│ Global Scope                        │
│  global = "I'm global"              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ level1() Scope              │   │
│  │  level1Var = "I'm in level1"│   │
│  │                             │   │
│  │  ┌─────────────────────┐   │   │
│  │  │ level2() Scope      │   │   │
│  │  │  level2Var = "..."  │   │   │
│  │  │                     │   │   │
│  │  │  ┌──────────────┐  │   │   │
│  │  │  │ level3()     │  │   │   │
│  │  │  │ Can access:  │  │   │   │
│  │  │  │ - global     │  │   │   │
│  │  │  │ - level1Var  │  │   │   │
│  │  │  │ - level2Var  │  │   │   │
│  │  │  └──────────────┘  │   │   │
│  │  └─────────────────────┘   │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Practical Examples

### Example 1: Data Privacy / Private Variables

Closures allow you to create private variables that can't be accessed directly.

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // Private variable

  return {
    deposit: function(amount) {
      balance += amount;
      console.log(`Deposited $${amount}. New balance: $${balance}`);
    },

    withdraw: function(amount) {
      if (amount > balance) {
        console.log("Insufficient funds!");
      } else {
        balance -= amount;
        console.log(`Withdrew $${amount}. New balance: $${balance}`);
      }
    },

    getBalance: function() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(1000);
myAccount.deposit(500);   // Deposited $500. New balance: $1500
myAccount.withdraw(300);  // Withdrew $300. New balance: $1200
console.log(myAccount.getBalance());  // 1200

// Can't access balance directly
console.log(myAccount.balance);  // undefined

// Can't modify balance directly
myAccount.balance = 999999;  // Doesn't work!
console.log(myAccount.getBalance());  // Still 1200
```

### Example 2: Function Factory

Use closures to create customized functions.

```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5));      // 10
console.log(triple(5));      // 15
console.log(quadruple(5));   // 20
```

**Another Example: Greeting Generator**

```javascript
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
const sayNamaste = createGreeter("Namaste");

console.log(sayHello("John"));     // Hello, John!
console.log(sayHi("Sarah"));       // Hi, Sarah!
console.log(sayNamaste("Rahul"));  // Namaste, Rahul!
```

### Example 3: Event Handlers

Closures are commonly used in event handlers to maintain state.

```javascript
function setupButton(buttonId) {
  let clickCount = 0;  // Private counter

  const button = document.getElementById(buttonId);

  button.addEventListener('click', function() {
    clickCount++;
    console.log(`Button clicked ${clickCount} times`);
  });
}

setupButton('myButton');
// Each click increments the counter
// The clickCount variable is preserved between clicks
```

### Example 4: Memoization (Caching)

Use closures to cache expensive function results.

```javascript
function createMemoizedFunction() {
  const cache = {};  // Private cache

  return function(n) {
    if (n in cache) {
      console.log(`Returning cached result for ${n}`);
      return cache[n];
    }

    console.log(`Calculating result for ${n}`);
    const result = n * n;  // Expensive operation (simulated)
    cache[n] = result;
    return result;
  };
}

const memoizedSquare = createMemoizedFunction();

console.log(memoizedSquare(5));  // Calculating result for 5 -> 25
console.log(memoizedSquare(5));  // Returning cached result for 5 -> 25
console.log(memoizedSquare(10)); // Calculating result for 10 -> 100
console.log(memoizedSquare(10)); // Returning cached result for 10 -> 100
```

---

## Common Use Cases

### 1. Module Pattern

Create modules with private and public methods.

```javascript
const Calculator = (function() {
  // Private variables
  let result = 0;

  // Private function
  function log(operation, value) {
    console.log(`${operation} ${value}, result: ${result}`);
  }

  // Public API
  return {
    add: function(num) {
      result += num;
      log('Added', num);
      return this;
    },

    subtract: function(num) {
      result -= num;
      log('Subtracted', num);
      return this;
    },

    multiply: function(num) {
      result *= num;
      log('Multiplied by', num);
      return this;
    },

    getResult: function() {
      return result;
    },

    reset: function() {
      result = 0;
      console.log('Calculator reset');
      return this;
    }
  };
})();

// Usage
Calculator.add(10).multiply(2).subtract(5);
console.log(Calculator.getResult());  // 15
Calculator.reset();
```

### 2. Debouncing

Delay function execution until after a certain time has passed.

```javascript
function debounce(func, delay) {
  let timeoutId;  // Preserved by closure

  return function(...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);

    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage: Search as user types
const searchInput = document.getElementById('search');
const handleSearch = debounce(function(e) {
  console.log('Searching for:', e.target.value);
  // Make API call here
}, 500);

searchInput.addEventListener('input', handleSearch);
// Function only executes 500ms after user stops typing
```

### 3. Once Function

Ensure a function only runs once.

```javascript
function once(func) {
  let hasRun = false;
  let result;

  return function(...args) {
    if (!hasRun) {
      result = func.apply(this, args);
      hasRun = true;
    }
    return result;
  };
}

const initializeApp = once(function() {
  console.log('App initialized!');
  return { status: 'ready' };
});

console.log(initializeApp());  // App initialized! -> { status: 'ready' }
console.log(initializeApp());  // { status: 'ready' } (doesn't run again)
console.log(initializeApp());  // { status: 'ready' } (doesn't run again)
```

### 4. Iterator Pattern

```javascript
function createIterator(array) {
  let index = 0;

  return {
    next: function() {
      if (index < array.length) {
        return { value: array[index++], done: false };
      }
      return { value: undefined, done: true };
    },

    hasNext: function() {
      return index < array.length;
    },

    reset: function() {
      index = 0;
    }
  };
}

const fruits = ['Apple', 'Banana', 'Mango', 'Orange'];
const iterator = createIterator(fruits);

console.log(iterator.next());  // { value: 'Apple', done: false }
console.log(iterator.next());  // { value: 'Banana', done: false }
console.log(iterator.next());  // { value: 'Mango', done: false }
console.log(iterator.next());  // { value: 'Orange', done: false }
console.log(iterator.next());  // { value: undefined, done: true }

iterator.reset();
console.log(iterator.next());  // { value: 'Apple', done: false }
```

---

## Interview Questions

### Question 1: What is a closure? Explain with an example.

**Answer:**

A closure is a function that retains access to its lexical scope even when the function is executed outside that scope. In simpler terms, a closure gives you access to an outer function's scope from an inner function.

```javascript
function outer() {
  const message = "Hello from outer!";

  function inner() {
    console.log(message);  // Can access message
  }

  return inner;
}

const myFunc = outer();
myFunc();  // "Hello from outer!"
// inner() still has access to 'message' even though outer() has finished
```

**Key Points:**
- Closures are created every time a function is created
- They allow private variables (data encapsulation)
- They preserve the state between function calls
- Commonly used in callbacks, event handlers, and functional programming

---

### Question 2: What will be the output of this code?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

**Answer:**

Output will be:
```
3
3
3
```

**Why?**
- `var` has function scope, not block scope
- By the time setTimeout callbacks execute (after 1 second), the loop has finished
- All three functions share the same `i` variable, which is now 3

**How to fix it?**

**Solution 1: Use `let` (Block Scope)**
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Output: 0, 1, 2
// 'let' creates a new binding for each iteration
```

**Solution 2: Use IIFE (Immediately Invoked Function Expression)**
```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 1000);
  })(i);
}
// Output: 0, 1, 2
// IIFE creates a new scope with its own copy of i (as j)
```

**Solution 3: Use bind()**
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(null, i), 1000);
}
// Output: 0, 1, 2
```

---

### Question 3: What are the advantages of closures?

**Answer:**

1. **Data Privacy / Encapsulation**
   - Create private variables that can't be accessed directly
   ```javascript
   function createCounter() {
     let count = 0;  // Private
     return {
       increment: () => ++count,
       getCount: () => count
     };
   }
   ```

2. **Function Factory**
   - Create specialized functions dynamically
   ```javascript
   function multiply(x) {
     return function(y) {
       return x * y;
     };
   }
   const double = multiply(2);
   ```

3. **Maintain State**
   - Preserve state between function calls
   ```javascript
   function setupGame() {
     let score = 0;
     return {
       addPoints: (points) => score += points,
       getScore: () => score
     };
   }
   ```

4. **Callbacks and Event Handlers**
   - Maintain context in asynchronous code
   ```javascript
   function setupButton(id) {
     let clicks = 0;
     document.getElementById(id).onclick = () => {
       console.log(++clicks);
     };
   }
   ```

5. **Currying and Partial Application**
   ```javascript
   function curry(a) {
     return function(b) {
       return function(c) {
         return a + b + c;
       };
     };
   }
   ```

---

### Question 4: What are the disadvantages of closures?

**Answer:**

1. **Memory Consumption**
   - Closures keep variables in memory as long as the inner function exists
   - Can lead to memory leaks if not managed properly

   ```javascript
   function createHeavyClosure() {
     const largeArray = new Array(1000000).fill('data');  // Takes up memory

     return function() {
       // largeArray stays in memory even if we don't use it
       return "Hello";
     };
   }
   ```

2. **Performance Overhead**
   - Accessing variables through the scope chain is slower than accessing local variables
   - Each closure creates a new scope, which takes time and memory

3. **Memory Leaks**
   - If not careful, closures can prevent garbage collection

   ```javascript
   function attachHandler() {
     const element = document.getElementById('button');
     const data = new Array(1000000);  // Large data

     element.onclick = function() {
       console.log('Clicked!');
       // 'data' is kept in memory even though we don't use it
     };
   }

   // Fix: Explicitly remove reference
   function attachHandlerFixed() {
     const element = document.getElementById('button');
     const data = new Array(1000000);

     element.onclick = function() {
       console.log('Clicked!');
     };

     // Clear reference to large data
     data = null;
   }
   ```

4. **Debugging Difficulty**
   - Closures can make debugging harder because of nested scopes
   - Variables might not be what you expect due to scope chain

---

### Question 5: Explain the difference between closure and scope.

**Answer:**

**Scope** determines the visibility/accessibility of variables. It defines where variables can be accessed.

**Closure** is a feature where an inner function has access to the outer function's variables (scope chain) even after the outer function has returned.

```javascript
// SCOPE Example
function example() {
  let x = 10;  // x is in the scope of example()

  if (true) {
    let y = 20;  // y is in the scope of this block
    console.log(x);  // Can access x (outer scope)
  }

  console.log(y);  // ERROR! y is not in this scope
}

// CLOSURE Example
function outer() {
  let x = 10;  // x is in outer's scope

  function inner() {
    console.log(x);  // inner has access to outer's scope
  }

  return inner;
}

const myFunc = outer();
myFunc();  // 10
// This is closure: inner() still has access to x even though outer() finished
```

**Key Differences:**

| Scope | Closure |
|-------|---------|
| Determines accessibility of variables | A function that accesses outer variables |
| Created when code block is executed | Created when nested function is returned/passed |
| Automatically garbage collected | Keeps outer variables in memory |
| About visibility rules | About preserving scope chain |

---

### Question 6: How do you create private variables in JavaScript?

**Answer:**

Use closures to create private variables that can't be accessed directly.

```javascript
function createPerson(name, age) {
  // Private variables
  let _name = name;
  let _age = age;
  let _salary = 0;

  // Public methods (privileged methods)
  return {
    getName: function() {
      return _name;
    },

    getAge: function() {
      return _age;
    },

    setAge: function(newAge) {
      if (newAge > 0 && newAge < 150) {
        _age = newAge;
      } else {
        throw new Error('Invalid age!');
      }
    },

    setSalary: function(amount) {
      if (amount >= 0) {
        _salary = amount;
      }
    },

    getSalary: function() {
      return _salary;
    },

    introduce: function() {
      return `Hi, I'm ${_name} and I'm ${_age} years old.`;
    }
  };
}

const person = createPerson('John', 30);

console.log(person.getName());  // John
console.log(person.getAge());   // 30

// Can't access private variables directly
console.log(person._name);      // undefined
console.log(person._age);       // undefined
console.log(person._salary);    // undefined

// Can only modify through public methods
person.setAge(31);
console.log(person.getAge());   // 31

person.setSalary(50000);
console.log(person.getSalary()); // 50000

console.log(person.introduce()); // Hi, I'm John and I'm 31 years old.
```

**Using Class Syntax with Closures:**

```javascript
class Counter {
  constructor() {
    let count = 0;  // Private variable

    this.increment = () => ++count;
    this.decrement = () => --count;
    this.getCount = () => count;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
console.log(counter.getCount());  // 2
console.log(counter.count);        // undefined (private)
```

---

## Common Pitfalls

### 1. Loop Closure Problem

**Problem:**
```javascript
var functions = [];

for (var i = 0; i < 3; i++) {
  functions.push(function() {
    console.log(i);
  });
}

functions[0]();  // 3 (not 0!)
functions[1]();  // 3 (not 1!)
functions[2]();  // 3 (not 2!)
```

**Why?** All functions share the same `i` variable reference.

**Solution 1: Use `let`**
```javascript
var functions = [];

for (let i = 0; i < 3; i++) {  // Use 'let' instead of 'var'
  functions.push(function() {
    console.log(i);
  });
}

functions[0]();  // 0
functions[1]();  // 1
functions[2]();  // 2
```

**Solution 2: IIFE**
```javascript
var functions = [];

for (var i = 0; i < 3; i++) {
  functions.push((function(j) {
    return function() {
      console.log(j);
    };
  })(i));
}

functions[0]();  // 0
functions[1]();  // 1
functions[2]();  // 2
```

### 2. Memory Leaks

**Problem:**
```javascript
function assignHandler() {
  const element = document.getElementById('button');
  const largeData = new Array(1000000).fill('x');

  element.onclick = function() {
    console.log(element.id);
  };

  // largeData stays in memory because of closure!
}
```

**Solution:**
```javascript
function assignHandler() {
  const element = document.getElementById('button');
  const id = element.id;  // Copy only what you need
  const largeData = new Array(1000000).fill('x');

  element.onclick = function() {
    console.log(id);  // Use copied value
  };

  // largeData can now be garbage collected
}
```

### 3. Accidental Global Variables

**Problem:**
```javascript
function createCounter() {
  count = 0;  // Missing 'let/const' - creates global variable!

  return function() {
    return ++count;
  };
}
```

**Solution:**
```javascript
function createCounter() {
  let count = 0;  // Always use let/const

  return function() {
    return ++count;
  };
}
```

---

## Best Practices

1. **Use `let` and `const` Instead of `var`**
   ```javascript
   // Good
   for (let i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 100);
   }
   ```

2. **Minimize Closure Scope**
   - Only close over variables you actually need
   ```javascript
   // Bad - closes over unnecessary variables
   function create(a, b, c, largeArray) {
     return function() {
       return a + b;  // Only needs a and b
     };
   }

   // Good - extract only what you need
   function create(a, b, c, largeArray) {
     const sum = a + b;
     return function() {
       return sum;
     };
   }
   ```

3. **Be Aware of Memory**
   - Remove event listeners when done
   - Don't keep unnecessary references
   ```javascript
   const handler = () => console.log('clicked');
   button.addEventListener('click', handler);

   // Later...
   button.removeEventListener('click', handler);
   ```

4. **Use Closures for Encapsulation**
   ```javascript
   const module = (function() {
     // Private
     let private = 'secret';

     // Public API
     return {
       get: () => private,
       set: (val) => private = val
     };
   })();
   ```

5. **Document Complex Closures**
   ```javascript
   /**
    * Creates a debounced function that delays invoking func
    * until after wait milliseconds have elapsed since the last call.
    * @param {Function} func - The function to debounce
    * @param {number} wait - Milliseconds to wait
    * @return {Function} Debounced function
    */
   function debounce(func, wait) {
     let timeoutId;
     return function(...args) {
       clearTimeout(timeoutId);
       timeoutId = setTimeout(() => func.apply(this, args), wait);
     };
   }
   ```

---

## Summary

**Key Takeaways:**

1. **Closures preserve scope** - Inner functions remember their outer scope
2. **Created automatically** - Every function creates a closure
3. **Enable privacy** - Create private variables and methods
4. **Power functional programming** - Currying, partial application, function factories
5. **Watch for pitfalls** - Loop closures, memory leaks, performance
6. **Use `let/const`** - Avoid var-related closure issues

**Common Use Cases:**
- Data privacy and encapsulation
- Function factories and currying
- Event handlers and callbacks
- Memoization and caching
- Module pattern
- Debouncing and throttling

**Interview Tips:**
- Always explain scope chain when discussing closures
- Mention both advantages and disadvantages
- Give practical examples (counter, private variables)
- Know how to solve the loop closure problem
- Understand memory implications

---

**Happy Learning! Master closures and you'll understand much of JavaScript's power! 🚀**
