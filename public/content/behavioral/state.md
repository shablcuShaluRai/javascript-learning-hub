# State Pattern

## Intent
Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.

## Problem
An object's behavior depends on its state, and it must change behavior at runtime depending on that state. Large conditional statements check the object's state.

## Structure
```
Context → State Interface
          ├── ConcreteStateA
          ├── ConcreteStateB
          └── ConcreteStateC
```

## Implementation

### Basic State Pattern
```javascript
// State interface
class State {
  handle(context) {
    throw new Error('handle() must be implemented');
  }
}

// Concrete States
class RedState extends State {
  handle(context) {
    console.log('RED - Stop');
    setTimeout(() => context.setState(new GreenState()), 2000);
  }
}

class YellowState extends State {
  handle(context) {
    console.log('YELLOW - Prepare to stop');
    setTimeout(() => context.setState(new RedState()), 1000);
  }
}

class GreenState extends State {
  handle(context) {
    console.log('GREEN - Go');
    setTimeout(() => context.setState(new YellowState()), 3000);
  }
}

// Context
class TrafficLight {
  constructor() {
    this.state = new RedState();
  }

  setState(state) {
    this.state = state;
    this.state.handle(this);
  }

  start() {
    this.state.handle(this);
  }
}

// Usage
const light = new TrafficLight();
light.start();
```

### Document State
```javascript
class DocumentState {
  publish(document) {
    throw new Error('Cannot publish in this state');
  }

  reject(document) {
    throw new Error('Cannot reject in this state');
  }

  approve(document) {
    throw new Error('Cannot approve in this state');
  }
}

class DraftState extends DocumentState {
  publish(document) {
    console.log('Publishing draft for review');
    document.setState(new ModerationState());
  }
}

class ModerationState extends DocumentState {
  approve(document) {
    console.log('Document approved');
    document.setState(new PublishedState());
  }

  reject(document) {
    console.log('Document rejected');
    document.setState(new DraftState());
  }
}

class PublishedState extends DocumentState {
  publish(document) {
    console.log('Document is already published');
  }
}

class Document {
  constructor() {
    this.state = new DraftState();
    this.content = '';
  }

  setState(state) {
    this.state = state;
  }

  publish() {
    this.state.publish(this);
  }

  approve() {
    this.state.approve(this);
  }

  reject() {
    this.state.reject(this);
  }
}

// Usage
const doc = new Document();
doc.publish();  // Draft → Moderation
doc.approve();  // Moderation → Published
doc.publish();  // Already published
```

## Pros

1. **Single Responsibility**: Each state is a separate class
2. **Open/Closed**: Add new states without modifying existing ones
3. **Eliminates Conditionals**: No large switch statements

## Cons

1. **Complexity**: Many state classes
2. **Overhead**: Can be overkill for simple state machines

## When to Use

- ✅ Object behavior depends on its state
- ✅ Large conditional statements based on state
- ✅ State transitions are complex

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
