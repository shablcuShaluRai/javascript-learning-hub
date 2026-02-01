# Interpreter Pattern

## Intent
Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.

## Implementation

### Basic Interpreter
```javascript
// Abstract Expression
class Expression {
  interpret(context) {
    throw new Error('interpret() must be implemented');
  }
}

// Terminal Expressions
class NumberExpression extends Expression {
  constructor(number) {
    super();
    this.number = number;
  }

  interpret(context) {
    return this.number;
  }
}

// Non-terminal Expressions
class AddExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

class SubtractExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) - this.right.interpret(context);
  }
}

// Usage
// Represents: (5 + 3) - 2
const expression = new SubtractExpression(
  new AddExpression(new NumberExpression(5), new NumberExpression(3)),
  new NumberExpression(2)
);

console.log(expression.interpret()); // 6
```

## Pros

1. **Extensibility**: Easy to add new expressions
2. **Grammar**: Explicit grammar representation
3. **Flexibility**: Can change and extend grammar

## Cons

1. **Complexity**: Complex grammars become hard to maintain
2. **Performance**: Interpretation can be slow
3. **Maintenance**: Large grammar needs many classes

## When to Use

- ✅ Grammar is simple
- ✅ Efficiency is not critical
- ✅ Domain-specific language needed

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
