# Prototype Pattern

## Intent
Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype. The Prototype pattern allows you to clone objects without coupling to their specific classes.

## Problem
You need to create copies of objects without depending on their concrete classes. Creating objects from scratch might be expensive or complex, and you want to avoid repeating initialization logic.

## Structure
```
Prototype Interface
└── clone()

ConcretePrototype
└── clone() → returns copy of itself

Client
└── uses prototype.clone()
```

## Implementation

### Basic Prototype with Object.create()
```javascript
const carPrototype = {
  init(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    return this;
  },

  drive() {
    console.log(`Driving ${this.year} ${this.make} ${this.model}`);
  },

  clone() {
    return Object.create(this);
  }
};

// Usage
const car1 = Object.create(carPrototype).init('Tesla', 'Model S', 2024);
const car2 = car1.clone().init('Tesla', 'Model 3', 2024);

car1.drive(); // Driving 2024 Tesla Model S
car2.drive(); // Driving 2024 Tesla Model 3
```

### Class-based Prototype
```javascript
class Shape {
  constructor(color) {
    this.color = color;
  }

  clone() {
    return Object.create(
      Object.getPrototypeOf(this),
      Object.getOwnPropertyDescriptors(this)
    );
  }

  draw() {
    throw new Error('draw() must be implemented');
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  draw() {
    return `Drawing ${this.color} circle with radius ${this.radius}`;
  }

  clone() {
    return new Circle(this.color, this.radius);
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  draw() {
    return `Drawing ${this.color} rectangle ${this.width}x${this.height}`;
  }

  clone() {
    return new Rectangle(this.color, this.width, this.height);
  }
}

// Usage
const redCircle = new Circle('red', 10);
const blueCircle = redCircle.clone();
blueCircle.color = 'blue';
blueCircle.radius = 15;

console.log(redCircle.draw());  // Drawing red circle with radius 10
console.log(blueCircle.draw()); // Drawing blue circle with radius 15
```

### Deep Clone Implementation
```javascript
class Person {
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address; // Object reference
  }

  // Shallow clone - references are shared
  shallowClone() {
    return Object.create(
      Object.getPrototypeOf(this),
      Object.getOwnPropertyDescriptors(this)
    );
  }

  // Deep clone - recursively copies nested objects
  deepClone() {
    const cloned = new Person(
      this.name,
      this.age,
      { ...this.address } // Clone the address object
    );
    return cloned;
  }

  // Using JSON (works for plain objects only)
  jsonClone() {
    return JSON.parse(JSON.stringify(this));
  }
}

// Usage
const person1 = new Person('John', 30, { city: 'New York', zip: '10001' });

// Shallow clone - address is shared
const person2 = person1.shallowClone();
person2.name = 'Jane';
person2.address.city = 'Los Angeles';

console.log(person1.address.city); // Los Angeles (shared reference!)
console.log(person2.address.city); // Los Angeles

// Deep clone - address is copied
const person3 = person1.deepClone();
person3.name = 'Bob';
person3.address.city = 'Chicago';

console.log(person1.address.city); // Los Angeles
console.log(person3.address.city); // Chicago
```

### Prototype Registry
```javascript
class ComponentPrototypeRegistry {
  constructor() {
    this.prototypes = new Map();
  }

  register(name, prototype) {
    this.prototypes.set(name, prototype);
  }

  unregister(name) {
    this.prototypes.delete(name);
  }

  create(name) {
    const prototype = this.prototypes.get(name);
    if (!prototype) {
      throw new Error(`Prototype ${name} not found`);
    }
    return prototype.clone();
  }

  has(name) {
    return this.prototypes.has(name);
  }
}

// Component classes
class Button {
  constructor(label, style) {
    this.label = label;
    this.style = style || { bg: 'blue', color: 'white' };
  }

  clone() {
    return new Button(this.label, { ...this.style });
  }

  render() {
    return `<button style="background: ${this.style.bg}; color: ${this.style.color}">${this.label}</button>`;
  }
}

class Input {
  constructor(type, placeholder) {
    this.type = type;
    this.placeholder = placeholder;
  }

  clone() {
    return new Input(this.type, this.placeholder);
  }

  render() {
    return `<input type="${this.type}" placeholder="${this.placeholder}" />`;
  }
}

// Usage
const registry = new ComponentPrototypeRegistry();

// Register prototypes
registry.register('primary-button', new Button('Click Me', { bg: 'blue', color: 'white' }));
registry.register('danger-button', new Button('Delete', { bg: 'red', color: 'white' }));
registry.register('email-input', new Input('email', 'Enter email'));

// Create instances from prototypes
const btn1 = registry.create('primary-button');
btn1.label = 'Submit';

const btn2 = registry.create('danger-button');
btn2.label = 'Cancel';

const input1 = registry.create('email-input');

console.log(btn1.render());   // <button style="background: blue; color: white">Submit</button>
console.log(btn2.render());   // <button style="background: red; color: white">Cancel</button>
console.log(input1.render()); // <input type="email" placeholder="Enter email" />
```

