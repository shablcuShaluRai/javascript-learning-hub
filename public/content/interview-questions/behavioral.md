# Behavioral Patterns Interview Questions

## Observer Pattern

### Q1: Explain the Observer pattern and give a real-world example.
**Answer:** Observer pattern defines a one-to-many dependency where when one object (subject) changes state, all its dependents (observers) are notified automatically.

**Real-World Analogy:** Newsletter subscription - when publisher publishes, all subscribers get notified.

**Example:**
```javascript
// Subject
class NewsAgency {
  constructor() {
    this.subscribers = [];
    this.news = '';
  }

  subscribe(observer) {
    this.subscribers.push(observer);
  }

  unsubscribe(observer) {
    this.subscribers = this.subscribers.filter(sub => sub !== observer);
  }

  notify() {
    this.subscribers.forEach(observer => observer.update(this.news));
  }

  setNews(news) {
    this.news = news;
    this.notify();
  }
}

// Observer
class NewsChannel {
  constructor(name) {
    this.name = name;
  }

  update(news) {
    console.log(`${this.name} received: ${news}`);
  }
}

// Usage
const agency = new NewsAgency();
const cnn = new NewsChannel('CNN');
const bbc = new NewsChannel('BBC');

agency.subscribe(cnn);
agency.subscribe(bbc);
agency.setNews('Breaking news!'); // Both channels notified
```

**Use Cases:**
- Event handling systems
- Model-View patterns (MVC, MVVM)
- Reactive programming (RxJS)
- Pub/Sub systems

---

### Q2: What are the problems with Observer pattern?
**Answer:**

**Problems:**
1. **Memory Leaks**: Forgotten observers not unsubscribed
2. **Update Order**: Observers notified in unpredictable order
3. **Performance**: Many observers = slow notifications
4. **Cascading Updates**: One update triggers another, causing chain reactions

**Solutions:**
```javascript
// 1. Auto-cleanup with WeakMap
class ObservableWithCleanup {
  constructor() {
    this.observers = new WeakMap(); // Auto garbage collected
  }
}

// 2. Batch updates
class BatchedObservable {
  constructor() {
    this.observers = [];
    this.pending = false;
  }

  notify() {
    if (!this.pending) {
      this.pending = true;
      setTimeout(() => {
        this.observers.forEach(o => o.update());
        this.pending = false;
      }, 0);
    }
  }
}

// 3. Return unsubscribe function
function subscribe(observer) {
  this.observers.push(observer);
  return () => {
    this.observers = this.observers.filter(o => o !== observer);
  };
}

const unsubscribe = subject.subscribe(observer);
// Later...
unsubscribe(); // Clean cleanup
```

---

## Strategy Pattern

### Q3: When would you use Strategy over simple if-else statements?
**Answer:**

**Use Strategy when:**
- Multiple algorithms for same task
- Want to switch algorithms at runtime
- Algorithms are complex and should be isolated
- Following Open/Closed principle

**Simple if-else:**
```javascript
function calculateShipping(weight, method) {
  if (method === 'express') {
    return weight * 10;
  } else if (method === 'standard') {
    return weight * 5;
  } else if (method === 'economy') {
    return weight * 2;
  }
  // Violates Open/Closed - must modify to add new method
}
```

**Strategy Pattern:**
```javascript
class ExpressShipping {
  calculate(weight) {
    return weight * 10;
  }
}

class StandardShipping {
  calculate(weight) {
    return weight * 5;
  }
}

class ShippingCalculator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculate(weight) {
    return this.strategy.calculate(weight);
  }
}

// Open/Closed - add new strategies without modifying existing code
class EconomyShipping {
  calculate(weight) {
    return weight * 2;
  }
}

const calculator = new ShippingCalculator(new ExpressShipping());
calculator.setStrategy(new EconomyShipping()); // Runtime change
```

---

### Q4: How does Strategy pattern follow SOLID principles?
**Answer:**

**Single Responsibility:**
- Each strategy has one responsibility (one algorithm)

