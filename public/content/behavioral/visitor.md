# Visitor Pattern

## Intent
Represent an operation to be performed on elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements.

## Implementation

### Basic Visitor
```javascript
// Element interface
class Shape {
  accept(visitor) {
    throw new Error('accept() must be implemented');
  }
}

// Concrete Elements
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  accept(visitor) {
    visitor.visitCircle(this);
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  accept(visitor) {
    visitor.visitRectangle(this);
  }
}

// Visitor interface
class ShapeVisitor {
  visitCircle(circle) {
    throw new Error('visitCircle() must be implemented');
  }

  visitRectangle(rectangle) {
    throw new Error('visitRectangle() must be implemented');
  }
}

// Concrete Visitors
class AreaCalculator extends ShapeVisitor {
  visitCircle(circle) {
    const area = Math.PI * circle.radius ** 2;
    console.log(`Circle area: ${area.toFixed(2)}`);
  }

  visitRectangle(rectangle) {
    const area = rectangle.width * rectangle.height;
    console.log(`Rectangle area: ${area}`);
  }
}

// Usage
const shapes = [new Circle(5), new Rectangle(4, 6)];
const calculator = new AreaCalculator();

shapes.forEach(shape => shape.accept(calculator));
```

## Pros

1. **Open/Closed**: Add new operations without modifying elements
2. **Single Responsibility**: Related operations in one class
3. **Accumulate State**: Visitor can accumulate state

## Cons

1. **Adding Elements**: Hard to add new element types
2. **Encapsulation**: May break encapsulation
3. **Complexity**: Can be complex pattern

## When to Use

- ✅ Many distinct operations on object structure
- ✅ Object structure rarely changes
- ✅ Operations change frequently

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
