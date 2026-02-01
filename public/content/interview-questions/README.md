# Design Patterns Interview Questions & Answers

A comprehensive collection of interview questions and answers for JavaScript design patterns. Perfect for interview preparation and deepening your understanding.

## 📚 Quick Navigation

### [General Questions](./general.md)
**15 Essential Questions**
- What are design patterns?
- Pattern categories and classification
- SOLID principles
- When to use/avoid patterns
- Common anti-patterns
- Comparing similar patterns

**Topics Covered:**
- Design pattern fundamentals
- Open/Closed Principle
- Dependency Inversion
- Single Responsibility
- Liskov Substitution
- Composition vs Inheritance

---

### [Creational Patterns](./creational.md)
**12 Questions**

**Covered Patterns:**
- Singleton
- Factory & Factory Method
- Abstract Factory
- Builder
- Prototype

**Key Topics:**
- Thread-safety in Singleton
- Factory vs Constructor
- Builder vs Factory
- Shallow vs Deep copy
- Abstract Factory trade-offs

---

### [Structural Patterns](./structural.md)
**11 Questions**

**Covered Patterns:**
- Adapter
- Proxy
- Decorator
- Facade
- Composite
- Bridge
- Flyweight

**Key Topics:**
- Adapter vs Facade
- Decorator vs Inheritance
- Proxy types and uses
- JavaScript Proxy object
- Composite principle
- Flyweight optimization

---

### [Behavioral Patterns](./behavioral.md)
**11 Questions**

**Covered Patterns:**
- Observer
- Strategy
- Command
- State
- Chain of Responsibility
- Template Method
- Iterator
- Mediator

**Key Topics:**
- Observer problems and solutions
- Strategy vs if-else
- Undo/redo implementation
- State vs Strategy
- JavaScript iterators
- Mediator benefits

---

## 🎯 How to Use This Guide

### For Interview Preparation:
1. Start with **General Questions** - covers fundamentals
2. Focus on patterns in your tech stack
3. Practice explaining with code examples
4. Understand trade-offs and when to use each pattern

### For Learning:
1. Read the pattern documentation first
2. Review corresponding interview questions
3. Try implementing examples yourself
4. Compare your solutions with provided code

### Question Difficulty Levels:

**🟢 Easy** - Pattern basics, simple comparisons
- What is X pattern?
- When to use X?
- Basic examples

**🟡 Medium** - Trade-offs, comparisons, real-world usage
- X vs Y pattern
- Problems with X pattern
- SOLID principles relation

**🔴 Hard** - Deep understanding, complex scenarios
- Multiple pattern combinations
- Performance considerations
- Architecture-level decisions

---

## 💡 Interview Tips

### When Answering:

1. **Start Simple**: Brief definition first
2. **Use Examples**: Code or real-world analogy
3. **Discuss Trade-offs**: Pros and cons
4. **Know When Not to Use**: Show judgment

### Good Answer Structure:

```
1. Definition (1-2 sentences)
2. Problem it solves
3. Code example
4. Real-world use case
5. When to use/avoid
```

**Example:**
```
Q: What is the Singleton pattern?

A: "Singleton ensures a class has only one instance
   throughout the application's lifetime.

   Problem: You need exactly one instance globally,
   like a configuration manager or database connection.

   [Show code example]

   Real use: Logger, cache manager, thread pools.

   Use when: Truly need one instance.
   Avoid when: Testing is difficult, or dependency
   injection would be clearer."
```

---

## 🔑 Most Commonly Asked Questions

### Top 10 for Interviews:

1. **What are design patterns and why use them?**
   - [General Q1](./general.md#q1-what-are-design-patterns)

2. **Explain Singleton pattern**
   - [Creational Q1](./creational.md#q1-when-would-you-use-the-singleton-pattern)

3. **Factory vs Abstract Factory**
   - [General Q5](./general.md#q5-what-is-the-difference-between-abstract-factory-and-factory-method-patterns)

4. **Observer pattern and real-world usage**
   - [Behavioral Q1](./behavioral.md#q1-explain-the-observer-pattern-and-give-a-real-world-example)

5. **Decorator vs Proxy**
   - [General Q7](./general.md#q7-what-is-the-difference-between-decorator-and-proxy-patterns)

6. **Strategy pattern benefits**
   - [Behavioral Q3](./behavioral.md#q3-when-would-you-use-strategy-over-simple-if-else-statements)

7. **Adapter pattern use cases**
   - [Structural Q1](./structural.md#q1-explain-the-adapter-pattern-with-a-real-world-example)

8. **SOLID principles**
   - [General Q6-Q11](./general.md)

9. **When NOT to use patterns**
   - [General Q4](./general.md#q4-when-should-you-not-use-a-design-pattern)

10. **State vs Strategy**
    - [Behavioral Q7](./behavioral.md#q7-how-does-state-pattern-differ-from-strategy-pattern)

---

## 📊 Pattern Comparison Table

| Pattern | Type | Main Purpose | When to Use |
|---------|------|--------------|-------------|
| Singleton | Creational | One instance | Config, cache, logger |
| Factory | Creational | Object creation | Multiple product types |
| Observer | Behavioral | Event handling | Reactive updates |
| Strategy | Behavioral | Algorithm selection | Interchangeable algorithms |
| Decorator | Structural | Add functionality | Runtime enhancement |
| Adapter | Structural | Interface conversion | Legacy integration |
| Proxy | Structural | Access control | Lazy loading, security |
| Command | Behavioral | Encapsulate requests | Undo/redo, queues |

---

## 🎓 Study Plan

### Week 1: Fundamentals
- [ ] General questions (all 15)
- [ ] SOLID principles
- [ ] Pattern categories

### Week 2: Creational Patterns
- [ ] Singleton (most asked!)
- [ ] Factory patterns
- [ ] Builder vs Factory

### Week 3: Structural Patterns
- [ ] Adapter
- [ ] Decorator
- [ ] Proxy

### Week 4: Behavioral Patterns
- [ ] Observer
- [ ] Strategy
- [ ] Command
- [ ] State

### Week 5: Review
- [ ] Top 10 questions
- [ ] Pattern comparisons
- [ ] Code examples
- [ ] Mock interviews

---

## 🔗 Related Resources

- [Main Documentation](../README.md)
- [Creational Patterns](../creational/)
- [Structural Patterns](../structural/)
- [Behavioral Patterns](../behavioral/)

---

## 📝 Additional Practice

### Try These Exercises:

1. **Implement undo/redo** using Command pattern
2. **Build a plugin system** using Factory + Observer
3. **Create middleware chain** using Chain of Responsibility
4. **Design state machine** using State pattern
5. **Make legacy API adapter** using Adapter pattern

---

**Good luck with your interviews!** 🚀

Remember: Understanding **why** and **when** to use patterns is more important than memorizing implementations.

---

[← Back to Main](../README.md)