**Open/Closed:**
- Open for extension (add new strategies)
- Closed for modification (don't change context)

**Liskov Substitution:**
- All strategies are interchangeable

**Dependency Inversion:**
- Context depends on strategy interface, not concrete implementations

**Example:**
```javascript
// Interface (abstraction)
class SortStrategy {
  sort(array) {
    throw new Error('Must implement');
  }
}

// Implementations
class QuickSort extends SortStrategy {
  sort(array) {
    // Quick sort implementation
  }
}

class BubbleSort extends SortStrategy {
  sort(array) {
    // Bubble sort implementation
  }
}

// Context depends on abstraction
class Sorter {
  constructor(strategy) {
    this.strategy = strategy; // Dependency Inversion
  }

  setStrategy(strategy) {
    this.strategy = strategy; // Runtime change
  }
}
```

---

## Command Pattern

### Q5: Explain Command pattern and its use in implementing undo/redo.
**Answer:** Command pattern encapsulates a request as an object, allowing you to parameterize clients with requests, queue requests, and support undoable operations.

**Undo/Redo Implementation:**
```javascript
// Command interface
class Command {
  execute() {
    throw new Error('Must implement');
  }

  undo() {
    throw new Error('Must implement');
  }
}

// Concrete commands
class AddTextCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }

  execute() {
    this.editor.addText(this.text);
  }

  undo() {
    this.editor.deleteText(this.text.length);
  }
}

class DeleteTextCommand extends Command {
  constructor(editor, length) {
    super();
    this.editor = editor;
    this.length = length;
    this.deletedText = '';
  }

  execute() {
    this.deletedText = this.editor.getText().slice(-this.length);
    this.editor.deleteText(this.length);
  }

  undo() {
    this.editor.addText(this.deletedText);
  }
}

// Invoker with undo/redo
class CommandManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  execute(command) {
    // Clear redo stack
    this.history = this.history.slice(0, this.currentIndex + 1);

    command.execute();
    this.history.push(command);
    this.currentIndex++;
  }

  undo() {
    if (this.currentIndex >= 0) {
      this.history[this.currentIndex].undo();
      this.currentIndex--;
    }
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.history[this.currentIndex].execute();
    }
  }
}

// Usage
const editor = new TextEditor();
const manager = new CommandManager();

manager.execute(new AddTextCommand(editor, 'Hello '));
manager.execute(new AddTextCommand(editor, 'World'));

manager.undo(); // Remove 'World'
manager.undo(); // Remove 'Hello '
manager.redo(); // Add 'Hello ' back
```

---

### Q6: What are real-world applications of Command pattern?
**Answer:**

**1. GUI Buttons and Menu Items:**
```javascript
class Button {
  constructor(command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

const saveButton = new Button(new SaveCommand());
const printButton = new Button(new PrintCommand());
```

**2. Transaction Systems:**
```javascript
class Transaction {
  constructor() {
    this.commands = [];
  }

  add(command) {
    this.commands.push(command);
  }

  execute() {
    this.commands.forEach(cmd => cmd.execute());
  }

  rollback() {
    this.commands.reverse().forEach(cmd => cmd.undo());
  }
}
```

**3. Job Queues:**
```javascript
class JobQueue {
  constructor() {
    this.queue = [];
  }

  addJob(command) {
    this.queue.push(command);
  }

  processAll() {
    while (this.queue.length > 0) {
      const command = this.queue.shift();
      command.execute();
    }
  }
}
```

**4. Macro Recording:**
```javascript
class MacroCommand extends Command {
  constructor(commands) {
    super();
    this.commands = commands;
  }

  execute() {
    this.commands.forEach(cmd => cmd.execute());
  }

  undo() {
    this.commands.reverse().forEach(cmd => cmd.undo());
  }
}
```

---

## State Pattern

### Q7: How does State pattern differ from Strategy pattern?
**Answer:**

**State Pattern:**
- **Purpose**: Change behavior when internal state changes
- **Transitions**: States know about each other and trigger transitions
- **Context**: Usually doesn't know about all states
- **Example**: Document workflow (draft → review → published)

**Strategy Pattern:**
- **Purpose**: Select algorithm at runtime
- **Transitions**: Strategies are independent
- **Context**: Knows about all strategies and chooses
- **Example**: Different sorting algorithms

**State Example:**
```javascript
class Document {
  constructor() {
    this.state = new DraftState();
  }

  setState(state) {
    this.state = state;
  }

  publish() {
    this.state.publish(this); // State changes itself
  }
}

class DraftState {
  publish(doc) {
    console.log('Publishing...');
    doc.setState(new PublishedState()); // Transition to new state
  }
}
```

**Strategy Example:**
```javascript
class ShoppingCart {
  constructor() {
    this.paymentStrategy = null;
  }

  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy; // Client chooses strategy
  }

  checkout() {
    this.paymentStrategy.pay();
  }
}
```

---

## Chain of Responsibility

### Q8: When would you use Chain of Responsibility?
**Answer:** Use when multiple objects may handle a request, and you want to avoid coupling sender to receiver.

**Use Cases:**
1. **Middleware in web frameworks**
2. **Event bubbling in DOM**
3. **Authorization/Authentication chains**
4. **Logging frameworks**
5. **Validation chains**

**Example:**
```javascript
class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler; // For chaining
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class AuthenticationHandler extends Handler {
  handle(request) {
    if (!request.authenticated) {
      return 'Authentication failed';
    }
    console.log('Authenticated');
    return super.handle(request);
  }
}

class AuthorizationHandler extends Handler {
  handle(request) {
    if (!request.authorized) {
      return 'Authorization failed';
    }
    console.log('Authorized');
    return super.handle(request);
  }
}

class ValidationHandler extends Handler {
  handle(request) {
    if (!request.valid) {
      return 'Validation failed';
    }
    console.log('Valid');
    return super.handle(request);
  }
}

// Setup chain
const auth = new AuthenticationHandler();
const authz = new AuthorizationHandler();
const validate = new ValidationHandler();

auth.setNext(authz).setNext(validate);

// Process request
auth.handle({
  authenticated: true,
  authorized: true,
  valid: true
}); // Passes through all handlers
```

---

## Template Method

### Q9: Explain Template Method pattern with an example.
**Answer:** Template Method defines the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the algorithm's structure.

**Example:**
```javascript
// Template class
class DataProcessor {
  // Template method - defines algorithm structure
  process() {
    this.readData();
    this.processData();
    this.writeData();
  }

  readData() {
    throw new Error('Must implement');
  }

  processData() {
    throw new Error('Must implement');
  }

  writeData() {
    throw new Error('Must implement');
  }
}

// Concrete implementations
class CSVProcessor extends DataProcessor {
  readData() {
    console.log('Reading CSV file');
    this.data = 'csv,data,here';
  }

  processData() {
    console.log('Processing CSV');
    this.result = this.data.split(',');
  }

  writeData() {
    console.log('Writing CSV result');
  }
}

class JSONProcessor extends DataProcessor {
  readData() {
    console.log('Reading JSON file');
    this.data = '{"key": "value"}';
  }

  processData() {
    console.log('Processing JSON');
    this.result = JSON.parse(this.data);
  }

  writeData() {
    console.log('Writing JSON result');
  }
}

// Usage - same algorithm structure, different implementations
const csv = new CSVProcessor();
csv.process(); // Calls all three methods in order

const json = new JSONProcessor();
json.process(); // Same sequence, different implementation
```

**Benefits:**
- Code reuse (common algorithm in base class)
- Controlled extension points
- Inversionof control ("Hollywood Principle")

---

## Iterator Pattern

### Q10: How does JavaScript's built-in iteration relate to Iterator pattern?
**Answer:** JavaScript has built-in iterator protocol using `Symbol.iterator`.

**Custom Iterator:**
```javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

// Usage with for...of
const range = new Range(1, 5);
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Manual iteration
const iterator = range[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
```

**Generator Functions:**
```javascript
function* fibonacci(max) {
  let [prev, curr] = [0, 1];

  while (curr < max) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (const num of fibonacci(100)) {
  console.log(num); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
}
```

---

## Mediator Pattern

### Q11: When would you use Mediator pattern?
**Answer:** Use Mediator when objects communicate in complex ways and you want to reduce coupling by centralizing communication.

**Example - Chat Room:**
```javascript
class ChatRoom {
  constructor() {
    this.users = new Map();
  }

  register(user) {
    this.users.set(user.name, user);
    user.chatRoom = this;
  }

  send(message, from, to) {
    const recipient = this.users.get(to);
    if (recipient) {
      recipient.receive(message, from);
    }
  }

  broadcast(message, from) {
    this.users.forEach((user, name) => {
      if (name !== from.name) {
        user.receive(message, from.name);
      }
    });
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.chatRoom = null;
  }

  send(message, to) {
    this.chatRoom.send(message, this.name, to);
  }

  broadcast(message) {
    this.chatRoom.broadcast(message, this);
  }

  receive(message, from) {
    console.log(`${this.name} received from ${from}: ${message}`);
  }
}

// Usage - users don't reference each other directly
const chatRoom = new ChatRoom();
const john = new User('John');
const jane = new User('Jane');

chatRoom.register(john);
chatRoom.register(jane);

john.send('Hi Jane!', 'Jane'); // Through mediator
jane.broadcast('Hello everyone!'); // Through mediator
```

**Benefits:**
- Reduced coupling between colleagues
- Centralized control
- Easier to understand object relationships

---

[← Back to Interview Questions](./README.md)
