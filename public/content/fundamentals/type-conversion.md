# Type Conversion & Coercion in JavaScript

## Table of Contents
1. [What is Type Conversion?](#what-is-type-conversion)
2. [Explicit Conversion (Type Casting)](#explicit-conversion-type-casting)
3. [Implicit Conversion (Type Coercion)](#implicit-conversion-type-coercion)
4. [Truthy and Falsy Values](#truthy-and-falsy-values)
5. [Interview Questions](#interview-questions)
6. [Common Pitfalls](#common-pitfalls)
7. [Best Practices](#best-practices)

---

## What is Type Conversion?

**Definition**: Type conversion is the process of converting a value from one data type to another.

**Simple Explanation**: Sometimes you need to change data from one type to another - like converting a string "42" to the number 42, or a number to a string.

```javascript
// Converting string to number
let str = "42";
let num = Number(str);
console.log(num);  // 42 (number)

// Converting number to string
let age = 25;
let ageStr = String(age);
console.log(ageStr);  // "25" (string)
```

**Two types of conversion:**
1. **Explicit Conversion** - You manually convert (type casting)
2. **Implicit Conversion** - JavaScript automatically converts (type coercion)

---

## Explicit Conversion (Type Casting)

You deliberately convert one type to another using conversion functions.

### Converting to String

```javascript
// String() function
let num = 42;
let str1 = String(num);
console.log(str1);       // "42"
console.log(typeof str1); // "string"

// toString() method
let num2 = 100;
let str2 = num2.toString();
console.log(str2);  // "100"

// Template literals
let str3 = `${num}`;
console.log(str3);  // "42"

// Examples with different types
console.log(String(true));      // "true"
console.log(String(false));     // "false"
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"
console.log(String([1, 2, 3])); // "1,2,3"
console.log(String({a: 1}));    // "[object Object]"

// toString() with radix (base)
let num = 255;
console.log(num.toString(2));   // "11111111" (binary)
console.log(num.toString(8));   // "377" (octal)
console.log(num.toString(16));  // "ff" (hexadecimal)
```

### Converting to Number

```javascript
// Number() function
let str = "42";
let num = Number(str);
console.log(num);        // 42
console.log(typeof num); // "number"

// Examples with different types
console.log(Number("123"));      // 123
console.log(Number("123.45"));   // 123.45
console.log(Number(""));         // 0 (empty string)
console.log(Number(" "));        // 0 (whitespace)
console.log(Number("123abc"));   // NaN
console.log(Number("abc"));      // NaN
console.log(Number(true));       // 1
console.log(Number(false));      // 0
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN
console.log(Number([1]));        // 1
console.log(Number([1, 2]));     // NaN
console.log(Number({}));         // NaN

// parseInt() - parses integer
console.log(parseInt("42"));       // 42
console.log(parseInt("42.5"));     // 42 (truncates decimal)
console.log(parseInt("42px"));     // 42 (stops at non-digit)
console.log(parseInt("px42"));     // NaN (must start with digit)
console.log(parseInt("   42"));    // 42 (ignores leading whitespace)

// parseInt with radix (base)
console.log(parseInt("1010", 2));  // 10 (binary to decimal)
console.log(parseInt("FF", 16));   // 255 (hex to decimal)
console.log(parseInt("77", 8));    // 63 (octal to decimal)

// parseFloat() - parses floating point
console.log(parseFloat("42.5"));     // 42.5
console.log(parseFloat("42.5px"));   // 42.5
console.log(parseFloat("3.14abc"));  // 3.14

// Unary + operator (shorthand)
console.log(+"42");      // 42
console.log(+"42.5");    // 42.5
console.log(+"");        // 0
console.log(+"abc");     // NaN
console.log(+true);      // 1
console.log(+false);     // 0
console.log(+null);      // 0
console.log(+undefined); // NaN
```

### Converting to Boolean

```javascript
// Boolean() function
console.log(Boolean(1));          // true
console.log(Boolean(0));          // false
console.log(Boolean("hello"));    // true
console.log(Boolean(""));         // false
console.log(Boolean("  "));       // true (non-empty string)
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false
console.log(Boolean({}));         // true (empty object)
console.log(Boolean([]));         // true (empty array)
console.log(Boolean(function(){})); // true

// Double negation operator !! (shorthand)
console.log(!!"hello");  // true
console.log(!!0);        // false
console.log(!!"");       // false
console.log(!!{});       // true

// Practical use
let value = "some text";
if (value) {
  console.log("Value exists");
}

// Explicitly convert to boolean
if (Boolean(value)) {
  console.log("Value exists");
}
```

---

## Implicit Conversion (Type Coercion)

JavaScript automatically converts types in certain situations.

### String Coercion

When using the `+` operator with strings, other values are converted to strings.

```javascript
// Number + String → String concatenation
console.log(5 + "5");      // "55"
console.log("5" + 5);      // "55"
console.log("Hello" + 5);  // "Hello5"

// Multiple operations
console.log(1 + 2 + "3");    // "33" (1+2=3, then "3"+"3")
console.log("3" + 1 + 2);    // "312" ("3"+"1"+"2")
console.log(1 + "2" + 3);    // "123"

// With other types
console.log("Hello" + true);      // "Hellotrue"
console.log("Value: " + null);    // "Value: null"
console.log("Value: " + undefined); // "Value: undefined"
console.log("Array: " + [1, 2, 3]); // "Array: 1,2,3"
console.log("Object: " + {a: 1});   // "Object: [object Object]"
```

### Numeric Coercion

Other arithmetic operators convert values to numbers.

```javascript
// Subtraction
console.log("10" - 5);     // 5 (string to number)
console.log("10" - "5");   // 5 (both to numbers)
console.log(10 - "abc");   // NaN

// Multiplication
console.log("5" * 2);      // 10
console.log("5" * "2");    // 10
console.log("abc" * 2);    // NaN

// Division
console.log("10" / 2);     // 5
console.log("10" / "2");   // 5

// Modulus
console.log("10" % 3);     // 1

// Exponentiation
console.log("2" ** 3);     // 8

// With booleans
console.log(true + 1);     // 2 (true becomes 1)
console.log(false + 5);    // 5 (false becomes 0)
console.log(true * 10);    // 10
console.log(false * 10);   // 0

// With null and undefined
console.log(null + 5);     // 5 (null becomes 0)
console.log(undefined + 5); // NaN
console.log(null * 10);    // 0
console.log(undefined * 10); // NaN

// Unary plus
console.log(+"5");         // 5
console.log(+true);        // 1
console.log(+false);       // 0
console.log(+null);        // 0
console.log(+undefined);   // NaN
```

### Boolean Coercion

Values are converted to boolean in conditional statements.

```javascript
// if statements
if ("hello") {
  console.log("Truthy");  // Executes
}

if (0) {
  console.log("Won't execute");  // 0 is falsy
}

// Logical operators
console.log(5 && "hello");     // "hello" (both truthy, returns second)
console.log(0 && "hello");     // 0 (first is falsy, returns it)
console.log("" || "default");  // "default" (first is falsy)
console.log("hi" || "default"); // "hi" (first is truthy)

// Ternary operator
let message = value ? "exists" : "missing";

// while loops
let count = 5;
while (count) {  // count is coerced to boolean
  console.log(count);
  count--;
}
// Output: 5, 4, 3, 2, 1 (stops when count is 0/falsy)
```

### Comparison Coercion

```javascript
// Loose equality (==) performs type coercion
console.log(5 == "5");         // true (string "5" → number 5)
console.log(0 == false);       // true (false → 0)
console.log("" == false);      // true (both → 0)
console.log(null == undefined); // true (special case)
console.log(1 == true);        // true (true → 1)
console.log(0 == false);       // true (false → 0)

// Strict equality (===) does NOT coerce
console.log(5 === "5");        // false
console.log(0 === false);      // false
console.log("" === false);     // false
console.log(null === undefined); // false

// Relational operators coerce to numbers
console.log("10" > 5);         // true ("10" → 10)
console.log("5" < "10");       // false (lexicographic: "5" > "1")
console.log("10" > "5");       // false (lexicographic)
console.log(10 > "5");         // true (5 → number 5)

// Comparing with null/undefined
console.log(null > 0);         // false (null → 0, but 0 > 0 is false)
console.log(null == 0);        // false (special rule)
console.log(null >= 0);        // true (null → 0)
console.log(undefined > 0);    // false (undefined → NaN)
console.log(undefined == 0);   // false
```

---

## Truthy and Falsy Values

Understanding truthy/falsy is crucial for type coercion.

### Falsy Values (Only 6)

```javascript
// These 6 values are falsy:
if (false) console.log("Won't print");
if (0) console.log("Won't print");
if (-0) console.log("Won't print");
if ("") console.log("Won't print");
if (null) console.log("Won't print");
if (undefined) console.log("Won't print");
if (NaN) console.log("Won't print");

// Converting falsy to boolean
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(-0));        // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false
```

### Truthy Values (Everything Else)

```javascript
// All these are truthy:
if (true) console.log("Prints");         // ✅
if (1) console.log("Prints");            // ✅
if (-1) console.log("Prints");           // ✅
if ("hello") console.log("Prints");      // ✅
if (" ") console.log("Prints");          // ✅ Space is truthy!
if ("0") console.log("Prints");          // ✅ String "0" is truthy!
if ("false") console.log("Prints");      // ✅ String "false" is truthy!
if ([]) console.log("Prints");           // ✅ Empty array is truthy!
if ({}) console.log("Prints");           // ✅ Empty object is truthy!
if (function(){}) console.log("Prints"); // ✅

// Converting truthy to boolean
console.log(Boolean(true));        // true
console.log(Boolean(1));           // true
console.log(Boolean("hello"));     // true
console.log(Boolean([]));          // true
console.log(Boolean({}));          // true
```

### Common Gotchas

```javascript
// String "0" and "false" are truthy!
if ("0") {
  console.log("String '0' is truthy!");  // Prints!
}

if ("false") {
  console.log("String 'false' is truthy!");  // Prints!
}

// Empty arrays and objects are truthy!
if ([]) {
  console.log("Empty array is truthy!");  // Prints!
}

if ({}) {
  console.log("Empty object is truthy!");  // Prints!
}

// Checking for empty array/object
let arr = [];
if (arr.length === 0) {
  console.log("Array is empty");  // ✅ Correct check
}

let obj = {};
if (Object.keys(obj).length === 0) {
  console.log("Object is empty");  // ✅ Correct check
}
```

---

## Interview Questions

### Question 1: What's the difference between type conversion and type coercion?

**Answer:**

**Type Conversion (Explicit):**
- You manually convert types
- Uses conversion functions: `String()`, `Number()`, `Boolean()`
- Explicit and clear in code

**Type Coercion (Implicit):**
- JavaScript automatically converts types
- Happens with operators and comparisons
- Can be unexpected if you don't understand the rules

```javascript
// Explicit conversion (Type Casting)
let num = Number("42");     // You convert
let str = String(100);      // You convert
let bool = Boolean(1);      // You convert

// Implicit coercion (Automatic)
let result = "5" + 2;       // "52" (JavaScript converts)
let sum = "5" - 2;          // 3 (JavaScript converts)
let check = 5 == "5";       // true (JavaScript converts)
```

---

### Question 2: What will be the output?

```javascript
console.log(1 + "2" + 3);
console.log(1 + 2 + "3");
console.log("1" + 2 + 3);
```

**Answer:**

Output:
```
"123"
"33"
"123"
```

**Explanation:**

```javascript
// Example 1: 1 + "2" + 3
// Left to right: 1 + "2" → "12", then "12" + 3 → "123"
console.log(1 + "2" + 3);  // "123"

// Example 2: 1 + 2 + "3"
// Left to right: 1 + 2 → 3, then 3 + "3" → "33"
console.log(1 + 2 + "3");  // "33"

// Example 3: "1" + 2 + 3
// Left to right: "1" + 2 → "12", then "12" + 3 → "123"
console.log("1" + 2 + 3);  // "123"
```

**Key rule**: When `+` operator encounters a string, it converts everything to strings and concatenates.

---

### Question 3: What's the difference between == and ===?

**Answer:**

**== (Loose Equality):**
- Compares values after type coercion
- Can give unexpected results

**=== (Strict Equality):**
- Compares both value AND type
- No type coercion
- Recommended for most cases

```javascript
// == (loose equality)
console.log(5 == "5");         // true (string "5" → number 5)
console.log(0 == false);       // true (false → 0)
console.log("" == false);      // true (both → 0)
console.log(null == undefined);// true
console.log(1 == true);        // true (true → 1)

// === (strict equality)
console.log(5 === "5");        // false (different types)
console.log(0 === false);      // false (different types)
console.log("" === false);     // false (different types)
console.log(null === undefined);// false (different types)
console.log(1 === true);       // false (different types)

// Always prefer ===
if (value === 5) {  // ✅ Good
  console.log("Value is exactly 5");
}

if (value == 5) {  // ❌ Bad (avoid)
  console.log("Value might be 5 or '5'");
}
```

---

### Question 4: What are truthy and falsy values? List all falsy values.

**Answer:**

**Falsy values** - Only **6 values** that convert to `false`:

1. `false`
2. `0` (and `-0`)
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`

**Truthy values** - Everything else, including:
- `true`
- Non-zero numbers (`1`, `-1`, `3.14`)
- Non-empty strings (`"hello"`, `"0"`, `"false"`, `" "`)
- Objects `{}`
- Arrays `[]`
- Functions

```javascript
// Falsy
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

// Truthy
console.log(Boolean(1));         // true
console.log(Boolean("hello"));   // true
console.log(Boolean([]));        // true (empty array!)
console.log(Boolean({}));        // true (empty object!)
console.log(Boolean("0"));       // true (string "0"!)
console.log(Boolean("false"));   // true (string "false"!)
```

---

### Question 5: What will be the output and why?

```javascript
console.log([] + []);
console.log([] + {});
console.log({} + []);
console.log({} + {});
```

**Answer:**

Output (depends on environment):
```
""
"[object Object]"
"[object Object]" or 0 (depends on context)
"[object Object][object Object]" or NaN
```

**Explanation:**

```javascript
// [] + []
// Both arrays convert to empty strings: "" + "" = ""
console.log([] + []);  // ""

// [] + {}
// [] → "", {} → "[object Object]"
console.log([] + {});  // "[object Object]"

// {} + []
// In some contexts, {} is seen as empty block, +[] is 0
// In other contexts: {} → "[object Object]", [] → ""
console.log({} + []);  // "[object Object]" or 0

// {} + {}
// In some contexts: NaN
// In other contexts: "[object Object][object Object]"
console.log({} + {});  // varies

// Safer approach with explicit parentheses
console.log(({}) + []);     // "[object Object]"
console.log(({}) + ({}));   // "[object Object][object Object]"
```

**Key lesson**: Avoid adding objects/arrays - results are unpredictable!

---

### Question 6: Explain the difference between Number(), parseInt(), and parseFloat().

**Answer:**

**Number():**
- Converts entire string to number
- Strict - returns `NaN` if any non-numeric characters
- Converts empty string to `0`

**parseInt():**
- Parses integer from start of string
- Stops at first non-digit
- Truncates decimals
- Takes optional radix (base)

**parseFloat():**
- Parses floating-point number
- Stops at first invalid character
- Preserves decimals

```javascript
// Number() - strict
console.log(Number("42"));       // 42
console.log(Number("42.5"));     // 42.5
console.log(Number("42px"));     // NaN (strict!)
console.log(Number(""));         // 0 (empty string → 0)
console.log(Number("  "));       // 0 (whitespace → 0)

// parseInt() - flexible
console.log(parseInt("42"));     // 42
console.log(parseInt("42.5"));   // 42 (truncates decimal)
console.log(parseInt("42px"));   // 42 (stops at 'p')
console.log(parseInt("px42"));   // NaN (must start with digit)
console.log(parseInt(""));       // NaN

// With radix
console.log(parseInt("1010", 2)); // 10 (binary)
console.log(parseInt("FF", 16));  // 255 (hex)

// parseFloat() - preserves decimals
console.log(parseFloat("42"));     // 42
console.log(parseFloat("42.5"));   // 42.5
console.log(parseFloat("42.5px")); // 42.5
console.log(parseFloat("3.14.159")); // 3.14 (stops at second dot)

// Comparison
let str = "42.5px";
console.log(Number(str));       // NaN
console.log(parseInt(str));     // 42
console.log(parseFloat(str));   // 42.5
console.log(+str);              // NaN (same as Number)
```

**When to use:**
- Use `Number()` or `+` for strict conversion
- Use `parseInt()` for extracting integers
- Use `parseFloat()` for extracting decimals

---

## Common Pitfalls

### 1. String Concatenation vs Addition

```javascript
// ❌ Unexpected string concatenation
console.log("5" + 2);      // "52" (not 7!)
console.log(5 + "2");      // "52"
console.log("5" + 2 + 3);  // "523" (not 10!)

// ✅ Convert to numbers first
console.log(Number("5") + 2);  // 7
console.log(+"5" + 2);         // 7
console.log(5 + Number("2"));  // 7
```

### 2. Falsy Values Treated as 0

```javascript
// ❌ Unexpected conversions
console.log(null + 5);      // 5 (null → 0)
console.log(false + 10);    // 10 (false → 0)
console.log(true + 5);      // 6 (true → 1)

// ✅ Be explicit
if (value !== null && value !== undefined) {
  let result = value + 5;
}
```

### 3. Empty String Converts to 0

```javascript
// ❌ Confusing behavior
console.log("" == 0);       // true
console.log("" == false);   // true
console.log(Number(""));    // 0
console.log(+"");           // 0

// ✅ Check for empty string explicitly
if (str === "") {
  console.log("String is empty");
}
```

### 4. Arrays and Objects in Comparisons

```javascript
// ❌ Unexpected results
console.log([] == false);   // true ([] → "" → 0)
console.log([] == 0);       // true
console.log([1] == 1);      // true ([1] → "1" → 1)

// ✅ Use strict equality
console.log([] === false);  // false
console.log([] === 0);      // false

// ✅ Check array length
if (arr.length > 0) {
  console.log("Array has items");
}
```

### 5. NaN Comparisons

```javascript
// ❌ NaN never equals NaN
console.log(NaN == NaN);    // false
console.log(NaN === NaN);   // false

// ✅ Use Number.isNaN()
console.log(Number.isNaN(NaN));  // true
console.log(isNaN("text"));      // true (converts first)
console.log(Number.isNaN("text"));// false (no conversion)
```

---

## Best Practices

### 1. Always Use Strict Equality (===)

```javascript
// ❌ Bad - loose equality
if (value == 5) {}

// ✅ Good - strict equality
if (value === 5) {}
```

### 2. Explicitly Convert Types

```javascript
// ❌ Bad - relying on coercion
let result = userInput + 5;

// ✅ Good - explicit conversion
let result = Number(userInput) + 5;
```

### 3. Check for Empty Strings/Arrays/Objects

```javascript
// ❌ Bad - empty string/array/object are truthy
if (str) {}
if (arr) {}
if (obj) {}

// ✅ Good - explicit checks
if (str !== "") {}
if (str.length > 0) {}
if (arr.length > 0) {}
if (Object.keys(obj).length > 0) {}
```

### 4. Use Number.isNaN() Instead of isNaN()

```javascript
// ❌ Bad - converts to number first
console.log(isNaN("text"));  // true (confusing!)

// ✅ Good - checks actual NaN
console.log(Number.isNaN("text"));  // false
console.log(Number.isNaN(NaN));     // true
```

### 5. Be Careful with null and undefined

```javascript
// ❌ Bad - null/undefined behave differently
console.log(null + 5);      // 5 (null → 0)
console.log(undefined + 5); // NaN

// ✅ Good - check first
if (value != null) {  // Checks both null and undefined
  let result = value + 5;
}
```

---

## Summary

### Key Takeaways

1. **Type Conversion** - explicit (you do it)
2. **Type Coercion** - implicit (JavaScript does it)
3. **Falsy values** - only 6: `false`, `0`, `""`, `null`, `undefined`, `NaN`
4. **Use `===` not `==`** to avoid coercion issues
5. **Empty arrays/objects are truthy** - check length/keys instead
6. **`+` with strings = concatenation**, other operators convert to numbers

### Quick Reference

```javascript
// String conversion
String(value)
value.toString()
`${value}`

// Number conversion
Number(value)
parseInt(value, radix)
parseFloat(value)
+value

// Boolean conversion
Boolean(value)
!!value

// Falsy values (only 6)
false, 0, "", null, undefined, NaN

// Everything else is truthy
true, 1, "hello", [], {}, function(){}

// Comparisons
===  // strict equality (no coercion)
==   // loose equality (with coercion) - avoid!
```

### Conversion Rules

| From → To | String | Number | Boolean |
|-----------|--------|--------|---------|
| `"123"` | `"123"` | `123` | `true` |
| `""` | `""` | `0` | `false` |
| `123` | `"123"` | `123` | `true` |
| `0` | `"0"` | `0` | `false` |
| `true` | `"true"` | `1` | `true` |
| `false` | `"false"` | `0` | `false` |
| `null` | `"null"` | `0` | `false` |
| `undefined` | `"undefined"` | `NaN` | `false` |
| `[]` | `""` | `0` | `true` |
| `[1,2]` | `"1,2"` | `NaN` | `true` |
| `{}` | `"[object Object]"` | `NaN` | `true` |

---

**Happy Learning! Master type conversion and you'll avoid many JavaScript bugs! 🚀**
