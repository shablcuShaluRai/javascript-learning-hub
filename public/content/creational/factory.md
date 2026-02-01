# Factory Pattern

## Intent
Define an interface for creating objects, but let subclasses decide which class to instantiate. The Factory pattern lets a class defer instantiation to subclasses or factory functions.

## Problem
You need to create objects without specifying the exact class of object that will be created. Direct object creation (using `new`) couples your code to specific classes, making it harder to extend or modify.

## Structure
```
Creator (Factory)
├── createProduct(type)
└── Product Interface
    ├── ConcreteProductA
    ├── ConcreteProductB
    └── ConcreteProductC
```

## Implementation

### Simple Factory Function
```javascript
// Product classes
class Car {
  constructor(model) {
    this.type = 'Car';
    this.model = model;
    this.wheels = 4;
  }

  drive() {
    console.log(`Driving ${this.model} car`);
  }
}

class Truck {
  constructor(model) {
    this.type = 'Truck';
    this.model = model;
    this.wheels = 6;
  }

  drive() {
    console.log(`Driving ${this.model} truck`);
  }
}

class Motorcycle {
  constructor(model) {
    this.type = 'Motorcycle';
    this.model = model;
    this.wheels = 2;
  }

  drive() {
    console.log(`Riding ${this.model} motorcycle`);
  }
}

// Factory function
function vehicleFactory(type, model) {
  switch(type) {
    case 'car':
      return new Car(model);
    case 'truck':
      return new Truck(model);
    case 'motorcycle':
      return new Motorcycle(model);
    default:
      throw new Error(`Unknown vehicle type: ${type}`);
  }
}

// Usage
const car = vehicleFactory('car', 'Tesla Model 3');
const truck = vehicleFactory('truck', 'Ford F-150');
const bike = vehicleFactory('motorcycle', 'Harley Davidson');

car.drive();    // Driving Tesla Model 3 car
truck.drive();  // Driving Ford F-150 truck
bike.drive();   // Riding Harley Davidson motorcycle
```

### Factory Class
```javascript
class Button {
  constructor(label) {
    this.label = label;
  }
  render() {
    throw new Error('render() must be implemented');
  }
}

class WindowsButton extends Button {
  render() {
    return `<button class="windows">${this.label}</button>`;
  }
}

class MacButton extends Button {
  render() {
    return `<button class="mac">${this.label}</button>`;
  }
}

class LinuxButton extends Button {
  render() {
    return `<button class="linux">${this.label}</button>`;
  }
}

// Factory class
class ButtonFactory {
  createButton(os, label) {
    switch(os.toLowerCase()) {
      case 'windows':
        return new WindowsButton(label);
      case 'mac':
        return new MacButton(label);
      case 'linux':
        return new LinuxButton(label);
      default:
        throw new Error(`Unsupported OS: ${os}`);
    }
  }
}

// Usage
const factory = new ButtonFactory();
const winButton = factory.createButton('Windows', 'Click Me');
const macButton = factory.createButton('Mac', 'Click Me');

console.log(winButton.render()); // <button class="windows">Click Me</button>
console.log(macButton.render()); // <button class="mac">Click Me</button>
```

### Factory with Object Map
```javascript
class EmailNotification {
  send(message) {
    console.log(`Sending email: ${message}`);
  }
}

class SMSNotification {
  send(message) {
    console.log(`Sending SMS: ${message}`);
  }
}

class PushNotification {
  send(message) {
    console.log(`Sending push notification: ${message}`);
  }
}

class SlackNotification {
  send(message) {
    console.log(`Sending Slack message: ${message}`);
  }
}

// Factory using object map
class NotificationFactory {
  constructor() {
    this.notifications = {
      email: EmailNotification,
      sms: SMSNotification,
      push: PushNotification,
      slack: SlackNotification
    };
  }

  create(type) {
    const NotificationClass = this.notifications[type];
    if (!NotificationClass) {
      throw new Error(`Notification type ${type} not supported`);
    }
    return new NotificationClass();
  }

  // Allow registering new notification types
  register(type, notificationClass) {
    this.notifications[type] = notificationClass;
  }
}

// Usage
const factory = new NotificationFactory();

const email = factory.create('email');
const sms = factory.create('sms');

email.send('Hello via email');
sms.send('Hello via SMS');

// Register custom notification
class DiscordNotification {
  send(message) {
    console.log(`Sending Discord message: ${message}`);
  }
}

factory.register('discord', DiscordNotification);
const discord = factory.create('discord');
discord.send('Hello via Discord');
```

