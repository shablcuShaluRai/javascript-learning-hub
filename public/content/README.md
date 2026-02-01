# JavaScript Design Patterns

A comprehensive guide to design patterns in modern JavaScript. This documentation covers 23 essential design patterns with practical examples, use cases, and best practices.

## What are Design Patterns?

Design patterns are reusable solutions to common problems in software design. They represent best practices and provide a standard terminology for developers to communicate about software architecture.

## Pattern Categories

Design patterns are organized into three main categories:

### Creational Patterns
Focus on object creation mechanisms, providing flexibility in what gets created, who creates it, how it's created, and when.

- [Singleton](./creational/singleton.md) - Ensure a class has only one instance
- [Factory](./creational/factory.md) - Create objects without specifying exact classes
- [Abstract Factory](./creational/abstract-factory.md) - Create families of related objects
- [Builder](./creational/builder.md) - Construct complex objects step by step
- [Prototype](./creational/prototype.md) - Clone objects from prototypical instances

### Structural Patterns
Deal with object composition, creating relationships between objects to form larger structures.

- [Adapter](./structural/adapter.md) - Make incompatible interfaces work together
- [Bridge](./structural/bridge.md) - Separate abstraction from implementation
- [Composite](./structural/composite.md) - Compose objects into tree structures
- [Decorator](./structural/decorator.md) - Add responsibilities to objects dynamically
- [Facade](./structural/facade.md) - Provide a simplified interface to complex subsystems
- [Flyweight](./structural/flyweight.md) - Share objects to support large numbers efficiently
- [Proxy](./structural/proxy.md) - Provide a placeholder for another object

### Behavioral Patterns
Focus on communication between objects, defining how objects interact and distribute responsibility.

- [Chain of Responsibility](./behavioral/chain-of-responsibility.md) - Pass requests along a chain of handlers
- [Command](./behavioral/command.md) - Encapsulate requests as objects
- [Iterator](./behavioral/iterator.md) - Access elements sequentially without exposing structure
- [Mediator](./behavioral/mediator.md) - Reduce coupling between communicating objects
- [Memento](./behavioral/memento.md) - Capture and restore object state
- [Observer](./behavioral/observer.md) - Define one-to-many dependency between objects
- [State](./behavioral/state.md) - Alter object behavior when state changes
- [Strategy](./behavioral/strategy.md) - Define family of algorithms and make them interchangeable
- [Template Method](./behavioral/template-method.md) - Define skeleton of algorithm in base class
- [Visitor](./behavioral/visitor.md) - Separate algorithms from objects they operate on
- [Interpreter](./behavioral/interpreter.md) - Define grammar representation and interpreter

## Quick Reference

| Pattern | Category | Purpose | Common Use Cases |
|---------|----------|---------|------------------|
| Singleton | Creational | One instance | Config managers, caches |
| Factory | Creational | Object creation | UI components, plugins |
| Observer | Behavioral | Event handling | Event systems, reactive programming |
| Decorator | Structural | Add functionality | Middleware, feature enhancement |
| Strategy | Behavioral | Algorithm selection | Sorting, validation, payment methods |
| Facade | Structural | Simplify interface | API wrappers, library interfaces |
| Proxy | Structural | Control access | Lazy loading, access control |
| Command | Behavioral | Encapsulate actions | Undo/redo, macro recording |

## Modern JavaScript Features

All examples in this documentation use modern JavaScript (ES6+) features:
- Classes and constructors
- Arrow functions
- Destructuring
- Spread/rest operators
- Async/await
- Modules (import/export)
- Symbols and WeakMaps

## How to Use This Documentation

Each pattern documentation includes:
1. **Intent** - What problem does it solve?
2. **Structure** - UML-style class relationships
3. **Implementation** - Complete working code examples
4. **Use Cases** - Real-world scenarios
5. **Pros & Cons** - When to use and when to avoid
6. **Related Patterns** - Similar or complementary patterns

## Contributing

These patterns are living examples. As JavaScript evolves, so do the best practices for implementing these patterns.

## Additional Resources

- [Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns) (Gang of Four)
- [JavaScript Design Patterns](https://www.patterns.dev/posts/classic-design-patterns/) by Addy Osmani
- [Refactoring.Guru](https://refactoring.guru/design-patterns)

---

Start exploring patterns by category or jump directly to any pattern using the links above!
