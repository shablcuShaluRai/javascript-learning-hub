# Composite Pattern

## Intent
Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

## Problem
You need to represent hierarchical tree structures of objects, and you want clients to be able to treat individual objects and compositions uniformly.

## Structure
```
Component
├── Leaf
└── Composite (contains Components)
```

## Implementation

### Basic Composite
```javascript
// Component
class FileSystemItem {
  constructor(name) {
    this.name = name;
  }

  getSize() {
    throw new Error('getSize() must be implemented');
  }

  print(indent = '') {
    throw new Error('print() must be implemented');
  }
}

// Leaf
class File extends FileSystemItem {
  constructor(name, size) {
    super(name);
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  print(indent = '') {
    console.log(`${indent}📄 ${this.name} (${this.size} KB)`);
  }
}

// Composite
class Directory extends FileSystemItem {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(item) {
    this.children.push(item);
    return this;
  }

  remove(item) {
    const index = this.children.indexOf(item);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
    return this;
  }

  getSize() {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }

  print(indent = '') {
    console.log(`${indent}📁 ${this.name}/`);
    this.children.forEach(child => child.print(indent + '  '));
  }
}

// Usage
const root = new Directory('root');
const documents = new Directory('documents');
const images = new Directory('images');

documents.add(new File('resume.pdf', 100));
documents.add(new File('cover-letter.pdf', 50));

images.add(new File('photo1.jpg', 2000));
images.add(new File('photo2.jpg', 1500));

root.add(documents).add(images).add(new File('readme.txt', 10));

root.print();
console.log(`\nTotal size: ${root.getSize()} KB`);
```

### UI Component Hierarchy
```javascript
class UIComponent {
  constructor(name) {
    this.name = name;
  }

  render() {
    throw new Error('render() must be implemented');
  }

  getHTML() {
    throw new Error('getHTML() must be implemented');
  }
}

// Leaf components
class Button extends UIComponent {
  constructor(name, label) {
    super(name);
    this.label = label;
  }

  render() {
    console.log(`Rendering button: ${this.label}`);
  }

  getHTML() {
    return `<button>${this.label}</button>`;
  }
}

class Input extends UIComponent {
  constructor(name, type, placeholder) {
    super(name);
    this.type = type;
    this.placeholder = placeholder;
  }

  render() {
    console.log(`Rendering input: ${this.type}`);
  }

  getHTML() {
    return `<input type="${this.type}" placeholder="${this.placeholder}" />`;
  }
}

// Composite components
class Panel extends UIComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(component) {
    this.children.push(component);
    return this;
  }

  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
    return this;
  }

  render() {
    console.log(`Rendering panel: ${this.name}`);
    this.children.forEach(child => child.render());
  }

  getHTML() {
    const childrenHTML = this.children.map(child => child.getHTML()).join('\\n  ');
    return `<div class="panel">\\n  ${childrenHTML}\\n</div>`;
  }
}

// Usage
const loginForm = new Panel('loginForm');
loginForm
  .add(new Input('email', 'email', 'Enter email'))
  .add(new Input('password', 'password', 'Enter password'))
  .add(new Button('submit', 'Login'));

const sidebar = new Panel('sidebar');
sidebar
  .add(new Button('home', 'Home'))
  .add(new Button('profile', 'Profile'));

const mainLayout = new Panel('mainLayout');
mainLayout.add(sidebar).add(loginForm);

console.log(mainLayout.getHTML());
```

### Organization Hierarchy
```javascript
class Employee {
  constructor(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }

  getSalary() {
    throw new Error('getSalary() must be implemented');
  }

  print(indent = '') {
    throw new Error('print() must be implemented');
  }
}

class IndividualEmployee extends Employee {
  getSalary() {
    return this.salary;
  }

  print(indent = '') {
    console.log(`${indent}${this.name} (${this.position}) - $${this.salary}`);
  }
}

class Manager extends Employee {
  constructor(name, position, salary) {
    super(name, position, salary);
    this.subordinates = [];
  }

  add(employee) {
    this.subordinates.push(employee);
    return this;
  }

  remove(employee) {
    const index = this.subordinates.indexOf(employee);
    if (index !== -1) {
      this.subordinates.splice(index, 1);
    }
    return this;
  }

  getSalary() {
    const subordinateSalaries = this.subordinates.reduce(
      (total, emp) => total + emp.getSalary(),
      0
    );
    return this.salary + subordinateSalaries;
  }

  print(indent = '') {
    console.log(`${indent}${this.name} (${this.position}) - $${this.salary}`);
    this.subordinates.forEach(emp => emp.print(indent + '  '));
  }
}

// Usage
const ceo = new Manager('John CEO', 'CEO', 200000);

const cto = new Manager('Jane CTO', 'CTO', 150000);
const cfo = new Manager('Bob CFO', 'CFO', 150000);

const dev1 = new IndividualEmployee('Alice', 'Senior Dev', 100000);
const dev2 = new IndividualEmployee('Charlie', 'Junior Dev', 70000);

const accountant = new IndividualEmployee('David', 'Accountant', 60000);

cto.add(dev1).add(dev2);
cfo.add(accountant);
ceo.add(cto).add(cfo);

ceo.print();
console.log(`\\nTotal company salary: $${ceo.getSalary()}`);
```

## Pros

1. **Uniform Treatment**: Treat individual and composite objects uniformly
2. **Flexibility**: Easy to add new component types
3. **Simplified Client**: Client code doesn't need to distinguish between leaf and composite
4. **Recursive Structure**: Natural representation of tree structures

## Cons

1. **Overly General**: Can make design overly general
2. **Type Safety**: Hard to restrict component types
3. **Complexity**: May be overkill for simple hierarchies

## When to Use

- ✅ Represent part-whole hierarchies
- ✅ Want clients to ignore difference between leaf and composite
- ✅ Tree structures
- ✅ Recursive compositions

## When to Avoid

- ❌ Flat structure is sufficient
- ❌ Need strict type safety for different node types
- ❌ Performance is critical (recursion overhead)

---

[← Back to Structural Patterns](../README.md#structural-patterns)
