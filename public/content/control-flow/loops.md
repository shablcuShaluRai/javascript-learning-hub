# 🔄 JavaScript Loops

A comprehensive guide to loops in JavaScript with practical examples and interview questions.

## 📚 Table of Contents
1. [What are Loops?](#what-are-loops)
2. [Why Do We Need Loops?](#why-do-we-need-loops)
3. [Types of Loops](#types-of-loops)
4. [Loop Control Statements](#loop-control-statements)
5. [Practical Examples](#practical-examples)
6. [Interview Questions](#interview-questions)
7. [Common Mistakes](#common-mistakes)

---

## What are Loops?

Loops are used to execute a block of code repeatedly until a specified condition is met. They help avoid code repetition and make programs more efficient.

**Without Loop:**
```javascript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

**With Loop:**
```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

---

## Why Do We Need Loops?

Understanding loops through real-world scenarios that show their necessity.

### 📱 Example 1: WhatsApp Birthday Wishes

**Scenario:** You have 50 friends and need to send birthday wishes to everyone.

#### ❌ WITHOUT LOOP (Nightmare!)

```javascript
// Imagine having to do this...
console.log("Happy Birthday Rahul! 🎂");
console.log("Happy Birthday Simran! 🎂");
console.log("Happy Birthday Priya! 🎂");
console.log("Happy Birthday Arjun! 🎂");
console.log("Happy Birthday Anjali! 🎂");
// ... 45 more lines! 😱

// What if you have 100 friends?
// What if you have 1000?
// THIS IS MADNESS!
```

**Problems:**
1. Have to write same thing 50 times
2. Add one friend? Add one more line!
3. Change message? Change 50 places!
4. Time waste, boring, and error-prone

#### ✅ WITH LOOP (Smart Way!)

```javascript
let friends = [
  "Rahul", "Simran", "Priya", "Arjun", "Anjali",
  "Rohan", "Neha", "Vikram", "Sneha", "Karan"
  // ... 40 more names
];

// Just 3 lines of code!
for (let friend of friends) {
  console.log(`Happy Birthday ${friend}! 🎂`);
}

// 50 friends or 5000, code stays same!
```

**Benefits:**
1. Clean and readable code
2. New friend? Just add to array
3. Change message? Change one place, updates everywhere!
4. Time saved: 5 minutes to 5 seconds!

---

### 🛒 Example 2: Restaurant Bill Calculator

**Scenario:** You ordered 10 items at a restaurant, need to calculate total bill.

#### ❌ WITHOUT LOOP (Tedious!)

```javascript
let pizza = 299;
let burger = 149;
let coke = 50;
let fries = 99;
let pasta = 199;
let sandwich = 129;
let juice = 80;
let icecream = 120;
let salad = 150;
let coffee = 60;

// Manual calculation
let total = pizza + burger + coke + fries + pasta +
            sandwich + juice + icecream + salad + coffee;

console.log("Total Bill: ₹" + total);

// What if items list changes?
// What if you ordered 50 items?
// Need separate variable for each item!
```

**Problems:**
1. Separate variable for each item
2. Manual addition - chance of error
3. Difficult to add/remove items
4. Code becomes very long

#### ✅ WITH LOOP (Professional Way!)

```javascript
let orderItems = [
  { name: "Pizza", price: 299 },
  { name: "Burger", price: 149 },
  { name: "Coke", price: 50 },
  { name: "Fries", price: 99 },
  { name: "Pasta", price: 199 },
  { name: "Sandwich", price: 129 },
  { name: "Juice", price: 80 },
  { name: "Ice Cream", price: 120 },
  { name: "Salad", price: 150 },
  { name: "Coffee", price: 60 }
];

let total = 0;
console.log("=== YOUR ORDER ===");

for (let item of orderItems) {
  console.log(`${item.name}: ₹${item.price}`);
  total += item.price;
}

console.log(`\nTotal Bill: ₹${total}`);

// 10 items or 100, code stays same!
// Detailed receipt too!
```

**Output:**
```
=== YOUR ORDER ===
Pizza: ₹299
Burger: ₹149
Coke: ₹50
Fries: ₹99
Pasta: ₹199
Sandwich: ₹129
Juice: ₹80
Ice Cream: ₹120
Salad: ₹150
Coffee: ₹60

Total Bill: ₹1335
```

---

### 🎓 Example 3: Student Result System

**Scenario:** School has 100 students, need to calculate percentage and determine pass/fail for everyone.

#### ❌ WITHOUT LOOP (Impossible!)

```javascript
// Student 1
let student1Name = "Rahul";
let student1Marks = 450;
let student1Total = 600;
let student1Percentage = (student1Marks / student1Total) * 100;
let student1Result = student1Percentage >= 40 ? "Pass" : "Fail";
console.log(`${student1Name}: ${student1Percentage}% - ${student1Result}`);

// Student 2
let student2Name = "Simran";
let student2Marks = 520;
let student2Total = 600;
let student2Percentage = (student2Marks / student2Total) * 100;
let student2Result = student2Percentage >= 40 ? "Pass" : "Fail";
console.log(`${student2Name}: ${student2Percentage}% - ${student2Result}`);

// ... 98 MORE STUDENTS?! 😵
// THIS CAN'T BE DONE!
```

**Problems:**
1. 100 students = 700+ lines of code!
2. Change one formula? Change 100 places!
3. Typing alone will hurt your hands
4. Finding mistakes almost impossible

#### ✅ WITH LOOP (School Management System!)

```javascript
let students = [
  { name: "Rahul", marks: 450, total: 600 },
  { name: "Simran", marks: 520, total: 600 },
  { name: "Priya", marks: 380, total: 600 },
  { name: "Arjun", marks: 490, total: 600 },
  { name: "Anjali", marks: 550, total: 600 }
  // ... 95 more students
];

console.log("=== RESULT SHEET ===\n");

let passCount = 0;
let failCount = 0;

for (let student of students) {
  let percentage = ((student.marks / student.total) * 100).toFixed(2);
  let result = percentage >= 40 ? "✅ Pass" : "❌ Fail";

  console.log(`${student.name}: ${percentage}% - ${result}`);

  if (percentage >= 40) {
    passCount++;
  } else {
    failCount++;
  }
}

console.log(`\n=== STATISTICS ===`);
console.log(`Total Students: ${students.length}`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Pass Rate: ${((passCount / students.length) * 100).toFixed(2)}%`);
```

---

### 💡 Key Realizations

#### 1. Loops Save Time
- **Without Loop:** 10 items = 10 minutes
- **With Loop:** 10 items = 30 seconds
- **Savings:** 95% time saved! 🎉

#### 2. Loops Reduce Errors
- **Manual typing:** 100 lines = 10+ mistakes
- **Loop:** 1 logic = consistent results ✅

#### 3. Loops Enable Scaling
- **Without Loop:** 10 items maximum
- **With Loop:** 10 thousand items possible! 🚀

#### 4. Loops Make Code Professional
```javascript
// Looks amateur
let sum = n1 + n2 + n3 + n4 + n5;

// Looks professional
for (let num of numbers) {
  sum += num;
}
```

---

### 🤔 When You ABSOLUTELY Need Loops

1. **Processing collections** - Arrays, lists, databases
2. **Repetitive operations** - Same logic, different data
3. **Unknown quantity** - Don't know how many items beforehand
4. **Pattern generation** - Star patterns, tables, grids
5. **Search & filter** - Finding specific items
6. **Calculations** - Sum, average, max, min
7. **Validation** - Checking multiple inputs
8. **Data transformation** - Converting formats

---

### 🎯 The Big Picture

**Loops' main purpose:**
> "Don't Repeat Yourself (DRY)"

When you're doing the same thing repeatedly:
1. Don't repeat code
2. Use a loop
3. Be a smart programmer! 🧠

**Real World Analogy:**
Imagine you're a cook:
- Need to make 100 rotis
- Would you write 100 different recipes? ❌
- Or follow one recipe 100 times? ✅

**Same in code!** 🎯

---

## Types of Loops

JavaScript provides five types of loops:

### 1. for Loop

The most commonly used loop when you know how many times to iterate.

**Syntax:**
```javascript
for (initialization; condition; increment/decrement) {
  // code block
}
```

**Example:**
```javascript
// Print numbers 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1 2 3 4 5

// Loop through an array
const fruits = ['Apple', 'Banana', 'Orange'];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// Output: Apple Banana Orange

// Reverse loop
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
// Output: 5 4 3 2 1
```

---

### 2. while Loop

Executes code while a condition is true. Use when you don't know the exact number of iterations.

**Syntax:**
```javascript
while (condition) {
  // code block
}
```

**Example:**
```javascript
// Count from 1 to 5
let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}
// Output: 1 2 3 4 5

// User input validation
let password = '';
while (password !== 'secret') {
  password = prompt('Enter password:');
}
console.log('Access granted!');

// Process until condition met
let sum = 0;
let num = 1;
while (sum < 100) {
  sum += num;
  num++;
}
console.log('Sum:', sum); // Sum: 105
```

---

### 3. do...while Loop

Similar to while loop, but executes code at least once before checking the condition.

**Syntax:**
```javascript
do {
  // code block
} while (condition);
```

**Example:**
```javascript
// Execute at least once
let i = 10;
do {
  console.log(i);
  i++;
} while (i < 5);
// Output: 10 (executes once even though condition is false)

// Menu system
let choice;
do {
  console.log('1. Start');
  console.log('2. Settings');
  console.log('3. Exit');
  choice = prompt('Enter choice:');
} while (choice !== '3');

// Roll dice until 6
let dice;
let rolls = 0;
do {
  dice = Math.floor(Math.random() * 6) + 1;
  rolls++;
  console.log('Rolled:', dice);
} while (dice !== 6);
console.log('Got 6 in', rolls, 'rolls!');
```

---

### 4. for...in Loop

Iterates over enumerable properties of an object (including inherited properties).

**Syntax:**
```javascript
for (variable in object) {
  // code block
}
```

**Example:**
```javascript
// Iterate over object properties
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

for (let key in person) {
  console.log(key + ':', person[key]);
}
// Output:
// name: John
// age: 30
// city: New York

// Loop through array indices (not recommended)
const colors = ['red', 'green', 'blue'];
for (let index in colors) {
  console.log(index, colors[index]);
}
// Output: 0 red, 1 green, 2 blue

// Check own properties
const car = { brand: 'Toyota', model: 'Camry' };
for (let prop in car) {
  if (car.hasOwnProperty(prop)) {
    console.log(prop, car[prop]);
  }
}
```

---

### 5. for...of Loop

Iterates over iterable objects (Arrays, Strings, Maps, Sets, etc.). Introduced in ES6.

**Syntax:**
```javascript
for (variable of iterable) {
  // code block
}
```

**Example:**
```javascript
// Loop through array
const fruits = ['Apple', 'Banana', 'Orange'];
for (let fruit of fruits) {
  console.log(fruit);
}
// Output: Apple Banana Orange

// Loop through string
const text = 'Hello';
for (let char of text) {
  console.log(char);
}
// Output: H e l l o

// Loop through Set
const uniqueNumbers = new Set([1, 2, 3, 4, 5]);
for (let num of uniqueNumbers) {
  console.log(num);
}

// Loop through Map
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);
for (let [key, value] of map) {
  console.log(key, value);
}
// Output: a 1, b 2, c 3
```

---

## Loop Control Statements

### break Statement

Terminates the loop immediately.

```javascript
// Find first even number
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log('First even number:', i);
    break;
  }
}
// Output: First even number: 2

// Search in array
const numbers = [1, 5, 3, 8, 2, 9];
for (let num of numbers) {
  if (num > 7) {
    console.log('Found number greater than 7:', num);
    break;
  }
}
// Output: Found number greater than 7: 8
```

### continue Statement

Skips the current iteration and continues with the next one.

```javascript
// Print only odd numbers
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // Skip even numbers
  }
  console.log(i);
}
// Output: 1 3 5 7 9