### Factory with Parameters
```javascript
class DatabaseConnection {
  constructor(config) {
    this.config = config;
  }
  connect() {
    throw new Error('connect() must be implemented');
  }
}

class MySQLConnection extends DatabaseConnection {
  connect() {
    console.log(`Connecting to MySQL at ${this.config.host}:${this.config.port}`);
    return {
      type: 'mysql',
      query: (sql) => `MySQL: ${sql}`
    };
  }
}

class PostgreSQLConnection extends DatabaseConnection {
  connect() {
    console.log(`Connecting to PostgreSQL at ${this.config.host}:${this.config.port}`);
    return {
      type: 'postgresql',
      query: (sql) => `PostgreSQL: ${sql}`
    };
  }
}

class MongoDBConnection extends DatabaseConnection {
  connect() {
    console.log(`Connecting to MongoDB at ${this.config.host}:${this.config.port}`);
    return {
      type: 'mongodb',
      query: (filter) => `MongoDB: ${JSON.stringify(filter)}`
    };
  }
}

// Factory
class DatabaseFactory {
  static createConnection(type, config) {
    const defaults = {
      host: 'localhost',
      port: this.getDefaultPort(type),
      ...config
    };

    switch(type) {
      case 'mysql':
        return new MySQLConnection(defaults);
      case 'postgresql':
        return new PostgreSQLConnection(defaults);
      case 'mongodb':
        return new MongoDBConnection(defaults);
      default:
        throw new Error(`Database type ${type} not supported`);
    }
  }

  static getDefaultPort(type) {
    const ports = {
      mysql: 3306,
      postgresql: 5432,
      mongodb: 27017
    };
    return ports[type] || 0;
  }
}

// Usage
const mysqlConn = DatabaseFactory.createConnection('mysql', { host: 'db.example.com' });
const mongoConn = DatabaseFactory.createConnection('mongodb', { port: 27018 });

const db1 = mysqlConn.connect();
const db2 = mongoConn.connect();

console.log(db1.query('SELECT * FROM users'));
console.log(db2.query({ name: 'John' }));
```

### Async Factory
```javascript
class Image {
  constructor(data) {
    this.data = data;
  }

  render() {
    return `<img src="${this.data}" />`;
  }
}

class ImageFactory {
  static async createFromUrl(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const dataUrl = await this.blobToDataUrl(blob);
      return new Image(dataUrl);
    } catch (error) {
      console.error('Failed to load image:', error);
      return new Image('placeholder.png');
    }
  }

  static async createFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(new Image(e.target.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  static blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

// Usage
async function loadImages() {
  const img1 = await ImageFactory.createFromUrl('https://example.com/image.jpg');
  console.log(img1.render());

  // Assuming file input: <input type="file" id="fileInput">
  // const file = document.getElementById('fileInput').files[0];
  // const img2 = await ImageFactory.createFromFile(file);
  // console.log(img2.render());
}
```

## Use Cases

### 1. UI Component Factory
```javascript
class UIComponent {
  constructor(props) {
    this.props = props;
  }
}

class Input extends UIComponent {
  render() {
    return `<input type="${this.props.type}" placeholder="${this.props.placeholder}" />`;
  }
}

class Textarea extends UIComponent {
  render() {
    return `<textarea placeholder="${this.props.placeholder}"></textarea>`;
  }
}

class Select extends UIComponent {
  render() {
    const options = this.props.options.map(opt => `<option>${opt}</option>`).join('');
    return `<select>${options}</select>`;
  }
}

class UIFactory {
  static create(type, props) {
    const components = {
      input: Input,
      textarea: Textarea,
      select: Select
    };

    const Component = components[type];
    if (!Component) {
      throw new Error(`Unknown component type: ${type}`);
    }

    return new Component(props);
  }
}

// Usage
const emailInput = UIFactory.create('input', { type: 'email', placeholder: 'Enter email' });
const bioTextarea = UIFactory.create('textarea', { placeholder: 'Tell us about yourself' });
const countrySelect = UIFactory.create('select', { options: ['USA', 'UK', 'Canada'] });

console.log(emailInput.render());
console.log(bioTextarea.render());
console.log(countrySelect.render());
```

