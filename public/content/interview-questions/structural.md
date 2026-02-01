# Structural Patterns Interview Questions

## Adapter Pattern

### Q1: Explain the Adapter pattern with a real-world example.
**Answer:** Adapter pattern makes incompatible interfaces work together by wrapping an object with a different interface.

**Real-World Analogy:** Power adapter for traveling - converts US plug to EU socket.

**Code Example:**
```javascript
// Old payment API (incompatible interface)
class LegacyPaymentAPI {
  makePayment(amount, accountNumber) {
    return `Legacy payment: $${amount} from account ${accountNumber}`;
  }
}

// New interface our app expects
class PaymentProcessor {
  process(paymentDetails) {
    throw new Error('Must implement');
  }
}

// Adapter makes legacy API compatible
class LegacyPaymentAdapter extends PaymentProcessor {
  constructor() {
    super();
    this.legacyAPI = new LegacyPaymentAPI();
  }

  process(paymentDetails) {
    // Adapt new interface to old API
    return this.legacyAPI.makePayment(
      paymentDetails.amount,
      paymentDetails.account
    );
  }
}

// Usage - client uses new interface
const processor = new LegacyPaymentAdapter();
processor.process({ amount: 100, account: '12345' });
```

**When to use:**
- Integrating third-party libraries
- Working with legacy code
- Making old API compatible with new system

---

### Q2: What is the difference between Class Adapter and Object Adapter?
**Answer:**

**Object Adapter (Composition):**
- Uses composition
- More flexible
- Can adapt multiple adaptees
- Preferred in JavaScript

```javascript
class ObjectAdapter {
  constructor(adaptee) {
    this.adaptee = adaptee; // Composition
  }

  request() {
    return this.adaptee.specificRequest();
  }
}
```

**Class Adapter (Inheritance):**
- Uses inheritance
- Less flexible
- Can only adapt one class
- Less common in JavaScript

```javascript
class ClassAdapter extends Adaptee {
  request() {
    return this.specificRequest(); // Inherited method
  }
}
```

---

## Proxy Pattern

### Q3: What are the different types of Proxy patterns?
**Answer:**

**1. Virtual Proxy (Lazy Loading):**
```javascript
class ImageProxy {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
  }

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename); // Load only when needed
    }
    return this.realImage.display();
  }
}
```

**2. Protection Proxy (Access Control):**
```javascript
class ProtectedDocument {
  constructor(document, userRole) {
    this.document = document;
    this.userRole = userRole;
  }

  read() {
    if (this.userRole === 'admin' || this.userRole === 'user') {
      return this.document.read();
    }
    throw new Error('Access denied');
  }

  write(content) {
    if (this.userRole === 'admin') {
      return this.document.write(content);
    }
    throw new Error('Access denied');
  }
}
```

**3. Remote Proxy:**
- Represents object in different address space
- Used in distributed systems

**4. Caching Proxy:**
```javascript
class CachingProxy {
  constructor(service) {
    this.service = service;
    this.cache = new Map();
  }

  query(sql) {
    if (this.cache.has(sql)) {
      return this.cache.get(sql); // Return cached result
    }
    const result = this.service.query(sql);
    this.cache.set(sql, result);
    return result;
  }
}
```

---

### Q4: How does JavaScript's Proxy object relate to the Proxy pattern?
**Answer:** JavaScript's built-in `Proxy` object implements the Proxy pattern at the language level.

**Example:**
```javascript
const user = {
  name: 'John',
  age: 30
};

const userProxy = new Proxy(user, {
  get(target, property) {
    console.log(`Accessing ${property}`);
    return target[property];
  },

  set(target, property, value) {
    if (property === 'age' && typeof value !== 'number') {
      throw new Error('Age must be a number');
    }
    target[property] = value;
    return true;
  }
});

userProxy.age = 31; // Logs: Accessing age
userProxy.age = '25'; // Throws error
```

**Use Cases:**
- Validation
- Logging/monitoring
- Property access control
- Computed properties

---

## Decorator Pattern

### Q5: Explain Decorator pattern and how it differs from inheritance.
**Answer:**

**Decorator Pattern:**
- Adds behavior at runtime
- Uses composition
- Can stack multiple decorators
- Follows Open/Closed principle

**Inheritance:**
- Adds behavior at compile time
- Static relationship
- Creates class explosion with many combinations

**Example:**
```javascript
// Decorator - flexible, runtime composition
class Coffee {
  cost() {
    return 5;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 0.5;
  }
}

// Runtime composition
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.cost()); // 6.5

// Inheritance alternative - class explosion!
// CoffeeWithMilk, CoffeeWithSugar, CoffeeWithMilkAndSugar,
// CoffeeWithMilkAndSugarAndWhip... 😱
```

---

### Q6: What are real-world uses of Decorator in JavaScript?
**Answer:**

**1. Express/Koa Middleware:**
```javascript
app.use(logger);        // Decorator 1
app.use(auth);          // Decorator 2
app.use(bodyParser);    // Decorator 3
app.use(router);        // Original functionality
```

**2. React Higher-Order Components:**
```javascript
const EnhancedComponent = withAuth(
  withLogging(
    withTheme(Component)
  )
);
```

**3. Function Decorators:**
```javascript
function logged(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name}`);
    return fn(...args);
  };
}

const add = logged((a, b) => a + b);
add(2, 3); // Logs: Calling add
```

**4. TypeScript/ES7 Decorators:**
```javascript
class User {
  @readonly
  name = 'John';

