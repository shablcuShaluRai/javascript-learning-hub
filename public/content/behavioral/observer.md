# Observer Pattern

## Intent
Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

## Problem
You need to maintain consistency between related objects without making classes tightly coupled. When one object changes, multiple other objects need to be updated.

## Structure
```
Subject
├── attach(observer)
├── detach(observer)
└── notify()

Observer
└── update()
```

## Implementation

### Basic Observer
```javascript
// Observer interface
class Observer {
  update(data) {
    throw new Error('update() must be implemented');
  }
}

// Subject
class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

// Concrete Subject
class NewsAgency extends Subject {
  constructor() {
    super();
    this.news = '';
  }

  setNews(news) {
    this.news = news;
    this.notify(news);
  }

  getNews() {
    return this.news;
  }
}

// Concrete Observers
class NewsChannel extends Observer {
  constructor(name) {
    super();
    this.name = name;
  }

  update(news) {
    console.log(`${this.name} received news: ${news}`);
  }
}

// Usage
const agency = new NewsAgency();

const cnn = new NewsChannel('CNN');
const bbc = new NewsChannel('BBC');
const fox = new NewsChannel('FOX');

agency.attach(cnn);
agency.attach(bbc);
agency.attach(fox);

agency.setNews('Breaking: Major event happened!');

agency.detach(fox);
agency.setNews('Update: More details emerging...');
```

### Event Emitter Pattern
```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events.has(event)) return this;

    const listeners = this.events.get(event);
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, onceWrapper);
    };
    return this.on(event, onceWrapper);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;

    this.events.get(event).forEach(listener => {
      listener.apply(this, args);
    });

    return true;
  }

  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
    return this;
  }
}

// Usage
const emitter = new EventEmitter();

const onUserLogin = (user) => console.log(`User logged in: ${user.name}`);
const onUserLogout = (user) => console.log(`User logged out: ${user.name}`);

emitter.on('login', onUserLogin);
emitter.on('logout', onUserLogout);
emitter.once('firstLogin', (user) => console.log(`First login: ${user.name}`));

emitter.emit('login', { name: 'John' });
emitter.emit('firstLogin', { name: 'John' });
emitter.emit('firstLogin', { name: 'Jane' }); // Won't trigger (once only)
emitter.emit('logout', { name: 'John' });
```

### Stock Market Observer
```javascript
class Stock extends Subject {
  constructor(symbol, price) {
    super();
    this.symbol = symbol;
    this.price = price;
  }

  setPrice(price) {
    console.log(`\\n${this.symbol} price changed: $${this.price} → $${price}`);
    this.price = price;
    this.notify({ symbol: this.symbol, price: this.price });
  }

  getPrice() {
    return this.price;
  }
}

class Investor extends Observer {
  constructor(name) {
    super();
    this.name = name;
    this.portfolio = [];
  }

  update(stock) {
    console.log(`${this.name} notified: ${stock.symbol} is now $${stock.price}`);

    // Auto-buy/sell logic
    if (stock.price < 100) {
      console.log(`  → ${this.name} buying ${stock.symbol}`);
    } else if (stock.price > 200) {
      console.log(`  → ${this.name} selling ${stock.symbol}`);
    }
  }
}

// Usage
const apple = new Stock('AAPL', 150);
const investor1 = new Investor('Warren');
const investor2 = new Investor('Peter');

apple.attach(investor1);
apple.attach(investor2);

apple.setPrice(95);   // Both investors buy
apple.setPrice(205);  // Both investors sell
```

### Reactive State Management
```javascript
class Store extends EventEmitter {
  constructor(initialState = {}) {
    super();
    this.state = initialState;
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    const oldState = { ...this.state };
    this.state = { ...this.state, ...updates };

    // Emit specific property changes
    Object.keys(updates).forEach(key => {
      if (oldState[key] !== this.state[key]) {
        this.emit(`change:${key}`, this.state[key], oldState[key]);
      }
    });

    // Emit general state change
    this.emit('change', this.state, oldState);
  }

  subscribe(listener) {
    return this.on('change', listener);
  }

  subscribeToProperty(property, listener) {
    return this.on(`change:${property}`, listener);
  }
}

// Usage
const store = new Store({ count: 0, user: null });

// Subscribe to all changes
store.subscribe((newState, oldState) => {
  console.log('State changed:', newState);
});

// Subscribe to specific property
store.subscribeToProperty('count', (newValue, oldValue) => {
  console.log(`Count changed: ${oldValue} → ${newValue}`);
});

store.subscribeToProperty('user', (newValue) => {
  console.log(`User updated:`, newValue);
});

store.setState({ count: 1 });
store.setState({ count: 2 });
store.setState({ user: { name: 'John' } });
```

## Pros

1. **Open/Closed**: Add new observers without modifying subject
2. **Loose Coupling**: Subject and observers are loosely coupled
3. **Dynamic Relationships**: Can add/remove observers at runtime
4. **Broadcast Communication**: One-to-many updates

## Cons

1. **Unexpected Updates**: Observers notified in random order
2. **Memory Leaks**: Forgotten observers can cause leaks
3. **Performance**: Many observers can slow down notifications
4. **Complexity**: Hard to track notification chains

## When to Use

- ✅ Change in one object requires changing others
- ✅ Object should notify others without knowing who they are
- ✅ Event handling systems
- ✅ Model-View architectures
- ✅ Reactive programming

## When to Avoid

- ❌ Few observers or simple notifications
- ❌ Performance is critical
- ❌ Notification order matters

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
