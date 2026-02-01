# Operators in JavaScript

## Table of Contents
1. [What are Operators?](#what-are-operators)
2. [Arithmetic Operators](#arithmetic-operators)
3. [Assignment Operators](#assignment-operators)
4. [Comparison Operators](#comparison-operators)
5. [Logical Operators](#logical-operators)
6. [String Operators](#string-operators)
7. [Conditional (Ternary) Operator](#conditional-ternary-operator)
8. [Nullish Coalescing & Optional Chaining](#nullish-coalescing--optional-chaining)
9. [Bitwise Operators](#bitwise-operators)
10. [Other Operators](#other-operators)
11. [Interview Questions](#interview-questions)
12. [Common Pitfalls](#common-pitfalls)
13. [Best Practices](#best-practices)

---

## What are Operators?

**Definition**: Operators are symbols that perform operations on operands (values and variables).

**Simple Explanation**: Think of operators as tools that let you do math, compare values, combine conditions, and more.

```javascript
let sum = 10 + 5;      // + is an operator
let isGreater = 10 > 5; // > is an operator
let result = true && false; // && is an operator
```

**Types of Operators:**
- Arithmetic operators (+, -, *, /)
- Assignment operators (=, +=, -=)
- Comparison operators (==, ===, !=, !==)
- Logical operators (&&, ||, !)
- And more...

---

## Arithmetic Operators

Perform mathematical operations.

### Basic Arithmetic

```javascript
let a = 10;
let b = 3;

// Addition
console.log(a + b);  // 13

// Subtraction
console.log(a - b);  // 7

// Multiplication
console.log(a * b);  // 30

// Division
console.log(a / b);  // 3.3333...

// Modulus (remainder)
console.log(a % b);  // 1 (10 divided by 3, remainder is 1)

// Exponentiation (ES6)
console.log(a ** b);  // 1000 (10 to the power of 3)
```

### Increment and Decrement

```javascript
let count = 5;

// Post-increment (returns value, then increments)
console.log(count++);  // 5
console.log(count);    // 6

// Pre-increment (increments, then returns value)
count = 5;
console.log(++count);  // 6
console.log(count);    // 6

// Post-decrement
count = 5;
console.log(count--);  // 5
console.log(count);    // 4

// Pre-decrement
count = 5;
console.log(--count);  // 4
console.log(count);    // 4
```

### Practical Examples

```javascript
// Calculate area of rectangle
let width = 10;
let height = 5;
let area = width * height;
console.log(area);  // 50

// Calculate percentage
let score = 85;
let total = 100;
let percentage = (score / total) * 100;
console.log(percentage);  // 85

// Check if number is even or odd
let num = 7;
if (num % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");  // Prints "Odd"
}

// Round to 2 decimal places
let price = 19.9999;
let rounded = Math.round(price * 100) / 100;
console.log(rounded);  // 20
```

### Operator Precedence

```javascript
// Without parentheses
let result = 10 + 5 * 2;
console.log(result);  // 20 (multiplication happens first)

// With parentheses
result = (10 + 5) * 2;
console.log(result);  // 30

// Complex expression
result = 10 + 5 * 2 - 3;
console.log(result);  // 17
// Order: 5 * 2 = 10, then 10 + 10 = 20, then 20 - 3 = 17
```

---

## Assignment Operators

Assign values to variables.

### Basic Assignment

```javascript
let x = 10;  // Assigns 10 to x
```

### Compound Assignment

```javascript
let num = 10;

// Addition assignment
num += 5;  // Same as: num = num + 5
console.log(num);  // 15

// Subtraction assignment
num -= 3;  // Same as: num = num - 3
console.log(num);  // 12

// Multiplication assignment
num *= 2;  // Same as: num = num * 2
console.log(num);  // 24

// Division assignment
num /= 4;  // Same as: num = num / 4
console.log(num);  // 6

// Modulus assignment
num %= 4;  // Same as: num = num % 4
console.log(num);  // 2

// Exponentiation assignment
num **= 3;  // Same as: num = num ** 3
console.log(num);  // 8
```

### Practical Examples

```javascript
// Accumulator pattern
let total = 0;
total += 10;  // Add 10
total += 20;  // Add 20
total += 30;  // Add 30
console.log(total);  // 60

// Counter
let counter = 0;
counter++;  // Increment by 1
counter++;
counter++;
console.log(counter);  // 3

// Doubling values
let value = 5;
value *= 2;  // Double it
console.log(value);  // 10
```

---

## Comparison Operators

Compare two values and return a boolean (true or false).

### Equality Operators

```javascript
let a = 5;
let b = "5";
let c = 5;

// Loose equality (==) - compares values, allows type coercion
console.log(a == b);   // true (5 == "5" after coercion)
console.log(a == c);   // true

// Strict equality (===) - compares values AND types
console.log(a === b);  // false (number !== string)
console.log(a === c);  // true

// Loose inequality (!=)
console.log(a != b);   // false
console.log(a != 10);  // true

// Strict inequality (!==)
console.log(a !== b);  // true (different types)
console.log(a !== c);  // false
```

### Relational Operators

```javascript
let x = 10;
let y = 20;

// Greater than
console.log(y > x);   // true
console.log(x > y);   // false

// Less than
console.log(x < y);   // true
console.log(y < x);   // false

// Greater than or equal to
console.log(y >= x);  // true
console.log(x >= 10); // true
console.log(x >= 20); // false

// Less than or equal to
console.log(x <= y);  // true
console.log(x <= 10); // true
console.log(x <= 5);  // false
```

### String Comparison

```javascript
// Strings are compared lexicographically (alphabetically)
console.log("apple" < "banana");  // true
console.log("cat" > "dog");       // false
console.log("A" < "a");           // true (uppercase comes before lowercase)

// Comparing numbers as strings
console.log("10" < "2");  // true (lexicographic: "1" < "2")
console.log("10" < "9");  // true (lexicographic: "1" < "9")

// Always convert to numbers for numeric comparison
console.log(Number("10") < Number("2"));  // false (correct!)
```

### Practical Examples

```javascript
// Age verification
let age = 18;
if (age >= 18) {
  console.log("You can vote");
} else {
  console.log("Too young to vote");
}

// Grade checking
let score = 85;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");  // Prints "B"
} else if (score >= 70) {
  console.log("C");
}

// Password validation
let password = "secure123";
if (password.length >= 8) {
  console.log("Password is strong enough");
}
```

---

## Logical Operators

Combine multiple conditions.

### AND Operator (&&)

Returns true if **all** conditions are true.

```javascript
let age = 25;
let hasLicense = true;

// Both conditions must be true
if (age >= 18 && hasLicense) {
  console.log("You can drive");  // Prints
}

// If any condition is false
if (age >= 18 && !hasLicense) {
  console.log("Won't print");
}

// Multiple conditions
let isWeekday = true;
let isBusinessHours = true;
let isOpen = isWeekday && isBusinessHours;
console.log(isOpen);  // true
```

### OR Operator (||)

Returns true if **any** condition is true.

```javascript
let isAdmin = false;
let isModerator = true;

// At least one condition must be true
if (isAdmin || isModerator) {
  console.log("You have permissions");  // Prints
}

// Default values with OR
function greet(name) {
  name = name || "Guest";  // If name is falsy, use "Guest"
  console.log(`Hello, ${name}!`);
}

greet("John");  // "Hello, John!"
greet();        // "Hello, Guest!"
```

### NOT Operator (!)

Inverts a boolean value.

```javascript
let isLoggedIn = false;

// Negate the value
console.log(!isLoggedIn);  // true

if (!isLoggedIn) {
  console.log("Please log in");  // Prints
}

// Double negation converts to boolean
console.log(!!"hello");  // true
console.log(!!0);        // false
console.log(!!"");       // false
```

### Short-circuit Evaluation

```javascript
// AND (&&) - stops at first falsy value
console.log(false && true);        // false (doesn't check second value)
console.log(true && false);        // false
console.log(true && "hello");      // "hello"
console.log(false && "hello");     // false

// Practical use
let user = { name: "John" };
let name = user && user.name;  // "John" (checks user exists first)

user = null;
name = user && user.name;  // null (doesn't try to access user.name)

// OR (||) - stops at first truthy value
console.log(true || false);        // true (doesn't check second value)
console.log(false || true);        // true
console.log(null || "default");    // "default"
console.log("value" || "default"); // "value"

// Practical use - default values
let userInput = "";
let displayName = userInput || "Anonymous";
console.log(displayName);  // "Anonymous"
```

### Combining Logical Operators

```javascript
let age = 25;
let hasTicket = true;
let hasID = true;

// Complex conditions
if (age >= 18 && (hasTicket || hasID)) {
  console.log("You can enter");
}

// Voting eligibility
let isCitizen = true;
let hasRegistered = true;
let canVote = age >= 18 && isCitizen && hasRegistered;
console.log(canVote);  // true
```

---

## String Operators

### Concatenation (+)

```javascript
let firstName = "John";
let lastName = "Doe";

// String concatenation
let fullName = firstName + " " + lastName;
console.log(fullName);  // "John Doe"

// Concatenating with numbers
let text = "The answer is " + 42;
console.log(text);  // "The answer is 42"

// Multiple concatenations
let message = "Hello" + " " + "World" + "!";
console.log(message);  // "Hello World!"
```

### Concatenation Assignment (+=)

```javascript
let message = "Hello";
message += " ";       // "Hello "
message += "World";   // "Hello World"
console.log(message); // "Hello World"

// Building a string
let html = "<div>";
html += "<h1>Title</h1>";
html += "<p>Content</p>";
html += "</div>";
console.log(html);
```

### Template Literals (Better Alternative)

```javascript
let name = "Alice";
let age = 25;

// Old way (concatenation)
let old = "My name is " + name + " and I'm " + age + " years old.";

// New way (template literals)
let modern = `My name is ${name} and I'm ${age} years old.`;

console.log(modern);  // "My name is Alice and I'm 25 years old."

// Multi-line strings
let html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Expressions in template literals
let price = 19.99;
let quantity = 3;
let total = `Total: $${price * quantity}`;
console.log(total);  // "Total: $59.97"
```

---

## Conditional (Ternary) Operator

Shorthand for if-else statements.

### Basic Syntax

```javascript
// condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);  // "Adult"

// Equivalent if-else
let status2;
if (age >= 18) {
  status2 = "Adult";
} else {
  status2 = "Minor";
}
```

### Practical Examples

```javascript
// Even or odd
let num = 7;
let type = num % 2 === 0 ? "Even" : "Odd";
console.log(type);  // "Odd"

// Discount calculation
let isMember = true;
let price = 100;
let finalPrice = isMember ? price * 0.9 : price;
console.log(finalPrice);  // 90

// Access control
let isLoggedIn = false;
let message = isLoggedIn ? "Welcome back!" : "Please log in";
console.log(message);  // "Please log in"
```

### Nested Ternary (Use Sparingly!)

```javascript
let score = 75;

// Nested ternary
let grade = score >= 90 ? "A" :
            score >= 80 ? "B" :
            score >= 70 ? "C" :
            score >= 60 ? "D" : "F";

console.log(grade);  // "C"

// Better: use if-else for readability
let grade2;
if (score >= 90) {
  grade2 = "A";
} else if (score >= 80) {
  grade2 = "B";
} else if (score >= 70) {
  grade2 = "C";
} else if (score >= 60) {
  grade2 = "D";
} else {
  grade2 = "F";
}
```

---

## Nullish Coalescing & Optional Chaining

Modern operators for handling null/undefined values (ES2020).

### Nullish Coalescing (??)

Returns right operand when left is **null or undefined** (not falsy).

```javascript
// OR operator (||) - returns right if left is falsy
let value1 = 0 || "default";
console.log(value1);  // "default" (0 is falsy)

let value2 = "" || "default";
console.log(value2);  // "default" ("" is falsy)

// Nullish coalescing (??) - returns right if left is null/undefined
let value3 = 0 ?? "default";
console.log(value3);  // 0 (0 is not null/undefined)

let value4 = "" ?? "default";
console.log(value4);  // "" (empty string is not null/undefined)

let value5 = null ?? "default";
console.log(value5);  // "default"

let value6 = undefined ?? "default";
console.log(value6);  // "default"
```

### Practical Use Cases

```javascript
// User settings with defaults
function getUserSettings(options) {
  return {
    theme: options.theme ?? "light",
    fontSize: options.fontSize ?? 16,
    notifications: options.notifications ?? true
  };
}

let settings1 = getUserSettings({ theme: "dark", fontSize: 0 });
console.log(settings1);
// { theme: "dark", fontSize: 0, notifications: true }
// fontSize 0 is preserved (not replaced with 16)

let settings2 = getUserSettings({});
console.log(settings2);
// { theme: "light", fontSize: 16, notifications: true }
```

### Optional Chaining (?.)

Safely access nested properties without checking each level.

```javascript
// Without optional chaining
let user = null;

// ❌ Error: Cannot read property 'address' of null
// console.log(user.address.street);

// ✅ Must check each level
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}

// With optional chaining
console.log(user?.address?.street);  // undefined (no error!)

// Examples
let user1 = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "NYC"
  }
};

console.log(user1?.address?.street);  // "123 Main St"
console.log(user1?.phone?.number);    // undefined

// With arrays
let users = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 }
];

console.log(users[0]?.name);   // "John"
console.log(users[10]?.name);  // undefined

// With function calls
let obj = {
  sayHello: function() {
    return "Hello!";
  }
};

console.log(obj.sayHello?.());     // "Hello!"
console.log(obj.sayGoodbye?.());   // undefined (method doesn't exist)
```

### Combining ?? and ?.

```javascript
let user = null;

// Get user's name or default
let name = user?.name ?? "Guest";
console.log(name);  // "Guest"

// Get deeply nested value with default
let config = {
  settings: {
    display: {
      theme: "dark"
    }
  }
};

let theme = config?.settings?.display?.theme ?? "light";
console.log(theme);  // "dark"

// If config was null
config = null;
theme = config?.settings?.display?.theme ?? "light";
console.log(theme);  // "light"
```

---

## Bitwise Operators

Perform operations on binary representations of numbers.

```javascript
let a = 5;   // Binary: 0101
let b = 3;   // Binary: 0011

// AND (&)
console.log(a & b);   // 1 (0001)

// OR (|)
console.log(a | b);   // 7 (0111)

// XOR (^)
console.log(a ^ b);   // 6 (0110)

// NOT (~)
console.log(~a);      // -6

// Left shift (<<)
console.log(a << 1);  // 10 (1010)

// Right shift (>>)
console.log(a >> 1);  // 2 (0010)

// Practical use: Check if number is even
let num = 7;
if (num & 1) {
  console.log("Odd");  // Prints "Odd"
} else {
  console.log("Even");
}
```

---

## Other Operators

### typeof Operator

```javascript
console.log(typeof "hello");      // "string"
console.log(typeof 42);           // "number"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (JavaScript bug!)
console.log(typeof {});           // "object"
console.log(typeof []);           // "object"
console.log(typeof function(){}); // "function"
```

### instanceof Operator

```javascript
let arr = [1, 2, 3];
let date = new Date();

console.log(arr instanceof Array);   // true
console.log(date instanceof Date);   // true
console.log(arr instanceof Object);  // true
```

### delete Operator

```javascript
let obj = {
  name: "John",
  age: 30,
  city: "NYC"
};

delete obj.age;
console.log(obj);  // { name: "John", city: "NYC" }

// Delete array element (leaves hole)
let arr = [1, 2, 3, 4, 5];
delete arr[2];
console.log(arr);  // [1, 2, <empty>, 4, 5]
console.log(arr.length);  // 5 (length unchanged)
```

### Comma Operator

```javascript
// Evaluates all expressions, returns last one
let x = (1, 2, 3, 4);
console.log(x);  // 4

// In for loops
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}
// 0 10
// 1 9
// 2 8
// 3 7
// 4 6
```

### in Operator

```javascript
let person = { name: "John", age: 30 };

console.log("name" in person);   // true
console.log("city" in person);   // false

// With arrays
let arr = [1, 2, 3];
console.log(0 in arr);   // true (index 0 exists)
console.log(5 in arr);   // false (index 5 doesn't exist)
```

---

## Interview Questions

### Question 1: What's the difference between == and ===?

**Answer:**

**Loose Equality (==):**
- Compares values after type coercion
- Converts operands to same type before comparison
- Can lead to unexpected results

**Strict Equality (===):**
- Compares both value AND type
- No type coercion
- Recommended for most comparisons

```javascript
// == (loose equality)
console.log(5 == "5");         // true (string "5" coerced to number)
console.log(0 == false);       // true (false coerced to 0)
console.log("" == false);      // true (both coerced to 0)
console.log(null == undefined);// true

// === (strict equality)
console.log(5 === "5");        // false (different types)
console.log(0 === false);      // false (different types)
console.log("" === false);     // false (different types)
console.log(null === undefined);// false (different types)

// Always use === unless you specifically need type coercion
```

**When to use:**
- Use `===` by default (99% of the time)
- Use `==` only when you explicitly want type coercion

---

### Question 2: What will be the output?

```javascript
let x = 5;
console.log(x++);
console.log(++x);
```

**Answer:**

Output:
```
5
7
```

**Explanation:**

```javascript
let x = 5;

// x++ (post-increment)
// Returns current value THEN increments
console.log(x++);  // Prints 5, then x becomes 6

// ++x (pre-increment)
// Increments THEN returns new value
console.log(++x);  // x becomes 7, then prints 7
```

**Key difference:**
- `x++` (post-increment): use current value, then increment
- `++x` (pre-increment): increment first, then use new value

---

### Question 3: Explain short-circuit evaluation with examples.

**Answer:**

**Short-circuit evaluation** means logical operators stop evaluating as soon as the result is determined.

**AND (&&) Short-circuit:**
- Stops at first falsy value
- If left is falsy, doesn't evaluate right

```javascript
// Example 1: Function not called
function expensive() {
  console.log("Expensive operation");
  return true;
}

false && expensive();  // expensive() NOT called
// Output: nothing

true && expensive();   // expensive() IS called
// Output: "Expensive operation"

// Example 2: Conditional execution
let user = { name: "John" };
user && console.log(user.name);  // Prints "John"

user = null;
user && console.log(user.name);  // Doesn't run (no error)

// Example 3: Guard pattern
function getUserName(user) {
  return user && user.name && user.name.toUpperCase();
}

console.log(getUserName({ name: "john" }));  // "JOHN"
console.log(getUserName(null));              // null
```

**OR (||) Short-circuit:**
- Stops at first truthy value
- If left is truthy, doesn't evaluate right

```javascript
// Example 1: Default values
function greet(name) {
  name = name || "Guest";
  console.log(`Hello, ${name}`);
}

greet("John");  // "Hello, John"
greet();        // "Hello, Guest"

// Example 2: First truthy value
let value = false || 0 || "" || "default" || "another";
console.log(value);  // "default" (first truthy value)

// Example 3: Caching
let cachedData = null;
let data = cachedData || fetchData();  // Only fetches if cache is empty
```

---

### Question 4: What's the difference between null and undefined?

**Answer:**

**undefined:**
- Variable declared but not assigned
- Default value of uninitialized variables
- Type: `"undefined"`

**null:**
- Intentional absence of value
- Must be explicitly assigned
- Type: `"object"` (JavaScript bug)

```javascript
// undefined
let x;
console.log(x);  // undefined
console.log(typeof x);  // "undefined"

function test() {}
console.log(test());  // undefined

// null
let y = null;
console.log(y);  // null
console.log(typeof y);  // "object" (bug!)

// Comparison
console.log(null == undefined);   // true (loose equality)
console.log(null === undefined);  // false (different types)
```

---

### Question 5: What's the difference between || and ??

**Answer:**

**|| (OR operator):**
- Returns right operand if left is **falsy**
- Falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`

**?? (Nullish coalescing):**
- Returns right operand if left is **null or undefined only**
- Preserves other falsy values like `0`, `""`

```javascript
// OR operator (||)
console.log(0 || "default");        // "default" (0 is falsy)
console.log("" || "default");       // "default" ("" is falsy)
console.log(false || "default");    // "default"
console.log(null || "default");     // "default"
console.log(undefined || "default");// "default"

// Nullish coalescing (??)
console.log(0 ?? "default");        // 0 (0 is not null/undefined)
console.log("" ?? "default");       // "" (empty string is not null/undefined)
console.log(false ?? "default");    // false
console.log(null ?? "default");     // "default"
console.log(undefined ?? "default");// "default"

// Practical example
function setConfig(options) {
  return {
    port: options.port ?? 3000,        // Preserves 0
    debug: options.debug ?? false,     // Preserves false
    timeout: options.timeout ?? 5000   // Preserves 0
  };
}

// With || - wrong behavior
let config1 = setConfig({ port: 0 });
// port would be 3000 (0 is falsy), but we want 0!

// With ?? - correct behavior
let config2 = setConfig({ port: 0 });
// port is 0 (exactly what we want)
```

---

## Common Pitfalls

### 1. Using == Instead of ===

```javascript
// ❌ Wrong - unexpected results
console.log(0 == false);    // true
console.log("" == false);   // true
console.log("5" == 5);      // true

// ✅ Correct - predictable
console.log(0 === false);   // false
console.log("" === false);  // false
console.log("5" === 5);     // false
```

### 2. Confusing Post/Pre Increment

```javascript
let x = 5;

// ❌ Common mistake
let y = x++;  // y is 5, x is 6
console.log(y);  // 5 (unexpected?)

// ✅ Be explicit
let z = x;    // z is 6
x = x + 1;    // x is 7
```

### 3. String Concatenation vs Addition

```javascript
// ❌ Unexpected concatenation
console.log("5" + 3);   // "53" (string)
console.log("5" + 3 + 2);  // "532" (string)

// ✅ Convert to numbers
console.log(Number("5") + 3);  // 8
console.log(+"5" + 3);         // 8 (unary + converts to number)
```

### 4. Operator Precedence

```javascript
// ❌ Wrong order of operations
let result = 10 + 5 * 2;
console.log(result);  // 20 (multiplication first)

// ✅ Use parentheses for clarity
result = (10 + 5) * 2;
console.log(result);  // 30
```

### 5. Using || for Defaults with Falsy Values

```javascript
function setPort(port) {
  // ❌ Wrong - 0 will be replaced
  port = port || 3000;
  return port;
}

console.log(setPort(0));     // 3000 (but we wanted 0!)
console.log(setPort(8080));  // 8080

// ✅ Correct - use ??
function setPortCorrect(port) {
  port = port ?? 3000;
  return port;
}

console.log(setPortCorrect(0));     // 0 (correct!)
console.log(setPortCorrect(8080));  // 8080
```

---

## Best Practices

### 1. Always Use Strict Equality (===)

```javascript
// ❌ Bad
if (x == 5) {}

// ✅ Good
if (x === 5) {}
```

### 2. Use Ternary for Simple Conditions Only

```javascript
// ✅ Good - simple ternary
let status = isActive ? "online" : "offline";

// ❌ Bad - complex nested ternary
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "D";

// ✅ Good - use if-else for complex logic
let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "D";
}
```

### 3. Use ?? Instead of || for Defaults

```javascript
// ❌ Bad - doesn't preserve falsy values
let value = input || "default";

// ✅ Good - preserves 0, "", false
let value = input ?? "default";
```

### 4. Use Optional Chaining for Nested Access

```javascript
// ❌ Bad - verbose checks
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}

// ✅ Good - optional chaining
console.log(user?.address?.street);
```

### 5. Use Parentheses for Complex Expressions

```javascript
// ❌ Hard to read
if (isAdmin && hasPermission || isSuperUser && isActive) {}

// ✅ Clear intent
if ((isAdmin && hasPermission) || (isSuperUser && isActive)) {}
```

---

## Summary

### Key Takeaways

1. **Use `===` instead of `==`** for predictable comparisons
2. **`&&` and `||` short-circuit** - use for conditional execution
3. **`++x` vs `x++`** - pre-increment vs post-increment
4. **`??` only checks null/undefined**, `||` checks all falsy values
5. **Optional chaining `?.`** prevents errors with nested properties
6. **Ternary operator** - use for simple conditions only

### Quick Reference

```javascript
// Arithmetic
+ - * / % **

// Comparison
=== !== > < >= <=

// Logical
&& || !

// Assignment
= += -= *= /= %= **=

// Increment/Decrement
++ --

// Modern operators
?? ?.

// String
+ (concatenation)
`${}` (template literals)

// Other
typeof instanceof delete in
```

---

**Happy Learning! Master operators and you'll write more expressive JavaScript code! 🚀**
