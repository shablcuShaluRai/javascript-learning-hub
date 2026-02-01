# Creational Patterns Interview Questions

## Singleton Pattern

### Q1: When would you use the Singleton pattern?
**Answer:** Use Singleton when you need exactly one instance of a class throughout your application's lifetime.

**Common Use Cases:**
- Configuration managers
- Database connection pools
- Logger instances
- Cache managers
- Thread pools

**Example:**
```javascript
class DatabaseConnection {
  static #instance;

  static getInstance() {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection();
    }
    return DatabaseConnection.#instance;
  }

  query(sql) {
    // Execute query
  }
}

// Usage - same instance everywhere
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true
```

---

### Q2: What are the drawbacks of Singleton pattern?
**Answer:**

**Drawbacks:**
1. **Global State**: Makes testing difficult
2. **Hidden Dependencies**: Not obvious from method signatures
3. **Tight Coupling**: Hard to replace or mock
4. **Threading Issues**: Can cause problems in multi-threaded environments
5. **Violates Single Responsibility**: Manages both instance and business logic

**Better Alternatives:**
- Dependency Injection
- ES6 Modules (export single instance)

```javascript
// Instead of Singleton, use dependency injection
class UserService {
  constructor(database) { // Dependency is explicit
    this.db = database;
  }
}
```

---

### Q3: How do you implement thread-safe Singleton in JavaScript?
**Answer:** JavaScript is single-threaded, but in async contexts or modules:

```javascript
// Module pattern (naturally singleton)
// config.js
class Config {
  constructor() {
    this.settings = {};
  }
}

export default new Config(); // Single instance

// Using async lock for initialization
class AsyncSingleton {
  static #instance;
  static #initPromise;

  static async getInstance() {
    if (!AsyncSingleton.#instance) {
      if (!AsyncSingleton.#initPromise) {
        AsyncSingleton.#initPromise = AsyncSingleton.#initialize();
      }
      AsyncSingleton.#instance = await AsyncSingleton.#initPromise;
    }
    return AsyncSingleton.#instance;
  }

  static async #initialize() {
    // Expensive async initialization
    const instance = new AsyncSingleton();
    await instance.loadConfig();
    return instance;
  }
}
```

---

## Factory Pattern

### Q4: What problem does the Factory pattern solve?
**Answer:** Factory pattern solves the problem of creating objects without specifying their exact classes, providing a centralized place for object creation logic.

**Problems it solves:**
1. **Tight Coupling**: Client doesn't depend on concrete classes
2. **Complex Creation**: Hides complex object creation logic
3. **Flexibility**: Easy to add new product types
4. **Conditional Creation**: Centralizes "if-else" logic for object creation

**Example:**
```javascript
// Without Factory - tight coupling
const payment = new CreditCardPayment(); // Coupled to specific class

// With Factory - loose coupling
const payment = PaymentFactory.create('creditcard'); // Decoupled
```

---

### Q5: What is the difference between Simple Factory and Factory Method?
**Answer:**

**Simple Factory:**
- Not a true pattern (more of an idiom)
- Static method or function
- Single class/function creates objects

```javascript
class ShapeFactory {
  static createShape(type) {
    switch(type) {
      case 'circle': return new Circle();
      case 'square': return new Square();
    }
  }
}
```

**Factory Method:**
- True design pattern
- Uses inheritance
- Subclasses decide what to create

```javascript
class ShapeCreator {
  createShape() {
    throw new Error('Must implement');
  }
}

class CircleCreator extends ShapeCreator {
  createShape() {
    return new Circle();
  }
}

class SquareCreator extends ShapeCreator {
  createShape() {
    return new Square();
  }
}
```

---

### Q6: When to use Factory vs Constructor?
**Answer:**

**Use Constructor when:**
- Simple object creation
- No complex initialization
- Direct instantiation is clear

```javascript
const user = new User('John', 'john@example.com');
```

**Use Factory when:**
- Complex object creation logic
- Need to choose between different classes
- Want to hide creation details
- Need centralized creation logic

```javascript
const logger = LoggerFactory.create(environment); // Different loggers based on env
```

---

## Builder Pattern

### Q7: When should you use the Builder pattern?
**Answer:** Use Builder when creating complex objects with many optional parameters or configuration steps.

**Use Cases:**
- Objects with 4+ constructor parameters
- Many optional parameters
- Step-by-step construction needed
- Want immutable objects after construction
- Telescoping constructor anti-pattern

**Example:**
```javascript
// Without Builder - telescoping constructor
class User {
  constructor(name, email, age, address, phone, role, status, preferences) {
    // Too many parameters!
  }
}

// With Builder - fluent interface
const user = new UserBuilder('John', 'john@example.com')
  .setAge(30)
  .setAddress('123 Main St')
  .setPhone('555-1234')
  .build();
```

