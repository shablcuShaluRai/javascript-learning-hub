# Command Pattern

## Intent
Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

## Problem
You need to issue requests to objects without knowing anything about the operation being requested or the receiver of the request. You want to support undo/redo, logging, or transaction systems.

## Structure
```
Client → Invoker → Command Interface → Receiver
                   ├── ConcreteCommandA
                   └── ConcreteCommandB
```

## Implementation

### Basic Command
```javascript
// Receiver
class Light {
  on() {
    console.log('Light is ON');
  }

  off() {
    console.log('Light is OFF');
  }
}

// Command Interface
class Command {
  execute() {
    throw new Error('execute() must be implemented');
  }

  undo() {
    throw new Error('undo() must be implemented');
  }
}

// Concrete Commands
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.on();
  }

  undo() {
    this.light.off();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.off();
  }

  undo() {
    this.light.on();
  }
}

// Invoker
class RemoteControl {
  constructor() {
    this.history = [];
  }

  submit(command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// Usage
const light = new Light();
const remote = new RemoteControl();

remote.submit(new LightOnCommand(light));
remote.submit(new LightOffCommand(light));
remote.undo(); // Light back ON
```

### Text Editor with Undo/Redo
```javascript
class TextEditor {
  constructor() {
    this.content = '';
  }

  write(text) {
    this.content += text;
  }

  delete(length) {
    this.content = this.content.slice(0, -length);
  }

  getContent() {
    return this.content;
  }
}

class WriteCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }

  execute() {
    this.editor.write(this.text);
  }

  undo() {
    this.editor.delete(this.text.length);
  }
}

class DeleteCommand extends Command {
  constructor(editor, length) {
    super();
    this.editor = editor;
    this.length = length;
    this.deletedText = '';
  }

  execute() {
    const content = this.editor.getContent();
    this.deletedText = content.slice(-this.length);
    this.editor.delete(this.length);
  }

  undo() {
    this.editor.write(this.deletedText);
  }
}

class EditorInvoker {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  execute(command) {
    // Clear redo history when new command is executed
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
const invoker = new EditorInvoker();

invoker.execute(new WriteCommand(editor, 'Hello '));
invoker.execute(new WriteCommand(editor, 'World'));
console.log(editor.getContent()); // Hello World

invoker.undo();
console.log(editor.getContent()); // Hello

invoker.redo();
console.log(editor.getContent()); // Hello World
```

## Pros

1. **Decoupling**: Decouples invoker from receiver
2. **Undo/Redo**: Easy to implement
3. **Queueing**: Commands can be queued
4. **Logging**: Commands can be logged
5. **Macro Commands**: Composite commands

## Cons

1. **Complexity**: Many command classes
2. **Memory**: History consumes memory

## When to Use

- ✅ Parameterize objects with operations
- ✅ Queue, log, or schedule operations
- ✅ Support undo/redo
- ✅ Macro recording

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