// Skip specific values
const numbers = [1, 2, 3, 4, 5, 6];
for (let num of numbers) {
  if (num === 3 || num === 5) {
    continue;
  }
  console.log(num);
}
// Output: 1 2 4 6
```

---

## Practical Examples

### Example 1: Sum of Numbers
```javascript
// Calculate sum of numbers from 1 to 100
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log('Sum:', sum); // Sum: 5050
```

### Example 2: Factorial
```javascript
// Calculate factorial of a number
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5)); // 120
console.log(factorial(7)); // 5040
```

### Example 3: Fibonacci Series
```javascript
// Print first n Fibonacci numbers
function fibonacci(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    console.log(a);
    let temp = a + b;
    a = b;
    b = temp;
  }
}

fibonacci(10);
// Output: 0 1 1 2 3 5 8 13 21 34
```

### Example 4: Reverse a String
```javascript
// Reverse a string using loop
function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString('Hello')); // olleH
console.log(reverseString('JavaScript')); // tpircSavaJ
```

### Example 5: Find Prime Numbers
```javascript
// Check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Print all prime numbers up to 50
for (let i = 2; i <= 50; i++) {
  if (isPrime(i)) {
    console.log(i);
  }
}
// Output: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
```

### Example 6: Nested Loops - Multiplication Table
```javascript
// Print multiplication table
for (let i = 1; i <= 10; i++) {
  let row = '';
  for (let j = 1; j <= 10; j++) {
    row += (i * j).toString().padStart(4);
  }
  console.log(row);
}
```

### Example 7: Pattern Printing
```javascript
// Print a pyramid pattern
function printPyramid(rows) {
  for (let i = 1; i <= rows; i++) {
    let spaces = ' '.repeat(rows - i);
    let stars = '*'.repeat(2 * i - 1);
    console.log(spaces + stars);
  }
}

