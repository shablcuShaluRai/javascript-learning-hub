# Proxy Pattern

## Intent
Provide a surrogate or placeholder for another object to control access to it. The Proxy pattern creates a representative object that controls access to another object.

## Problem
You need to control access to an object, add functionality when accessing an object, or defer the cost of creating/initializing an object until it's actually needed.

## Structure
```
Client → Proxy → RealSubject
         (both implement Subject interface)
```

## Implementation

### Virtual Proxy (Lazy Loading)
```javascript
// Subject interface
class Image {
  display() {
    throw new Error('display() must be implemented');
  }
}

// Real Subject
class RealImage extends Image {
  constructor(filename) {
    super();
    this.filename = filename;
    this.loadFromDisk();
  }

  loadFromDisk() {
    console.log(`Loading image from disk: ${this.filename}`);
    // Simulate expensive operation
  }

  display() {
    console.log(`Displaying image: ${this.filename}`);
  }
}

// Proxy
class ImageProxy extends Image {
  constructor(filename) {
    super();
    this.filename = filename;
    this.realImage = null;
  }

  display() {
    // Lazy load the real image only when needed
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Usage
const image1 = new ImageProxy('photo1.jpg');
const image2 = new ImageProxy('photo2.jpg');

console.log('Images created but not loaded yet\n');

image1.display(); // Loads and displays
image1.display(); // Just displays (already loaded)

image2.display(); // Loads and displays
```

### Protection Proxy (Access Control)
```javascript
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    return `Deposited ${amount}. New balance: ${this.balance}`;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      return 'Insufficient funds';
    }
    this.balance -= amount;
    return `Withdrew ${amount}. New balance: ${this.balance}`;
  }

  getBalance() {
    return this.balance;
  }
}

class BankAccountProxy {
  constructor(account, userRole) {
    this.account = account;
    this.userRole = userRole;
  }

  deposit(amount) {
    if (!this.hasPermission('deposit')) {
      return 'Access denied: You cannot deposit';
    }
    return this.account.deposit(amount);
  }

  withdraw(amount) {
    if (!this.hasPermission('withdraw')) {
      return 'Access denied: You cannot withdraw';
    }
    return this.account.withdraw(amount);
  }

  getBalance() {
    if (!this.hasPermission('view')) {
      return 'Access denied: You cannot view balance';
    }
    return this.account.getBalance();
  }

  hasPermission(operation) {
    const permissions = {
      admin: ['deposit', 'withdraw', 'view'],
      user: ['deposit', 'view'],
      guest: ['view']
    };

    return permissions[this.userRole]?.includes(operation) || false;
  }
}

// Usage
const account = new BankAccount(1000);

const adminAccess = new BankAccountProxy(account, 'admin');
console.log(adminAccess.deposit(500));   // Success
console.log(adminAccess.withdraw(200));  // Success

const userAccess = new BankAccountProxy(account, 'user');
console.log(userAccess.deposit(100));    // Success
console.log(userAccess.withdraw(50));    // Access denied

const guestAccess = new BankAccountProxy(account, 'guest');
console.log(guestAccess.getBalance());   // Success
console.log(guestAccess.deposit(100));   // Access denied
```

### Caching Proxy
```javascript
class ExpensiveService {
  query(sql) {
    console.log(`Executing expensive query: ${sql}`);
    // Simulate database query
    return {
      data: [`Result for: ${sql}`],
      timestamp: Date.now()
    };
  }
}

class CachingProxy {
  constructor(service) {
    this.service = service;
    this.cache = new Map();
    this.cacheTimeout = 5000; // 5 seconds
  }

  query(sql) {
    const cached = this.cache.get(sql);

    if (cached && (Date.now() - cached.timestamp < this.cacheTimeout)) {
      console.log(`Returning cached result for: ${sql}`);
      return cached.data;
    }

    console.log('Cache miss or expired');
    const result = this.service.query(sql);
    this.cache.set(sql, { data: result, timestamp: Date.now() });
    return result;
  }

  clearCache() {
    this.cache.clear();
    console.log('Cache cleared');
  }
}

// Usage
const service = new ExpensiveService();
const proxy = new CachingProxy(service);

console.log(proxy.query('SELECT * FROM users')); // Cache miss
console.log(proxy.query('SELECT * FROM users')); // Cache hit
console.log(proxy.query('SELECT * FROM posts')); // Cache miss
console.log(proxy.query('SELECT * FROM users')); // Cache hit
```

