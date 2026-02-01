# Singleton Pattern

## Intent
Ensure a class has only one instance and provide a global point of access to it. The Singleton pattern restricts the instantiation of a class to a single object.

## Problem
You need to ensure that a class has exactly one instance, and that instance needs to be accessible from a well-known access point. Multiple instances could cause issues with shared resources like configuration, database connections, or logging.

## Structure
```
Singleton
├── instance (private static)
├── constructor (private)
└── getInstance() (public static)
```

## Implementation

### Basic Singleton
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.data = [];
  }

  addData(item) {
    this.data.push(item);
  }

  getData() {
    return this.data;
  }
}

// Usage
const instance1 = new Singleton();
const instance2 = new Singleton();

instance1.addData('First');
instance2.addData('Second');

console.log(instance1.getData()); // ['First', 'Second']
console.log(instance1 === instance2); // true
```

### Modern ES6 Singleton with Private Constructor
```javascript
class Singleton {
  static #instance;

  constructor() {
    if (Singleton.#instance) {
      throw new Error('Use Singleton.getInstance() instead of new');
    }
    this.timestamp = Date.now();
  }

  static getInstance() {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }

  getTimestamp() {
    return this.timestamp;
  }
}

// Usage
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true
// new Singleton(); // Throws error
```

### Singleton with Lazy Initialization
```javascript
class DatabaseConnection {
  static #instance = null;
  #connected = false;

  constructor() {
    this.connectionString = 'mongodb://localhost:27017';
  }

  static getInstance() {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection();
    }
    return DatabaseConnection.#instance;
  }

  async connect() {
    if (!this.#connected) {
      // Simulate connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.#connected = true;
      console.log('Connected to database');
    }
    return this;
  }

  query(sql) {
    if (!this.#connected) {
      throw new Error('Not connected to database');
    }
    return `Executing: ${sql}`;
  }
}

// Usage
async function main() {
  const db1 = DatabaseConnection.getInstance();
  const db2 = DatabaseConnection.getInstance();

  console.log(db1 === db2); // true

  await db1.connect();
  console.log(db2.query('SELECT * FROM users')); // Works!
}
```

### Module Singleton (ES6 Modules)
```javascript
// config.js
class Config {
  constructor() {
    this.settings = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retries: 3
    };
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    this.settings[key] = value;
  }

  getAll() {
    return { ...this.settings };
  }
}

// Export a single instance
export default new Config();

// app.js
import config from './config.js';

config.set('apiUrl', 'https://api.production.com');
console.log(config.get('apiUrl'));

// Another file
import config from './config.js';
console.log(config.get('apiUrl')); // Same instance!
```

### Singleton with Freezing
```javascript
class AppState {
  static #instance;

  constructor() {
    if (AppState.#instance) {
      return AppState.#instance;
    }

    this.state = {
      user: null,
      theme: 'light',
      language: 'en'
    };

    AppState.#instance = this;
    Object.freeze(this); // Prevent modification of the instance
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
  }

  getState() {
    return { ...this.state };
  }
}

// Usage
const state1 = new AppState();
const state2 = new AppState();

state1.setState({ user: 'John' });
console.log(state2.getState().user); // 'John'
console.log(state1 === state2); // true
```

## Use Cases

### 1. Configuration Manager
```javascript
class ConfigManager {
  static #instance;
  #config = new Map();

  static getInstance() {
    if (!ConfigManager.#instance) {
      ConfigManager.#instance = new ConfigManager();
    }
    return ConfigManager.#instance;
  }

  load(configObject) {
    Object.entries(configObject).forEach(([key, value]) => {
      this.#config.set(key, value);
    });
  }

  get(key, defaultValue = null) {
    return this.#config.get(key) ?? defaultValue;
  }
}

// Usage across the application
const config = ConfigManager.getInstance();
config.load({ dbHost: 'localhost', dbPort: 5432 });

// In another module
const config2 = ConfigManager.getInstance();
console.log(config2.get('dbHost')); // 'localhost'
```

### 2. Logger
```javascript
class Logger {
  static #instance;
  #logs = [];

