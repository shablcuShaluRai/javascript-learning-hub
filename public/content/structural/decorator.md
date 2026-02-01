# Decorator Pattern

## Intent
Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

## Problem
You want to add responsibilities to individual objects dynamically and transparently, without affecting other objects. Subclassing creates too many classes or isn't flexible enough.

## Structure
```
Component
├── ConcreteComponent
└── Decorator (wraps Component)
    └── ConcreteDecorator
```

## Implementation

### Basic Decorator
```javascript
// Component
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return 'Simple coffee';
  }
}

// Decorator
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }

  description() {
    return this.coffee.description();
  }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 0.5;
  }

  description() {
    return this.coffee.description() + ', sugar';
  }
}

class WhipDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1.5;
  }

  description() {
    return this.coffee.description() + ', whip cream';
  }
}

// Usage
let coffee = new Coffee();
console.log(`${coffee.description()} = $${coffee.cost()}`);

coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhipDecorator(coffee);

console.log(`${coffee.description()} = $${coffee.cost()}`);
// Simple coffee, milk, sugar, whip cream = $8
```

### Function Decorators
```javascript
// Logging decorator
function logged(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with args:`, args);
    const result = fn.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
}

// Timing decorator
function timed(fn) {
  return function(...args) {
    const start = Date.now();
    const result = fn.apply(this, args);
    const end = Date.now();
    console.log(`${fn.name} took ${end - start}ms`);
    return result;
  };
}

// Memoization decorator
function memoized(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Original function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Decorate it
const decoratedFib = memoized(timed(logged(fibonacci)));

console.log(decoratedFib(10));
```

### Middleware Pattern (Express-style)
```javascript
class Request {
  constructor(url) {
    this.url = url;
    this.data = {};
  }
}

class Response {
  constructor() {
    this.statusCode = 200;
    this.body = '';
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  send(body) {
    this.body = body;
    return this;
  }
}

class Server {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  async handle(req, res) {
    let index = 0;

    const next = async () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        await middleware(req, res, next);
      }
    };

    await next();
    return res;
  }
}

// Middleware decorators
const logger = async (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.url}`);
  await next();
};

const auth = async (req, res, next) => {
  req.data.user = { id: 1, name: 'John' };
  console.log('User authenticated');
  await next();
};

const jsonParser = async (req, res, next) => {
  req.data.parsed = true;
  console.log('JSON parsed');
  await next();
};

const errorHandler = async (req, res, next) => {
  try {
    await next();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Usage
const server = new Server();
server
  .use(logger)
  .use(auth)
  .use(jsonParser)
  .use(async (req, res) => {
    res.send(`Hello ${req.data.user.name}`);
  });

const req = new Request('/api/users');
const res = new Response();

server.handle(req, res).then(response => {
  console.log(`Status: ${response.statusCode}, Body: ${response.body}`);
});
```

### Text Formatting Decorators
```javascript
class TextComponent {
  constructor(text) {
    this.text = text;
  }

  render() {
    return this.text;
  }
}

class TextDecorator {
  constructor(component) {
    this.component = component;
  }

  render() {
    return this.component.render();
  }
}

class BoldDecorator extends TextDecorator {
  render() {
    return `<strong>${this.component.render()}</strong>`;
  }
}

class ItalicDecorator extends TextDecorator {
  render() {
    return `<em>${this.component.render()}</em>`;
  }
}

class UnderlineDecorator extends TextDecorator {
  render() {
    return `<u>${this.component.render()}</u>`;
  }
}

class ColorDecorator extends TextDecorator {
  constructor(component, color) {
    super(component);
    this.color = color;
  }

  render() {
    return `<span style="color: ${this.color}">${this.component.render()}</span>`;
  }
}

// Usage
let text = new TextComponent('Hello World');
text = new BoldDecorator(text);
text = new ItalicDecorator(text);
text = new ColorDecorator(text, 'red');

console.log(text.render());
// <span style="color: red"><em><strong>Hello World</strong></em></span>
```

## Pros

1. **Flexibility**: Add/remove responsibilities dynamically
2. **Single Responsibility**: Each decorator has one purpose
3. **Open/Closed**: Extend behavior without modifying existing code
4. **Composition**: Combine decorators in different ways
5. **Alternative to Subclassing**: Avoid class explosion

## Cons

1. **Complexity**: Many small objects to manage
2. **Order Dependency**: Order of decorators matters
3. **Identity**: Decorated object != original object
4. **Debugging**: Stack traces can be confusing

## When to Use

- ✅ Add responsibilities to objects dynamically
- ✅ Responsibilities can be withdrawn
- ✅ Extension by subclassing is impractical
- ✅ Need different combinations of behaviors

## When to Avoid

- ❌ Object identity is important
- ❌ Simple inheritance suffices
- ❌ Performance overhead is unacceptable

---

[← Back to Structural Patterns](../README.md#structural-patterns)