printPyramid(5);
// Output:
//     *
//    ***
//   *****
//  *******
// *********
```

---

## Interview Questions

### Question 1: What's the difference between for...in and for...of?

**Answer:**
- **for...in** iterates over enumerable property names (keys) of an object
- **for...of** iterates over iterable object values (Arrays, Strings, Maps, Sets)

```javascript
const arr = ['a', 'b', 'c'];

// for...in - returns indices
for (let index in arr) {
  console.log(index); // 0, 1, 2
}

// for...of - returns values
for (let value of arr) {
  console.log(value); // a, b, c
}
```

### Question 2: What's the difference between while and do...while?

**Answer:**
- **while** checks condition before executing the loop body
- **do...while** executes the loop body at least once, then checks condition

```javascript
// while - may not execute at all
let i = 10;
while (i < 5) {
  console.log(i); // Never executes
}

// do...while - executes at least once
let j = 10;
do {
  console.log(j); // Executes once: 10
} while (j < 5);
```

### Question 3: How do you break out of nested loops?

**Answer:**
Using labeled statements:

```javascript
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // Breaks out of both loops
    }
    console.log(i, j);
  }
}
```

### Question 4: What will this code output?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**Answer:**
Outputs: `3 3 3`

Because `var` has function scope, all setTimeout callbacks reference the same `i` which becomes 3 after loop ends.

**Fix with let:**
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0 1 2
```