  @logged
  @validate
  updateEmail(email) {
    // ...
  }
}
```

---

## Facade Pattern

### Q7: When would you use the Facade pattern?
**Answer:** Use Facade when you want to provide a simple interface to a complex subsystem.

**Use Cases:**
1. Simplifying complex libraries
2. Providing higher-level API
3. Reducing dependencies on subsystems
4. Creating layers in architecture

**Example:**
```javascript
// Complex subsystem
class CPU {
  freeze() { }
  jump(position) { }
  execute() { }
}

class Memory {
  load(position, data) { }
}

class HardDrive {
  read(lba, size) { }
}

// Facade - simple interface
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    // Hides complexity of boot sequence
    this.cpu.freeze();
    const bootData = this.hardDrive.read(BOOT_SECTOR, BOOT_SIZE);
    this.memory.load(BOOT_ADDRESS, bootData);
    this.cpu.jump(BOOT_ADDRESS);
    this.cpu.execute();
  }
}

// Client - simple usage
const computer = new ComputerFacade();
computer.start(); // One simple method instead of many complex operations
```

---

## Composite Pattern

### Q8: Explain the Composite pattern with an example.
**Answer:** Composite pattern allows you to compose objects into tree structures and treat individual objects and compositions uniformly.

**Key Concept:** Both leaf and composite implement same interface.

**Example:**
```javascript
// Component interface
class FileSystemItem {
  getSize() {
    throw new Error('Must implement');
  }
}

// Leaf
class File extends FileSystemItem {
  constructor(name, size) {
    super();
    this.name = name;
    this.size = size;
  }

  getSize() {
    return this.size;
  }
}

// Composite
class Directory extends FileSystemItem {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  add(item) {
    this.children.push(item);
  }

  getSize() {
    return this.children.reduce((total, child) => {
      return total + child.getSize();
    }, 0);
  }
}

// Usage - treat leaf and composite uniformly
const root = new Directory('root');
const docs = new Directory('documents');

docs.add(new File('resume.pdf', 100));
docs.add(new File('cover.pdf', 50));

root.add(docs);
root.add(new File('readme.txt', 10));

console.log(root.getSize()); // 160 - works for both files and directories!
```

**Use Cases:**
- File systems
- UI component trees (React, Vue)
- Organization hierarchies
- Menu systems

---

### Q9: What is the key principle of the Composite pattern?
**Answer:** **Treat individual objects and compositions uniformly.**

**Key Points:**
1. Same interface for leaf and composite
2. Client doesn't distinguish between simple and complex elements
3. Recursive composition
4. Simplifies client code

**Example:**
```javascript
// Client code doesn't care if item is file or directory
function printSize(item) {
  console.log(item.getSize()); // Works for both!
}

printSize(new File('test.txt', 100));     // Leaf
printSize(new Directory('folder'));        // Composite
```

---

## Bridge Pattern

### Q10: What problem does the Bridge pattern solve?
**Answer:** Bridge pattern decouples an abstraction from its implementation so they can vary independently.

**Problem:** Avoid explosion of subclasses when you have two dimensions of variation.

**Without Bridge:**
```javascript
// Class explosion!
class WindowsCircle { }
class WindowsRectangle { }
class LinuxCircle { }
class LinuxRectangle { }
class MacCircle { }
class MacRectangle { }
// n shapes × m platforms = n*m classes!
```

**With Bridge:**
```javascript
// Implementation
class WindowsRenderer {
  renderCircle() { }
}

class LinuxRenderer {
  renderCircle() { }
}

// Abstraction
class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  draw() {
    this.renderer.renderCircle();
  }
}

// Usage - independent variation
const windowsCircle = new Circle(new WindowsRenderer());
const linuxCircle = new Circle(new LinuxRenderer());
// n shapes + m platforms = n+m classes!
```

---

## Flyweight Pattern

### Q11: When would you use the Flyweight pattern?
**Answer:** Use Flyweight when you need to support large numbers of fine-grained objects efficiently by sharing common state.

**Key Concept:**
- **Intrinsic state**: Shared among objects (stored in flyweight)
- **Extrinsic state**: Unique to each object (passed to flyweight)

**Example:**
```javascript
// Flyweight - shared state
class TreeType {
  constructor(name, color, texture) {
    this.name = name;       // Intrinsic (shared)
    this.color = color;     // Intrinsic (shared)
    this.texture = texture; // Intrinsic (shared)
  }

  draw(x, y) {
    console.log(`Draw ${this.name} at (${x}, ${y})`);
  }
}

// Flyweight Factory
class TreeFactory {
  constructor() {
    this.treeTypes = new Map();
  }

  getTreeType(name, color, texture) {
    const key = `${name}_${color}_${texture}`;
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }
    return this.treeTypes.get(key);
  }
}

// Context - unique state
class Tree {
  constructor(x, y, treeType) {
    this.x = x;        // Extrinsic (unique)
    this.y = y;        // Extrinsic (unique)
    this.treeType = treeType; // Intrinsic (shared)
  }
}

// Usage - 1000 trees, only 3 TreeType objects!
const factory = new TreeFactory();
const trees = [];

for (let i = 0; i < 1000; i++) {
  const type = factory.getTreeType('Oak', 'Green', 'Rough');
  trees.push(new Tree(Math.random() * 100, Math.random() * 100, type));
}

console.log(`Total trees: ${trees.length}`);
console.log(`Unique types: ${factory.treeTypes.size}`); // Only 3!
```

**Use Cases:**
- Game engines (particles, tiles, characters)
- Text editors (character rendering)
- UI systems (icons, widgets)

---

[← Back to Interview Questions](./README.md)