### Logging Proxy
```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }
}

class LoggingProxy {
  constructor(target) {
    this.target = target;
    this.logs = [];
  }

  add(a, b) {
    return this.log('add', [a, b], () => this.target.add(a, b));
  }

  subtract(a, b) {
    return this.log('subtract', [a, b], () => this.target.subtract(a, b));
  }

  multiply(a, b) {
    return this.log('multiply', [a, b], () => this.target.multiply(a, b));
  }

  divide(a, b) {
    return this.log('divide', [a, b], () => this.target.divide(a, b));
  }

  log(method, args, fn) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Calling ${method} with args: ${args}`);

    try {
      const result = fn();
      this.logs.push({ timestamp, method, args, result, success: true });
      console.log(`[${timestamp}] Result: ${result}`);
      return result;
    } catch (error) {
      this.logs.push({ timestamp, method, args, error: error.message, success: false });
      console.log(`[${timestamp}] Error: ${error.message}`);
      throw error;
    }
  }

  getLogs() {
    return this.logs;
  }
}

// Usage
const calculator = new Calculator();
const proxy = new LoggingProxy(calculator);

proxy.add(5, 3);
proxy.multiply(4, 2);
proxy.divide(10, 2);

try {
  proxy.divide(10, 0);
} catch (e) {
  // Error logged
}

console.log('\nOperation logs:', proxy.getLogs());
```

### ES6 Proxy Object
```javascript
// Using JavaScript's built-in Proxy
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

const userProxy = new Proxy(user, {
  get(target, property) {
    console.log(`Getting property: ${property}`);
    if (property === 'password') {
      throw new Error('Access denied');
    }
    return target[property];
  },

  set(target, property, value) {
    console.log(`Setting ${property} = ${value}`);

    // Validation
    if (property === 'age' && typeof value !== 'number') {
      throw new Error('Age must be a number');
    }

    if (property === 'email' && !value.includes('@')) {
      throw new Error('Invalid email format');
    }

    target[property] = value;
    return true;
  },

  deleteProperty(target, property) {
    if (property === 'name') {
      throw new Error('Cannot delete name property');
    }
    delete target[property];
    return true;
  }
});

// Usage
console.log(userProxy.name);      // Getting property: name
userProxy.age = 31;                // Setting age = 31
userProxy.email = 'new@email.com'; // Setting email = new@email.com

try {
  userProxy.age = '25';            // Error: Age must be a number
} catch (e) {
  console.error(e.message);
}

try {
  console.log(userProxy.password); // Error: Access denied
} catch (e) {
  console.error(e.message);
}
```

### Remote Proxy (API Wrapper)
```javascript
class RemoteService {
  async fetchData(endpoint) {
    // Simulate API call
    console.log(`API call to: ${endpoint}`);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: `Data from ${endpoint}`, status: 200 });
      }, 1000);
    });
  }
}

class RemoteProxy {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.service = new RemoteService();
    this.retries = 3;
  }

  async fetchData(endpoint, attempt = 1) {
    try {
      const fullURL = `${this.baseURL}${endpoint}`;
      console.log(`Attempt ${attempt}: Fetching from ${fullURL}`);

      const result = await this.service.fetchData(fullURL);

      if (result.status === 200) {
        return result.data;
      }

      throw new Error(`HTTP ${result.status}`);
    } catch (error) {
      if (attempt < this.retries) {
        console.log(`Retrying... (${attempt}/${this.retries})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.fetchData(endpoint, attempt + 1);
      }

      throw new Error(`Failed after ${this.retries} attempts: ${error.message}`);
    }
  }
}

// Usage
async function main() {
  const api = new RemoteProxy('https://api.example.com');

  try {
    const data = await api.fetchData('/users');
    console.log('Data received:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

## Pros

1. **Control**: Controls access to real object
2. **Lazy Initialization**: Defers expensive operations
3. **Security**: Adds protection layer
4. **Logging/Monitoring**: Transparent logging
5. **Caching**: Improves performance
6. **Open/Closed**: Add functionality without modifying real object

## Cons

1. **Complexity**: Adds extra layer
2. **Performance**: May introduce latency
3. **Indirection**: Makes code less straightforward

## When to Use

- ✅ Lazy initialization (virtual proxy)
- ✅ Access control (protection proxy)
- ✅ Local representative for remote object (remote proxy)
- ✅ Caching (caching proxy)
- ✅ Logging/monitoring
- ✅ Reference counting

## When to Avoid

- ❌ Direct access is simpler and sufficient
- ❌ Proxy overhead is unacceptable
- ❌ No additional control/functionality needed

## Related Patterns

- **Adapter**: Changes interface; Proxy keeps same interface
- **Decorator**: Adds responsibilities; Proxy controls access
- **Facade**: Simplifies interface; Proxy represents single object

---

[← Back to Structural Patterns](../README.md#structural-patterns)
