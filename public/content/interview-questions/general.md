# Design Patterns Interview Questions

## General Questions

### Q1: What are design patterns?
**Answer:** Design patterns are reusable solutions to commonly occurring problems in software design. They represent best practices evolved over time and provide a standard terminology for developers to communicate. Design patterns are not finished code but templates that can be applied to solve problems in various situations.

**Key Points:**
- Not specific code implementations
- Proven solutions to recurring problems
- Improve code maintainability and scalability
- Facilitate communication among developers

---

### Q2: What are the main categories of design patterns?
**Answer:** Design patterns are divided into three main categories:

1. **Creational Patterns**: Deal with object creation mechanisms
   - Singleton, Factory, Abstract Factory, Builder, Prototype

2. **Structural Patterns**: Deal with object composition and relationships
   - Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy

3. **Behavioral Patterns**: Deal with object interaction and responsibility
   - Observer, Strategy, Command, State, Chain of Responsibility, Iterator, Mediator, Memento, Template Method, Visitor, Interpreter

---

### Q3: What are the advantages of using design patterns?
**Answer:**
1. **Proven Solutions**: Time-tested approaches to common problems
2. **Reusability**: Can be applied across different projects
3. **Maintainability**: Code is easier to understand and modify
4. **Communication**: Provides common vocabulary for developers
5. **Best Practices**: Incorporates industry standards
6. **Scalability**: Helps build flexible, extensible systems
7. **Documentation**: Patterns serve as documentation of design decisions

---

### Q4: When should you NOT use a design pattern?
**Answer:**
- When the problem is simple and doesn't require abstraction
- When it adds unnecessary complexity (over-engineering)
- When performance is critical and the pattern adds overhead
- When the team is unfamiliar with the pattern and it slows development
- When a simpler solution achieves the same goal

**Remember:** Don't force patterns where they don't fit. Use them when they genuinely solve a problem.

---

### Q5: What is the difference between Abstract Factory and Factory Method patterns?
**Answer:**

**Factory Method:**
- Creates one product
- Uses inheritance (subclasses decide what to create)
- One method creates objects
- Example: `createButton()` returns a button

**Abstract Factory:**
- Creates families of related products
- Uses composition (factory object creates products)
- Multiple methods create different products
- Example: `createButton()`, `createCheckbox()`, `createInput()` all work together

```javascript
// Factory Method
class ButtonFactory {
  createButton(type) {
    // Returns ONE type of product
  }
}

// Abstract Factory
class UIFactory {
  createButton() { }
  createCheckbox() { }
  createInput() { }
  // Creates FAMILY of products that work together
}
```

---

### Q6: Explain the Open/Closed Principle in relation to design patterns.
**Answer:** The Open/Closed Principle states that software entities should be **open for extension but closed for modification**.

**In Design Patterns:**
- **Strategy Pattern**: Add new strategies without modifying context
- **Decorator Pattern**: Add new features without changing original class
- **Factory Pattern**: Add new product types without changing factory interface
- **Observer Pattern**: Add new observers without modifying subject

**Example:**
```javascript
// Closed for modification - don't change this
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  process(amount) {
    return this.strategy.pay(amount);
  }
}

// Open for extension - add new payment methods
class CryptoPayment {
  pay(amount) {
    // New payment method
  }
}
```

---

### Q7: What is the difference between Decorator and Proxy patterns?
**Answer:**

**Decorator Pattern:**
- **Purpose**: Add new functionality/behavior
- **Focus**: Enhancement
- **Example**: Add logging, caching, validation to existing object
- **Multiple decorators**: Can stack many decorators

**Proxy Pattern:**
- **Purpose**: Control access to object
- **Focus**: Access control, lazy loading, protection
- **Example**: Virtual proxy (lazy loading), protection proxy (access control)
- **Usually one proxy**: Single proxy controls access

```javascript
// Decorator - adds functionality
const coffee = new Coffee();
const milkCoffee = new MilkDecorator(coffee); // Adds milk
const sugarMilkCoffee = new SugarDecorator(milkCoffee); // Adds sugar

// Proxy - controls access
const expensiveObject = new Proxy(realObject, {
  get(target, prop) {
    // Control access, add lazy loading, etc.
  }
});
```

---

### Q8: Explain the Dependency Inversion Principle with an example.
**Answer:** High-level modules should not depend on low-level modules. Both should depend on abstractions.

**Without DIP (Bad):**
```javascript
class MySQLDatabase {
  connect() { }
  query() { }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // Tight coupling!
  }
}
```

**With DIP (Good):**
```javascript
// Abstraction
class Database {
  connect() { }
  query() { }
}

// Implementations
class MySQLDatabase extends Database { }
class MongoDatabase extends Database { }

// High-level module depends on abstraction
class UserService {
  constructor(database) {
    this.db = database; // Depends on abstraction, not concrete class
  }
}

// Usage
const service = new UserService(new MySQLDatabase());
```

---

### Q9: What is the Single Responsibility Principle? Give an example.
**Answer:** A class should have only one reason to change - it should have only one responsibility.

