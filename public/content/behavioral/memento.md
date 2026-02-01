# Memento Pattern

## Intent
Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.

## Implementation

### Basic Memento
```javascript
// Memento
class EditorMemento {
  constructor(content) {
    this.content = content;
    this.timestamp = new Date();
  }

  getContent() {
    return this.content;
  }
}

// Originator
class Editor {
  constructor() {
    this.content = '';
  }

  type(text) {
    this.content += text;
  }

  getContent() {
    return this.content;
  }

  save() {
    return new EditorMemento(this.content);
  }

  restore(memento) {
    this.content = memento.getContent();
  }
}

// Caretaker
class History {
  constructor() {
    this.mementos = [];
  }

  push(memento) {
    this.mementos.push(memento);
  }

  pop() {
    return this.mementos.pop();
  }
}

// Usage
const editor = new Editor();
const history = new History();

editor.type('Hello ');
history.push(editor.save());

editor.type('World');
history.push(editor.save());

editor.type('!!!');
console.log(editor.getContent()); // Hello World!!!

editor.restore(history.pop());
console.log(editor.getContent()); // Hello World

editor.restore(history.pop());
console.log(editor.getContent()); // Hello
```

## Pros

1. **Encapsulation**: Preserves encapsulation boundaries
2. **Simplicity**: Simplifies originator
3. **Recovery**: Easy state recovery

## Cons

1. **Memory**: Can be expensive if state is large
2. **Overhead**: Saving/restoring overhead

## When to Use

- ✅ Save and restore object state
- ✅ Implement undo functionality
- ✅ Direct interface would violate encapsulation

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
