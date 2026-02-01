# Iterator Pattern

## Intent
Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

## Problem
You need to traverse different data structures in a uniform way without exposing their internal structure.

## Implementation

### Basic Iterator
```javascript
class Iterator {
  constructor(collection) {
    this.collection = collection;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.collection.length;
  }

  next() {
    return this.collection[this.index++];
  }

  reset() {
    this.index = 0;
  }
}

// Usage
const items = [1, 2, 3, 4, 5];
const iterator = new Iterator(items);

while (iterator.hasNext()) {
  console.log(iterator.next());
}
```

### ES6 Iterator Protocol
```javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

// Usage
const range = new Range(1, 5);

for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

## Pros

1. **Uniform Access**: Same interface for different collections
2. **Encapsulation**: Hides internal structure
3. **Multiple Traversals**: Can have multiple iterators

## Cons

1. **Overhead**: Overkill for simple arrays
2. **Complexity**: Extra classes to manage

## When to Use

- ✅ Access collection without exposing structure
- ✅ Support multiple simultaneous traversals
- ✅ Provide uniform interface for different structures

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