### Document Template System
```javascript
class Document {
  constructor(title, content, metadata) {
    this.title = title;
    this.content = content;
    this.metadata = metadata || {};
    this.createdAt = new Date();
  }

  clone() {
    return new Document(
      this.title,
      this.content,
      { ...this.metadata }
    );
  }

  render() {
    return `
Title: ${this.title}
Created: ${this.createdAt.toISOString()}
Metadata: ${JSON.stringify(this.metadata)}
---
${this.content}
    `.trim();
  }
}

class DocumentTemplateManager {
  constructor() {
    this.templates = new Map();
  }

  addTemplate(name, document) {
    this.templates.set(name, document);
  }

  createFromTemplate(name, customizations = {}) {
    const template = this.templates.get(name);
    if (!template) {
      throw new Error(`Template ${name} not found`);
    }

    const doc = template.clone();

    // Apply customizations
    if (customizations.title) doc.title = customizations.title;
    if (customizations.content) doc.content = customizations.content;
    if (customizations.metadata) {
      doc.metadata = { ...doc.metadata, ...customizations.metadata };
    }

    return doc;
  }
}

// Usage
const manager = new DocumentTemplateManager();

// Create templates
const reportTemplate = new Document(
  'Monthly Report',
  'Summary of activities for the month...',
  { type: 'report', department: 'Sales' }
);

const invoiceTemplate = new Document(
  'Invoice',
  'Invoice for services rendered...',
  { type: 'invoice', currency: 'USD' }
);

manager.addTemplate('report', reportTemplate);
manager.addTemplate('invoice', invoiceTemplate);

// Create documents from templates
const januaryReport = manager.createFromTemplate('report', {
  title: 'January 2024 Report',
  content: 'January sales exceeded expectations...',
  metadata: { month: 'January', year: 2024 }
});

const customerInvoice = manager.createFromTemplate('invoice', {
  title: 'Invoice #12345',
  content: 'Services: Web Development - $5000',
  metadata: { customer: 'Acme Corp', invoiceNo: 12345 }
});

console.log(januaryReport.render());
console.log('\n---\n');
console.log(customerInvoice.render());
```

### Game Entity Cloning
```javascript
class GameObject {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.health = 100;
    this.speed = 1;
  }

  clone() {
    const cloned = new this.constructor(this.x, this.y, this.sprite);
    cloned.health = this.health;
    cloned.speed = this.speed;
    return cloned;
  }

  move(dx, dy) {
    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }
}

class Enemy extends GameObject {
  constructor(x, y, sprite, difficulty) {
    super(x, y, sprite);
    this.difficulty = difficulty;
    this.damage = difficulty * 10;
    this.health = difficulty * 50;
  }

  clone() {
    const cloned = super.clone();
    cloned.difficulty = this.difficulty;
    cloned.damage = this.damage;
    return cloned;
  }

  attack() {
    return `Enemy deals ${this.damage} damage`;
  }
}

class Boss extends Enemy {
  constructor(x, y, sprite, difficulty, special) {
    super(x, y, sprite, difficulty);
    this.special = special;
    this.health = difficulty * 200;
  }

  clone() {
    const cloned = super.clone();
    cloned.special = this.special;
    return cloned;
  }

  specialAttack() {
    return `Boss uses ${this.special}!`;
  }
}

// Usage
const goblinPrototype = new Enemy(0, 0, 'goblin.png', 1);
const dragonPrototype = new Boss(0, 0, 'dragon.png', 5, 'Fire Breath');

// Spawn enemies by cloning prototypes
const goblin1 = goblinPrototype.clone();
goblin1.x = 100;
goblin1.y = 200;

const goblin2 = goblinPrototype.clone();
goblin2.x = 150;
goblin2.y = 180;

const boss1 = dragonPrototype.clone();
boss1.x = 500;
boss1.y = 500;

console.log(goblin1.attack());       // Enemy deals 10 damage
console.log(goblin1.health);         // 50
console.log(boss1.specialAttack());  // Boss uses Fire Breath!
console.log(boss1.health);           // 1000
```

