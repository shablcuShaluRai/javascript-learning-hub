# If-Else & Switch Statements in JavaScript

## Table of Contents
1. [What is Conditional Logic?](#what-is-conditional-logic)
2. [If Statement](#if-statement)
3. [If-Else Statement](#if-else-statement)
4. [If-Else If-Else](#if-else-if-else)
5. [Nested If Statements](#nested-if-statements)
6. [Switch Statement](#switch-statement)
7. [Ternary Operator](#ternary-operator)
8. [Interview Questions](#interview-questions)
9. [Common Pitfalls](#common-pitfalls)
10. [Best Practices](#best-practices)

---

## What is Conditional Logic?

**Definition**: Conditional statements allow you to execute different code blocks based on different conditions.

**Simple Explanation**: Think of it like making decisions in real life - "IF it's raining, THEN take an umbrella, ELSE leave it at home."

```javascript
let isRaining = true;

if (isRaining) {
  console.log("Take an umbrella");
} else {
  console.log("Leave it at home");
}
```

**Why use conditionals?**
- Make decisions in your code
- Execute different logic based on conditions
- Control the flow of your program
- Handle different scenarios

---

## If Statement

The `if` statement executes a block of code if a condition is true.

**Syntax:**
```javascript
if (condition) {
  // code to execute if condition is true
}
```

**Examples:**

```javascript
// Example 1: Simple if
let age = 18;

if (age >= 18) {
  console.log("You are an adult");
}
// Output: "You are an adult"

// Example 2: If with multiple statements
let score = 85;

if (score >= 80) {
  console.log("Great job!");
  console.log("You got an A!");
}

// Example 3: If with variable assignment
let temperature = 30;

if (temperature > 25) {
  let message = "It's hot outside";
  console.log(message);
}
```

---

## If-Else Statement

The `if-else` statement executes one block if the condition is true, and another block if it's false.

**Syntax:**
```javascript
if (condition) {
  // code to execute if condition is true
} else {
  // code to execute if condition is false
}
```

**Examples:**

```javascript
// Example 1: Basic if-else
let age = 15;

if (age >= 18) {
  console.log("You can vote");
} else {
  console.log("You cannot vote yet");
}
// Output: "You cannot vote yet"

// Example 2: Login check
let isLoggedIn = false;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in");
}
// Output: "Please log in"

// Example 3: Even or odd
let number = 7;

if (number % 2 === 0) {
  console.log(number + " is even");
} else {
  console.log(number + " is odd");
}
// Output: "7 is odd"

// Example 4: Temperature check
let temp = 15;

if (temp >= 20) {
  console.log("It's warm");
} else {
  console.log("It's cold");
}
// Output: "It's cold"
```

---

## If-Else If-Else

Use `else if` to test multiple conditions.

**Syntax:**
```javascript
if (condition1) {
  // code if condition1 is true
} else if (condition2) {
  // code if condition2 is true
} else {
  // code if all conditions are false
}
```

**Examples:**

```javascript
// Example 1: Grade calculator
let score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
// Output: "Grade: C"

// Example 2: Traffic light
let light = "yellow";

if (light === "green") {
  console.log("Go");
} else if (light === "yellow") {
  console.log("Slow down");
} else if (light === "red") {
  console.log("Stop");
} else {
  console.log("Invalid light color");
}
// Output: "Slow down"

// Example 3: Time of day greeting
let hour = 14;

if (hour < 12) {
  console.log("Good morning!");
} else if (hour < 18) {
  console.log("Good afternoon!");
} else {
  console.log("Good evening!");
}
// Output: "Good afternoon!"

// Example 4: Temperature categories
let temperature = 35;

if (temperature < 0) {
  console.log("Freezing");
} else if (temperature < 10) {
  console.log("Cold");
} else if (temperature < 20) {
  console.log("Cool");
} else if (temperature < 30) {
  console.log("Warm");
} else {
  console.log("Hot");
}
// Output: "Hot"
```

---

## Nested If Statements

You can nest if statements inside other if statements.

**Examples:**

```javascript
// Example 1: Age and license check
let age = 20;
let hasLicense = true;

if (age >= 18) {
  if (hasLicense) {
    console.log("You can drive");
  } else {
    console.log("You need a license");
  }
} else {
  console.log("You're too young to drive");
}
// Output: "You can drive"

// Example 2: Login with username and password
let username = "admin";
let password = "1234";

if (username === "admin") {
  if (password === "1234") {
    console.log("Login successful");
  } else {
    console.log("Wrong password");
  }
} else {
  console.log("User not found");
}
// Output: "Login successful"

// Example 3: Discount calculator
let isMember = true;
let purchaseAmount = 150;

if (isMember) {
  if (purchaseAmount >= 100) {
    console.log("20% discount");
  } else {
    console.log("10% discount");
  }
} else {
  if (purchaseAmount >= 200) {
    console.log("5% discount");
  } else {
    console.log("No discount");
  }
}
// Output: "20% discount"
```

---

## Switch Statement

The `switch` statement is an alternative to multiple `if-else if` statements when comparing one value against multiple options.

**Syntax:**
```javascript
switch (expression) {
  case value1:
    // code for value1
    break;
  case value2:
    // code for value2
    break;
  default:
    // code if no case matches
}
```

**Examples:**

```javascript
// Example 1: Day of the week
let day = 3;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day");
}
// Output: "Wednesday"

// Example 2: Fruit prices
let fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("$1.00");
    break;
  case "banana":
    console.log("$0.50");
    break;
  case "orange":
    console.log("$0.80");
    break;
  default:
    console.log("Fruit not available");
}
// Output: "$1.00"

// Example 3: Multiple cases, same action
let month = "February";

switch (month) {
  case "December":
  case "January":
  case "February":
    console.log("Winter");
    break;
  case "March":
  case "April":
  case "May":
    console.log("Spring");
    break;
  case "June":
  case "July":
  case "August":
    console.log("Summer");
    break;
  case "September":
  case "October":
  case "November":
    console.log("Fall");
    break;
  default:
    console.log("Invalid month");
}
// Output: "Winter"

// Example 4: Calculator
let operator = "+";
let a = 10;
let b = 5;

switch (operator) {
  case "+":
    console.log(a + b);
    break;
  case "-":
    console.log(a - b);
    break;
  case "*":
    console.log(a * b);
    break;
  case "/":
    console.log(a / b);
    break;
  default:
    console.log("Invalid operator");
}
// Output: 15
```

**Important: Always use `break`!**

```javascript
// Without break - "fall through" behavior
let grade = "B";

switch (grade) {
  case "A":
    console.log("Excellent!");
    // No break - falls through
  case "B":
    console.log("Good job!");
    // No break - falls through
  case "C":
    console.log("You passed");
    // No break - falls through
  default:
    console.log("Keep trying");
}
// Output:
// "Good job!"
// "You passed"
// "Keep trying"

// With break - correct behavior
switch (grade) {
  case "A":
    console.log("Excellent!");
    break;
  case "B":
    console.log("Good job!");
    break;
  case "C":
    console.log("You passed");
    break;
  default:
    console.log("Keep trying");
}
// Output: "Good job!"
```

---

## Ternary Operator

The ternary operator is a shorthand for simple if-else statements.

**Syntax:**
```javascript
condition ? expressionIfTrue : expressionIfFalse
```

**Examples:**

```javascript
// Example 1: Simple ternary
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote);  // "Yes"

// Equivalent if-else:
let canVote;
if (age >= 18) {
  canVote = "Yes";
} else {
  canVote = "No";
}

// Example 2: Inline usage
let score = 85;
console.log(score >= 60 ? "Pass" : "Fail");  // "Pass"

// Example 3: Nested ternary (use sparingly!)
let marks = 75;
let grade = marks >= 90 ? "A" :
            marks >= 80 ? "B" :
            marks >= 70 ? "C" :
            marks >= 60 ? "D" : "F";
console.log(grade);  // "C"

// Example 4: Multiple conditions
let time = 14;
let greeting = time < 12 ? "Good morning" :
               time < 18 ? "Good afternoon" :
               "Good evening";
console.log(greeting);  // "Good afternoon"

// Example 5: In function return
function getStatus(isActive) {
  return isActive ? "Online" : "Offline";
}

console.log(getStatus(true));   // "Online"
console.log(getStatus(false));  // "Offline"
```

---

## Interview Questions

### Question 1: What's the difference between if-else and switch?

**Answer:**

**if-else:**
- Can test any condition (>, <, ===, etc.)
- Can test different variables in each condition
- Better for ranges and complex conditions

```javascript
let age = 25;
if (age < 18) {
  console.log("Minor");
} else if (age < 65) {
  console.log("Adult");
} else {
  console.log("Senior");
}
```

**switch:**
- Only tests for equality (===)
- Tests one variable against multiple values
- Better for multiple specific values
- Cleaner for many cases

```javascript
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  default:
    console.log("Regular day");
}
```

**When to use:**
- Use `if-else` for ranges, complex conditions, different variables
- Use `switch` for many specific values of one variable

---

### Question 2: What will be the output?

```javascript
let x = 10;

if (x = 5) {
  console.log("A");
} else {
  console.log("B");
}
```

**Answer:**

Output: `"A"`

**Explanation:**
- `x = 5` is **assignment**, not comparison
- Assignment returns the assigned value (5)
- 5 is truthy, so condition is true
- Should use `===` for comparison: `if (x === 5)`

```javascript
// Correct version
let x = 10;

if (x === 5) {  // Use === for comparison
  console.log("A");
} else {
  console.log("B");
}
// Output: "B"
```

---

### Question 3: What will be the output?

```javascript
let score = 75;

switch (score) {
  case score >= 90:
    console.log("A");
    break;
  case score >= 80:
    console.log("B");
    break;
  default:
    console.log("C");
}
```

**Answer:**

Output: `"C"`

**Explanation:**
- switch uses strict equality (===)
- `score` is 75
- `score >= 90` evaluates to `false`
- 75 === false is false, so first case doesn't match
- Same for second case
- Falls through to default

**Correct version:**
```javascript
let score = 75;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}
// Output: "C"
```

---

### Question 4: What are truthy and falsy values?

**Answer:**

**Falsy values** (evaluate to false in conditions):
- `false`
- `0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

**Everything else is truthy**, including:
- `true`
- Any non-zero number
- Any non-empty string
- Objects `{}`
- Arrays `[]`
- Functions

```javascript
// Falsy examples
if (0) {
  console.log("Won't print");
}

if ("") {
  console.log("Won't print");
}

if (null) {
  console.log("Won't print");
}

// Truthy examples
if (1) {
  console.log("Prints");  // ✅
}

if ("hello") {
  console.log("Prints");  // ✅
}

if ([]) {
  console.log("Prints");  // ✅ Empty array is truthy!
}

if ({}) {
  console.log("Prints");  // ✅ Empty object is truthy!
}
```

---

### Question 5: What will be the output?

```javascript
let value = "";

if (value) {
  console.log("A");
} else if (!value) {
  console.log("B");
} else {
  console.log("C");
}
```

**Answer:**

Output: `"B"`

**Explanation:**
- `value` is empty string `""`
- Empty string is falsy
- First `if (value)` is false
- `!value` is `!""` which is `true`
- Second condition executes

---

### Question 6: Explain the ternary operator with an example.

**Answer:**

The ternary operator is a shorthand for simple if-else statements.

**Syntax:**
```javascript
condition ? valueIfTrue : valueIfFalse
```

**Example:**
```javascript
let age = 20;

// Using ternary
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);  // "Adult"

// Equivalent if-else
let status;
if (age >= 18) {
  status = "Adult";
} else {
  status = "Minor";
}
```

**When to use:**
- Simple if-else with one statement
- Assigning values based on condition
- Inline conditional expressions

**When NOT to use:**
- Complex conditions
- Multiple statements
- Nested ternaries (hard to read)

---

### Question 7: What's wrong with this code?

```javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of week");
  case "Tuesday":
    console.log("Second day");
  default:
    console.log("Regular day");
}
```

**Answer:**

**Problem:** Missing `break` statements

**Output:**
```
Start of week
Second day
Regular day
```

All three print because of "fall through" - execution continues through all cases without break.

**Fixed version:**
```javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of week");
    break;  // ✅ Added break
  case "Tuesday":
    console.log("Second day");
    break;  // ✅ Added break
  default:
    console.log("Regular day");
}
// Output: "Start of week"
```

---

## Common Pitfalls

### 1. Using Assignment (=) Instead of Comparison (===)

```javascript
// ❌ Wrong - assignment
let x = 10;
if (x = 5) {  // Assigns 5 to x, always true
  console.log("Oops!");
}

// ✅ Correct - comparison
if (x === 5) {
  console.log("Correct");
}
```

### 2. Forgetting `break` in Switch

```javascript
// ❌ Wrong - missing breaks
switch (grade) {
  case "A":
    console.log("Excellent");
  case "B":
    console.log("Good");  // This will also print!
}

// ✅ Correct
switch (grade) {
  case "A":
    console.log("Excellent");
    break;
  case "B":
    console.log("Good");
    break;
}
```

### 3. Comparing Objects/Arrays Directly

```javascript
// ❌ Wrong - compares references
if ([1, 2] === [1, 2]) {
  console.log("Won't print");
}

// ✅ Correct - compare values
let arr1 = [1, 2];
let arr2 = [1, 2];
if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
  console.log("Arrays are equal");
}
```

### 4. Complex Nested Ternaries

```javascript
// ❌ Hard to read
let result = a > b ? a > c ? a : c : b > c ? b : c;

// ✅ Use if-else for clarity
let result;
if (a > b) {
  result = a > c ? a : c;
} else {
  result = b > c ? b : c;
}
```

### 5. Not Handling All Cases

```javascript
// ❌ Missing else
let age = 15;
let status;
if (age >= 18) {
  status = "Adult";
}
console.log(status);  // undefined!

// ✅ Always have else
if (age >= 18) {
  status = "Adult";
} else {
  status = "Minor";
}
```

---

## Best Practices

### 1. Use Strict Equality (===)

```javascript
// ✅ Good - use ===
if (x === 5) {
  console.log("x is 5");
}

// ❌ Bad - use ==  (type coercion)
if (x == "5") {  // true if x is 5 or "5"
  console.log("Confusing");
}
```

### 2. Keep Conditions Simple

```javascript
// ❌ Complex
if (user && user.isActive && user.permissions && user.permissions.includes("admin")) {
  // ...
}

// ✅ Extract to variable
const isAdmin = user?.isActive && user?.permissions?.includes("admin");
if (isAdmin) {
  // ...
}
```

### 3. Use Switch for Multiple Values

```javascript
// ❌ Repetitive
if (day === "Monday" || day === "Tuesday" || day === "Wednesday") {
  console.log("Weekday");
}

// ✅ Use switch
switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
    console.log("Weekday");
    break;
}
```

### 4. Ternary for Simple Assignments Only

```javascript
// ✅ Good - simple ternary
const status = isActive ? "Online" : "Offline";

// ❌ Bad - complex ternary
const result = condition1 ?
               condition2 ? value1 : value2 :
               condition3 ? value3 : value4;
```

### 5. Always Include `else` or `default`

```javascript
// ✅ Good - all cases handled
if (score >= 60) {
  console.log("Pass");
} else {
  console.log("Fail");
}

switch (status) {
  case "active":
    // ...
    break;
  default:
    console.log("Unknown status");
}
```

---

## Summary

### Key Takeaways

1. **if-else** for ranges and complex conditions
2. **switch** for multiple specific values
3. **ternary** for simple inline conditions
4. Always use `===` (strict equality)
5. Don't forget `break` in switch statements
6. Handle all possible cases

### Quick Reference

```javascript
// if-else
if (condition) {
  // ...
} else if (condition2) {
  // ...
} else {
  // ...
}

// switch
switch (value) {
  case option1:
    // ...
    break;
  case option2:
    // ...
    break;
  default:
    // ...
}

// ternary
let result = condition ? valueIfTrue : valueIfFalse;

// Falsy values
false, 0, "", null, undefined, NaN
```

---

**Happy Learning! Master conditional logic and you'll control the flow of your programs! 🚀**
