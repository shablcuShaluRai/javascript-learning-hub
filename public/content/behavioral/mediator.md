# Mediator Pattern

## Intent
Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.

## Problem
A set of objects communicate in complex ways. The resulting interdependencies are unstructured and difficult to understand.

## Implementation

### Basic Mediator
```javascript
// Mediator
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

// Colleague
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

// Usage
const chatRoom = new ChatRoom();

const john = new User('John');
const jane = new User('Jane');
const bob = new User('Bob');

chatRoom.register(john);
chatRoom.register(jane);
chatRoom.register(bob);

john.send('Hi Jane!', 'Jane');
jane.broadcast('Hello everyone!');
```

## Pros

1. **Loose Coupling**: Objects don't reference each other directly
2. **Centralized Control**: All interactions in one place
3. **Reusability**: Objects can be reused independently

## Cons

1. **Complexity**: Mediator can become complex
2. **God Object**: Risk of mediator doing too much

## When to Use

- ✅ Objects communicate in complex ways
- ✅ Reuse objects difficult due to many dependencies
- ✅ Behavior distributed among classes should be customizable

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