**Violates SRP:**
```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  save() {
    // Database logic - different responsibility!
    database.save(this);
  }

  sendEmail() {
    // Email logic - another responsibility!
    emailService.send(this.email);
  }
}
```

**Follows SRP:**
```javascript
// One responsibility: represent user data
class User {
  constructor(name) {
    this.name = name;
  }
}

// One responsibility: persist users
class UserRepository {
  save(user) {
    database.save(user);
  }
}

// One responsibility: send emails
class EmailService {
  sendWelcomeEmail(user) {
    // Email logic
  }
}
```

---

### Q10: How do you choose between Composition and Inheritance?
**Answer:**

**Use Inheritance when:**
- True "is-a" relationship exists
- Subclass is a specialized version of superclass
- Need to override behavior

**Use Composition when:**
- "has-a" or "uses-a" relationship
- Need flexibility to change behavior at runtime
- Want to avoid deep inheritance hierarchies
- Following "favor composition over inheritance"

**Example:**
```javascript
// Inheritance (is-a)
class Animal { }
class Dog extends Animal { } // Dog IS-A Animal ✓

// Composition (has-a)
class Car {
  constructor() {
    this.engine = new Engine(); // Car HAS-A Engine ✓
    this.wheels = [new Wheel(), new Wheel()];
  }
}
```

**Design Patterns favoring composition:**
- Strategy Pattern
- Decorator Pattern
- Composite Pattern

---

### Q11: What is the Liskov Substitution Principle?
**Answer:** Objects of a superclass should be replaceable with objects of a subclass without breaking the application.

**Violation:**
```javascript
class Bird {
  fly() {
    console.log('Flying');
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error('Penguins cannot fly!'); // Violates LSP!
  }
}

function makeBirdFly(bird) {
  bird.fly(); // Breaks if bird is a Penguin
}
```

**Solution:**
```javascript
class Bird { }

class FlyingBird extends Bird {
  fly() {
    console.log('Flying');
  }
}

class Penguin extends Bird {
  swim() {
    console.log('Swimming');
  }
}
```

---

### Q12: Explain the difference between Strategy and State patterns.
**Answer:**

**Strategy Pattern:**
- **Purpose**: Select algorithm at runtime
- **Client**: Knows about different strategies
- **Behavior**: Algorithms are independent
- **Example**: Different sorting algorithms, payment methods

**State Pattern:**
- **Purpose**: Change behavior when state changes
- **Client**: Doesn't know about different states
- **Behavior**: States often depend on each other (state transitions)
- **Example**: Document workflow (draft → review → published)

```javascript
// Strategy - client chooses
const processor = new PaymentProcessor();
processor.setStrategy(new CreditCardStrategy()); // Client decides

// State - object manages its own state
const document = new Document();
document.publish(); // Document changes its own state internally
```

---

### Q13: What are Anti-patterns?
**Answer:** Anti-patterns are common solutions to problems that appear to work but lead to negative consequences.

**Common Anti-patterns:**

1. **God Object**: One class does everything
2. **Spaghetti Code**: No structure, tangled dependencies
3. **Lava Flow**: Dead code left in the codebase
4. **Golden Hammer**: Using one solution for everything
5. **Copy-Paste Programming**: Duplicating code instead of abstracting

**Example:**
```javascript
// God Object Anti-pattern
class Application {
  handleUI() { }
  connectDatabase() { }
  sendEmail() { }
  processPayment() { }
  generateReports() { }
  // ... everything in one class!
}
```

---

### Q14: How do design patterns relate to SOLID principles?
**Answer:**

**S - Single Responsibility:**
- Strategy, Command, Observer patterns

**O - Open/Closed:**
- Strategy, Decorator, Factory patterns

**L - Liskov Substitution:**
- All patterns that use inheritance

**I - Interface Segregation:**
- Adapter, Facade patterns

**D - Dependency Inversion:**
- Factory, Abstract Factory, Strategy patterns

---

### Q15: What is the difference between Adapter and Facade patterns?
**Answer:**

**Adapter:**
- **Purpose**: Make incompatible interfaces compatible
- **Scope**: Wraps single class
- **Intent**: Interface conversion
- **Example**: Adapt old payment API to new interface

**Facade:**
- **Purpose**: Simplify complex subsystem
- **Scope**: Wraps multiple classes/subsystems
- **Intent**: Provide simplified interface
- **Example**: Simple API for complex library

```javascript
// Adapter - makes one thing compatible
class PayPalAdapter {
  constructor(paypal) {
    this.paypal = paypal;
  }

  pay(amount) {
    return this.paypal.sendPayment(amount); // Adapt interface
  }
}

// Facade - simplifies many things
class HomeTheaterFacade {
  constructor() {
    this.dvd = new DVDPlayer();
    this.amp = new Amplifier();
    this.lights = new Lights();
  }

  watchMovie(movie) {
    // Simplifies using multiple components
    this.lights.dim();
    this.amp.on();
    this.dvd.play(movie);
  }
}
```

---

[← Back to Interview Questions](./README.md)