### Question 5: How to find the largest number in an array?

**Answer:**
```javascript
const numbers = [5, 2, 9, 1, 7, 6];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}
console.log(max); // 9

// Alternative using for...of
let maximum = numbers[0];
for (let num of numbers) {
  if (num > maximum) {
    maximum = num;
  }
}
console.log(maximum); // 9
```

### Question 6: Remove duplicates from an array using loops

**Answer:**
```javascript
function removeDuplicates(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      result.push(arr[i]);
    }
  }
  return result;
}

const nums = [1, 2, 2, 3, 4, 4, 5];
console.log(removeDuplicates(nums)); // [1, 2, 3, 4, 5]
```

### Question 7: Infinite Loop - What causes it?

**Answer:**
A loop that never terminates because the condition always evaluates to true.

```javascript
// Common mistakes causing infinite loops

// 1. Forgetting to increment
let i = 0;
while (i < 5) {
  console.log(i);
  // Missing: i++
}

// 2. Wrong condition
for (let i = 10; i > 0; i++) { // i keeps increasing
  console.log(i);
}

// 3. Incorrect update
let j = 0;
while (j < 10) {
  console.log(j);
  j--; // Going backwards!
}
```

### Question 8: What is the output?

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
```

**Answer:**
Output: `0 1 2 4`

The `continue` statement skips iteration when `i === 3`.

---

## Common Mistakes

### 1. Off-by-One Error
```javascript
// Wrong - misses last element
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length - 1; i++) {
  console.log(arr[i]); // Prints 1 2 3 4 (misses 5)
}

// Correct
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // Prints all elements
}
```

### 2. Modifying Array While Looping
```javascript
// Problematic
const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
  numbers.splice(i, 1); // Modifying array while looping
}

// Better approach - loop backwards
for (let i = numbers.length - 1; i >= 0; i--) {
  numbers.splice(i, 1);
}
```

### 3. Using for...in with Arrays
```javascript
const arr = [10, 20, 30];
arr.customProperty = 'test';

// Wrong - iterates over all properties
for (let key in arr) {
  console.log(key); // 0, 1, 2, customProperty
}

// Correct - use for...of for arrays
for (let value of arr) {
  console.log(value); // 10, 20, 30
}
```

### 4. Forgetting Variable Initialization
```javascript
// Wrong - i is undefined
for (let i; i < 5; i++) {
  console.log(i); // NaN, NaN, NaN...
}

// Correct
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

---

## Best Practices

1. **Use const/let instead of var** in loops
2. **Choose the right loop** for your use case
3. **Avoid modifying** loop counter inside the loop body
4. **Use for...of for arrays** and for...in for objects
5. **Cache array length** if not changing: `const len = arr.length`
6. **Break early** when possible to improve performance
7. **Use meaningful variable names** instead of i, j, k

---

## Performance Tips

```javascript
// Good - cache length
const arr = [1, 2, 3, 4, 5];
const len = arr.length;
for (let i = 0; i < len; i++) {
  console.log(arr[i]);
}

// Better - use forEach for simple iterations
arr.forEach(item => console.log(item));

// Best - use appropriate array methods
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);
```

---

**Master loops to write efficient and maintainable JavaScript code! 🚀**