  static getInstance() {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }
    return Logger.#instance;
  }

  log(message, level = 'INFO') {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message
    };
    this.#logs.push(entry);
    console.log(`[${entry.level}] ${entry.timestamp}: ${entry.message}`);
  }

  error(message) {
    this.log(message, 'ERROR');
  }

  warn(message) {
    this.log(message, 'WARN');
  }

  getLogs() {
    return [...this.#logs];
  }
}

// Usage
const logger = Logger.getInstance();
logger.log('Application started');
logger.error('Something went wrong');

// In another module
const logger2 = Logger.getInstance();
console.log(logger2.getLogs().length); // 2
```

### 3. Cache Manager
```javascript
class CacheManager {
  static #instance;
  #cache = new Map();
  #ttl = 60000; // 1 minute default

  static getInstance() {
    if (!CacheManager.#instance) {
      CacheManager.#instance = new CacheManager();
    }
    return CacheManager.#instance;
  }

  set(key, value, ttl = this.#ttl) {
    const expiry = Date.now() + ttl;
    this.#cache.set(key, { value, expiry });
  }

  get(key) {
    const item = this.#cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.#cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.#cache.clear();
  }
}

// Usage
const cache = CacheManager.getInstance();
cache.set('user:1', { name: 'John', age: 30 }, 5000);

setTimeout(() => {
  console.log(cache.get('user:1')); // { name: 'John', age: 30 }
}, 2000);

setTimeout(() => {
  console.log(cache.get('user:1')); // null (expired)
}, 6000);
```

## Pros

1. **Controlled Access**: Strict control over the single instance
2. **Global Access Point**: Easy access from anywhere in the application
3. **Lazy Initialization**: Instance created only when needed
4. **Memory Efficiency**: Only one instance in memory
5. **State Consistency**: Shared state across the application

## Cons

1. **Global State**: Can make testing difficult and create hidden dependencies
2. **Tight Coupling**: Code becomes tightly coupled to the Singleton
3. **Violates Single Responsibility**: Class controls both its logic and instance creation
4. **Difficult to Test**: Hard to mock or replace in unit tests
5. **Concurrency Issues**: Can cause problems in multi-threaded environments
6. **Hidden Dependencies**: Makes dependencies less obvious in code

## When to Use

- ✅ When exactly one instance of a class is needed
- ✅ Configuration or settings management
- ✅ Logging systems
- ✅ Database connection pools
- ✅ Cache management
- ✅ Thread pools or resource managers

## When to Avoid

- ❌ When you need multiple instances with similar behavior
- ❌ In unit testing scenarios (prefer dependency injection)
- ❌ When the singleton grows to handle too many responsibilities
- ❌ In highly concurrent applications without proper synchronization

## Alternatives

1. **Dependency Injection**: Pass instances through constructors/parameters
2. **Module Pattern**: Use ES6 modules with exported instances
3. **Factory Pattern**: Control instance creation without enforcing singleton
4. **Service Locator**: Register and retrieve services centrally

## Related Patterns

- **Factory Method**: Can use Singleton to ensure only one factory exists
- **Abstract Factory**: Often implemented as Singletons
- **Facade**: Often implemented as a Singleton
- **Prototype**: An alternative to Singleton for managing unique instances

## Best Practices

1. Make constructor private or protect against multiple instantiation
2. Consider using ES6 modules for simple singletons
3. Be cautious with global state and hidden dependencies
4. Ensure thread-safety in concurrent environments
5. Consider lazy initialization for resource-heavy singletons
6. Document clearly that the class is a Singleton
7. Prefer dependency injection for better testability

## Modern JavaScript Considerations

In modern JavaScript applications:
- ES6 modules naturally provide singleton-like behavior
- Consider using dependency injection containers (like InversifyJS)
- React Context API can serve as an alternative for state management
- Service Workers are inherently singletons
- Be mindful of module bundlers that might create multiple instances

---

[← Back to Creational Patterns](../README.md#creational-patterns)
