# Template Method Pattern

## Intent
Define the skeleton of an algorithm in a method, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps without changing the algorithm's structure.

## Implementation

### Basic Template Method
```javascript
// Abstract class
class DataProcessor {
  // Template method
  process() {
    this.readData();
    this.processData();
    this.writeData();
  }

  readData() {
    throw new Error('readData() must be implemented');
  }

  processData() {
    throw new Error('processData() must be implemented');
  }

  writeData() {
    throw new Error('writeData() must be implemented');
  }
}

// Concrete classes
class CSVProcessor extends DataProcessor {
  readData() {
    console.log('Reading CSV file');
    this.data = 'csv,data,here';
  }

  processData() {
    console.log('Processing CSV data');
    this.result = this.data.split(',');
  }

  writeData() {
    console.log('Writing CSV result:', this.result);
  }
}

class JSONProcessor extends DataProcessor {
  readData() {
    console.log('Reading JSON file');
    this.data = '{"key": "value"}';
  }

  processData() {
    console.log('Processing JSON data');
    this.result = JSON.parse(this.data);
  }

  writeData() {
    console.log('Writing JSON result:', this.result);
  }
}

// Usage
const csvProcessor = new CSVProcessor();
csvProcessor.process();

console.log();

const jsonProcessor = new JSONProcessor();
jsonProcessor.process();
```

## Pros

1. **Code Reuse**: Common algorithm in one place
2. **Control**: Superclass controls algorithm flow
3. **Flexibility**: Subclasses customize specific steps

## Cons

1. **Inheritance**: Tight coupling via inheritance
2. **Maintenance**: Hard to maintain if template gets complex
3. **Liskov Violation**: May violate Liskov Substitution Principle

## When to Use

- ✅ Common algorithm with varying steps
- ✅ Control subclass extensions
- ✅ Avoid code duplication

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