### 2. Payment Processor Factory
```javascript
class PaymentProcessor {
  process(amount) {
    throw new Error('process() must be implemented');
  }
}

class PayPalProcessor extends PaymentProcessor {
  process(amount) {
    return {
      gateway: 'PayPal',
      amount,
      fee: amount * 0.029 + 0.30,
      message: `Processing $${amount} via PayPal`
    };
  }
}

class StripeProcessor extends PaymentProcessor {
  process(amount) {
    return {
      gateway: 'Stripe',
      amount,
      fee: amount * 0.029 + 0.30,
      message: `Processing $${amount} via Stripe`
    };
  }
}

class CryptoProcessor extends PaymentProcessor {
  process(amount) {
    return {
      gateway: 'Cryptocurrency',
      amount,
      fee: amount * 0.01,
      message: `Processing $${amount} via Crypto`
    };
  }
}

class PaymentFactory {
  static create(method) {
    const processors = {
      paypal: PayPalProcessor,
      stripe: StripeProcessor,
      crypto: CryptoProcessor
    };

    const Processor = processors[method.toLowerCase()];
    if (!Processor) {
      throw new Error(`Payment method ${method} not supported`);
    }

    return new Processor();
  }
}

// Usage
function checkout(amount, method) {
  const processor = PaymentFactory.create(method);
  const result = processor.process(amount);
  console.log(result.message);
  console.log(`Fee: $${result.fee.toFixed(2)}`);
  return result;
}

checkout(100, 'stripe');
checkout(100, 'crypto');
```

### 3. Logger Factory
```javascript
class Logger {
  log(message) {
    throw new Error('log() must be implemented');
  }
}

class ConsoleLogger extends Logger {
  log(message) {
    console.log(`[Console] ${new Date().toISOString()}: ${message}`);
  }
}

class FileLogger extends Logger {
  constructor() {
    super();
    this.logs = [];
  }

  log(message) {
    this.logs.push(`${new Date().toISOString()}: ${message}`);
    // In real implementation, write to file
  }

  flush() {
    return this.logs.join('\n');
  }
}

class RemoteLogger extends Logger {
  async log(message) {
    // Simulate sending to remote server
    console.log(`[Remote] Sending log: ${message}`);
  }
}

class LoggerFactory {
  static create(environment) {
    switch(environment) {
      case 'development':
        return new ConsoleLogger();
      case 'production':
        return new RemoteLogger();
      case 'testing':
        return new FileLogger();
      default:
        return new ConsoleLogger();
    }
  }
}

// Usage
const env = process.env.NODE_ENV || 'development';
const logger = LoggerFactory.create(env);
logger.log('Application started');
```

## Pros

1. **Loose Coupling**: Separates object creation from usage
2. **Single Responsibility**: Centralizes object creation logic
3. **Open/Closed Principle**: Easy to add new product types
4. **Flexibility**: Easy to change which objects are created
5. **Consistency**: Ensures objects are created correctly
6. **Encapsulation**: Hides complex creation logic

## Cons

1. **Complexity**: Adds extra classes and abstraction
2. **Overhead**: May be overkill for simple object creation
3. **Maintenance**: Need to update factory when adding new types
4. **Indirection**: Makes code flow less obvious

## When to Use

- ✅ When you don't know exact types of objects beforehand
- ✅ Creating objects requires complex setup
- ✅ Multiple product types share common interface
- ✅ Need to centralize object creation logic
- ✅ Creating platform-specific objects (OS, database, etc.)
- ✅ Plugin systems or extensible architectures

## When to Avoid

- ❌ Object creation is simple and straightforward
- ❌ Only one type of object is created
- ❌ Product types rarely change
- ❌ The abstraction adds unnecessary complexity

## Alternatives

1. **Constructor Functions**: Use plain constructors for simple cases
2. **Builder Pattern**: For complex object construction
3. **Abstract Factory**: For families of related objects
4. **Prototype Pattern**: For cloning existing objects
5. **Dependency Injection**: For managing object creation externally

## Related Patterns

- **Abstract Factory**: Factory Method is often implemented within Abstract Factories
- **Template Method**: Factory Method is often called within Template Methods
- **Prototype**: Can be an alternative to Factory Method
- **Singleton**: Factories are often implemented as Singletons

## Best Practices

1. Use object maps instead of long switch statements
2. Make factories extensible (allow registering new types)
3. Return interfaces/abstract classes, not concrete implementations
4. Consider async factories for asynchronous creation
5. Use static methods for stateless factories
6. Validate input types before creating objects
7. Document what types the factory supports
8. Consider using TypeScript for better type safety

## Modern JavaScript Considerations

- Use ES6 classes for cleaner implementation
- Leverage Map/Object for dynamic type registration
- Use async/await for factories that fetch data
- Consider using Symbol for private factory registries
- Utilize ES6 modules for factory exports
- TypeScript can enforce return types and factory contracts

---

[← Back to Creational Patterns](../README.md#creational-patterns)