---

### Q8: What is the difference between Builder and Factory patterns?
**Answer:**

**Builder:**
- **Purpose**: Construct complex objects step-by-step
- **Focus**: Step-by-step construction process
- **Returns**: Same type of object always
- **Usage**: Chained method calls

**Factory:**
- **Purpose**: Create objects without specifying exact class
- **Focus**: Object creation delegation
- **Returns**: Different types of objects
- **Usage**: Single method call

```javascript
// Builder - same type, complex construction
const car = new CarBuilder()
  .setEngine('V8')
  .setColor('Red')
  .setTransmission('Auto')
  .build(); // Returns Car

// Factory - different types, simple creation
const vehicle = VehicleFactory.create('car'); // Returns Car
const vehicle2 = VehicleFactory.create('truck'); // Returns Truck
```

---

## Prototype Pattern

### Q9: Explain the Prototype pattern and when to use it.
**Answer:** Prototype pattern creates objects by cloning a prototypical instance instead of creating from scratch.

**When to use:**
- Object creation is expensive (database queries, network calls)
- Many similar objects needed
- Want to avoid subclass explosion
- Runtime configuration of objects

**Example:**
```javascript
class DocumentTemplate {
  constructor(title, content, metadata) {
    this.title = title;
    this.content = content;
    this.metadata = metadata;
  }

  clone() {
    return new DocumentTemplate(
      this.title,
      this.content,
      { ...this.metadata }
    );
  }
}

// Create template once
const reportTemplate = new DocumentTemplate(
  'Monthly Report',
  'Default content...',
  { type: 'report', department: 'Sales' }
);

// Clone for each new report
const januaryReport = reportTemplate.clone();
januaryReport.title = 'January Report';

const februaryReport = reportTemplate.clone();
februaryReport.title = 'February Report';
```

---

### Q10: What is the difference between shallow copy and deep copy in Prototype?
**Answer:**

**Shallow Copy:**
- Copies primitive values
- Copies references to objects (not the objects themselves)
- Changes to nested objects affect both original and clone

**Deep Copy:**
- Recursively copies all nested objects
- Clone is completely independent
- Changes don't affect original

```javascript
class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address; // Object reference
  }

  shallowClone() {
    return Object.assign({}, this);
  }

  deepClone() {
    return new Person(
      this.name,
      { ...this.address } // Clone the address object
    );
  }
}

const person1 = new Person('John', { city: 'NYC', zip: '10001' });

// Shallow clone - address is shared
const person2 = person1.shallowClone();
person2.address.city = 'LA';
console.log(person1.address.city); // 'LA' - affected!

// Deep clone - address is independent
const person3 = person1.deepClone();
person3.address.city = 'Chicago';
console.log(person1.address.city); // 'LA' - not affected
```

---

## Abstract Factory Pattern

### Q11: When would you use Abstract Factory over Factory Method?
**Answer:**

**Use Abstract Factory when:**
- Need to create families of related objects
- Objects must work together (consistency requirement)
- System should be independent of how products are created
- Want to enforce related objects are used together

**Example Scenario:** UI Toolkit with themes

```javascript
// Abstract Factory - creates families
class LightThemeFactory {
  createButton() { return new LightButton(); }
  createInput() { return new LightInput(); }
  createDialog() { return new LightDialog(); }
  // All components work together in light theme
}

class DarkThemeFactory {
  createButton() { return new DarkButton(); }
  createInput() { return new DarkInput(); }
  createDialog() { return new DarkDialog(); }
  // All components work together in dark theme
}

// Ensures all UI components match the theme
const factory = new LightThemeFactory();
const button = factory.createButton(); // Light button
const input = factory.createInput();   // Light input (matches button)
```

**Use Factory Method when:**
- Creating single products
- Don't need families of related objects

---

### Q12: What are the trade-offs of using Abstract Factory?
**Answer:**

**Pros:**
- Ensures product families are used together
- Isolates concrete classes
- Easy to swap entire product families
- Consistent interface across products

**Cons:**
- **Complexity**: Many classes and interfaces
- **Rigidity**: Hard to add new products to families
- **Overhead**: May be overkill for simple scenarios

**Example of rigidity:**
```javascript
// If you need to add "Slider" to all themes
// Must update ALL factories
class LightThemeFactory {
  createButton() { }
  createInput() { }
  createDialog() { }
  createSlider() { } // Add to every factory!
}

class DarkThemeFactory {
  createButton() { }
  createInput() { }
  createDialog() { }
  createSlider() { } // Must add here too!
}
```

---

[← Back to Interview Questions](./README.md)