### Configuration Cloning
```javascript
class AppConfig {
  constructor(settings = {}) {
    this.database = settings.database || {
      host: 'localhost',
      port: 5432,
      name: 'myapp'
    };
    this.api = settings.api || {
      url: 'http://localhost:3000',
      timeout: 30000
    };
    this.features = settings.features || {
      authentication: true,
      logging: true,
      caching: false
    };
  }

  clone() {
    return new AppConfig({
      database: { ...this.database },
      api: { ...this.api },
      features: { ...this.features }
    });
  }

  merge(overrides) {
    const cloned = this.clone();
    if (overrides.database) {
      cloned.database = { ...cloned.database, ...overrides.database };
    }
    if (overrides.api) {
      cloned.api = { ...cloned.api, ...overrides.api };
    }
    if (overrides.features) {
      cloned.features = { ...cloned.features, ...overrides.features };
    }
    return cloned;
  }
}

// Usage
const baseConfig = new AppConfig();

// Development config
const devConfig = baseConfig.merge({
  database: { host: 'localhost', name: 'myapp_dev' },
  features: { logging: true, caching: false }
});

// Production config
const prodConfig = baseConfig.merge({
  database: { host: 'prod-db.example.com', name: 'myapp_prod' },
  api: { url: 'https://api.example.com' },
  features: { logging: false, caching: true }
});

console.log('Dev:', devConfig.database);
console.log('Prod:', prodConfig.database);
console.log('Base unchanged:', baseConfig.database);
```

## Use Cases

1. **Object creation is expensive** - Database records, complex calculations
2. **Many similar objects** - Game entities, UI components
3. **Template systems** - Document templates, email templates
4. **Configuration management** - Environment-specific configs
5. **Undo/Redo systems** - Saving object states
6. **Caching** - Clone cached objects instead of recreating

## Pros

1. **Performance**: Faster than creating from scratch
2. **Flexibility**: Clone and modify existing objects
3. **Reduced Initialization**: Avoid complex setup logic
4. **Independence**: Clones are independent of originals
5. **Runtime Configuration**: Choose prototypes at runtime
6. **Alternative to Subclassing**: Use composition over inheritance

## Cons

1. **Deep vs Shallow**: Complex objects need deep cloning
2. **Circular References**: Can cause infinite loops
3. **Cloning Complexity**: Hard to clone objects with private fields
4. **Hidden Dependencies**: Cloned objects may share dependencies
5. **Performance Cost**: Deep cloning can be expensive

## When to Use

- ✅ Object creation is resource-intensive
- ✅ Need many similar objects with slight variations
- ✅ Want to avoid subclass explosion
- ✅ Objects have many shared properties
- ✅ Runtime prototype selection needed
- ✅ Template or configuration systems

## When to Avoid

- ❌ Objects are simple and cheap to create
- ❌ Few variations needed
- ❌ Cloning logic is complex or error-prone
- ❌ Objects have circular references
- ❌ Immutability is preferred

## Alternatives

1. **Factory Method**: For controlled object creation
2. **Builder**: For step-by-step construction
3. **Object Pool**: For reusing objects
4. **Flyweight**: For sharing common state
5. **Memento**: For saving/restoring state

## Related Patterns

- **Abstract Factory**: Can store prototypes
- **Composite**: Prototypes can clone composite structures
- **Decorator**: Prototypes can include decorators
- **Memento**: Uses cloning to save state

## Best Practices

1. Implement both shallow and deep clone when needed
2. Be careful with circular references
3. Consider immutability instead of cloning
4. Use prototype registries for management
5. Document whether clone is deep or shallow
6. Handle Date, RegExp, and other special objects correctly
7. Consider using libraries like lodash.cloneDeep for complex objects
8. Test clone independence thoroughly

## Modern JavaScript Considerations

- Use Object.create() for prototype chains
- Use spread operator {...obj} for shallow clones
- Use JSON.parse/stringify for simple deep clones (limitations apply)
- Use structuredClone() (modern browsers) for deep cloning
- Private fields (#) cannot be cloned externally
- Use WeakMap for cloning with circular references
- Consider using Proxy for lazy cloning

## Cloning Utilities

```javascript
// Utility for deep cloning
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrClone = [];
    hash.set(obj, arrClone);
    obj.forEach((item, index) => {
      arrClone[index] = deepClone(item, hash);
    });
    return arrClone;
  }

  // Handle Object
  const cloned = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, cloned);

  Object.keys(obj).forEach(key => {
    cloned[key] = deepClone(obj[key], hash);
  });

  return cloned;
}
```

---

[← Back to Creational Patterns](../README.md#creational-patterns)
