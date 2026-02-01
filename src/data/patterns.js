// Main sections
export const mainSections = [
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals',
    icon: '📘',
    description: 'Master core JavaScript concepts from basics to advanced',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    icon: '🎨',
    description: '23 essential design patterns with practical examples',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'dsa',
    title: 'DSA in JavaScript',
    icon: '🧮',
    description: 'Data Structures & Algorithms implementation in JS',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'system-design',
    title: 'System Design for FE',
    icon: '🏗️',
    description: 'Frontend system design concepts and best practices',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  }
];

export const patterns = [
  {
    id: 'overview',
    title: 'Overview',
    icon: '🏠',
    file: 'README.md',
    category: null,
    section: null
  },
  // JavaScript Fundamentals Section
  {
    id: 'js-basics-overview',
    title: 'JS Basics Overview',
    icon: '📘',
    file: 'js-basics-README.md',
    category: 'JavaScript Basics',
    section: 'js-fundamentals'
  },
  // Fundamentals
  {
    id: 'variables',
    title: 'Variables',
    icon: '📦',
    file: 'fundamentals/variables.md',
    category: 'Fundamentals',
    section: 'js-fundamentals'
  },
  {
    id: 'data-types',
    title: 'Data Types',
    icon: '🔢',
    file: 'fundamentals/data-types.md',
    category: 'Fundamentals',
    section: 'js-fundamentals'
  },
  {
    id: 'operators',
    title: 'Operators',
    icon: '➕',
    file: 'fundamentals/operators.md',
    category: 'Fundamentals',
    section: 'js-fundamentals'
  },
  {
    id: 'type-conversion',
    title: 'Type Conversion',
    icon: '🔄',
    file: 'fundamentals/type-conversion.md',
    category: 'Fundamentals',
    section: 'js-fundamentals'
  },
  // Functions
  {
    id: 'function-basics',
    title: 'Function Basics',
    icon: '⚙️',
    file: 'functions/function-basics.md',
    category: 'Functions',
    section: 'js-fundamentals'
  },
  {
    id: 'arrow-functions',
    title: 'Arrow Functions',
    icon: '➡️',
    file: 'functions/arrow-functions.md',
    category: 'Functions',
    section: 'js-fundamentals'
  },
  {
    id: 'closures',
    title: 'Closures',
    icon: '🔒',
    file: 'functions/closures.md',
    category: 'Functions',
    section: 'js-fundamentals'
  },
  {
    id: 'hoisting',
    title: 'Hoisting',
    icon: '⬆️',
    file: 'functions/hoisting.md',
    category: 'Functions',
    section: 'js-fundamentals'
  },
  {
    id: 'scope',
    title: 'Scope',
    icon: '🎯',
    file: 'functions/scope.md',
    category: 'Functions',
    section: 'js-fundamentals'
  },
  {
    id: 'this-keyword',
    title: 'This Keyword',
    icon: '👉',
    file: 'functions/this-keyword.md',
    category: 'Functions',
    section: 'js-fundamentals'
  },
  // Objects & Arrays
  {
    id: 'objects',
    title: 'Objects',
    icon: '📦',
    file: 'objects-arrays/objects.md',
    category: 'Objects & Arrays',
    section: 'js-fundamentals'
  },
  {
    id: 'arrays',
    title: 'Arrays',
    icon: '📋',
    file: 'objects-arrays/arrays.md',
    category: 'Objects & Arrays',
    section: 'js-fundamentals'
  },
  {
    id: 'array-methods',
    title: 'Array Methods',
    icon: '🔧',
    file: 'objects-arrays/array-methods.md',
    category: 'Objects & Arrays',
    section: 'js-fundamentals'
  },
  {
    id: 'destructuring',
    title: 'Destructuring',
    icon: '📤',
    file: 'objects-arrays/destructuring.md',
    category: 'Objects & Arrays',
    section: 'js-fundamentals'
  },
  // Control Flow
  {
    id: 'if-else',
    title: 'If-Else',
    icon: '🔀',
    file: 'control-flow/if-else.md',
    category: 'Control Flow',
    section: 'js-fundamentals'
  },
  {
    id: 'loops',
    title: 'Loops',
    icon: '🔁',
    file: 'control-flow/loops.md',
    category: 'Control Flow',
    section: 'js-fundamentals'
  },
  {
    id: 'iteration-methods',
    title: 'Iteration Methods',
    icon: '🔄',
    file: 'control-flow/iteration-methods.md',
    category: 'Control Flow',
    section: 'js-fundamentals'
  },
  // Modern JavaScript
  {
    id: 'template-literals',
    title: 'Template Literals',
    icon: '💬',
    file: 'modern-js/template-literals.md',
    category: 'Modern JavaScript',
    section: 'js-fundamentals'
  },
  {
    id: 'spread-rest',
    title: 'Spread & Rest',
    icon: '📦',
    file: 'modern-js/spread-rest.md',
    category: 'Modern JavaScript',
    section: 'js-fundamentals'
  },
  {
    id: 'modules',
    title: 'Modules',
    icon: '📦',
    file: 'modern-js/modules.md',
    category: 'Modern JavaScript',
    section: 'js-fundamentals'
  },
  {
    id: 'classes',
    title: 'Classes',
    icon: '🏛️',
    file: 'modern-js/classes.md',
    category: 'Modern JavaScript',
    section: 'js-fundamentals'
  },
  // Async JavaScript
  {
    id: 'callbacks',
    title: 'Callbacks',
    icon: '📞',
    file: 'async/callbacks.md',
    category: 'Async JavaScript',
    section: 'js-fundamentals'
  },
  {
    id: 'promises',
    title: 'Promises',
    icon: '🤝',
    file: 'async/promises.md',
    category: 'Async JavaScript',
    section: 'js-fundamentals'
  },
  {
    id: 'async-await',
    title: 'Async/Await',
    icon: '⏳',
    file: 'async/async-await.md',
    category: 'Async JavaScript',
    section: 'js-fundamentals'
  },
  {
    id: 'fetch-api',
    title: 'Fetch API',
    icon: '🌐',
    file: 'async/fetch-api.md',
    category: 'Async JavaScript',
    section: 'js-fundamentals'
  },
  // DOM Manipulation
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    icon: '🎨',
    file: 'dom/dom-manipulation.md',
    category: 'DOM Manipulation',
    section: 'js-fundamentals'
  },
  {
    id: 'events',
    title: 'Events',
    icon: '👆',
    file: 'dom/events.md',
    category: 'DOM Manipulation',
    section: 'js-fundamentals'
  },
  {
    id: 'event-delegation',
    title: 'Event Delegation',
    icon: '📡',
    file: 'dom/event-delegation.md',
    category: 'DOM Manipulation',
    section: 'js-fundamentals'
  },
  // Design Patterns Section - Creational Patterns
  {
    id: 'singleton',
    title: 'Singleton',
    icon: '🔐',
    file: 'creational/singleton.md',
    category: 'Creational Patterns',
    section: 'design-patterns'
  },
  {
    id: 'factory',
    title: 'Factory',
    icon: '🏭',
    file: 'creational/factory.md',
    category: 'Creational Patterns',
    section: 'design-patterns'
  },
  {
    id: 'abstract-factory',
    title: 'Abstract Factory',
    icon: '🏗️',
    file: 'creational/abstract-factory.md',
    category: 'Creational Patterns',
    section: 'design-patterns'
  },
  {
    id: 'builder',
    title: 'Builder',
    icon: '🔨',
    file: 'creational/builder.md',
    category: 'Creational Patterns',
    section: 'design-patterns'
  },
  {
    id: 'prototype',
    title: 'Prototype',
    icon: '🧬',
    file: 'creational/prototype.md',
    category: 'Creational Patterns',
    section: 'design-patterns'
  },
  // Structural Patterns
  {
    id: 'adapter',
    title: 'Adapter',
    icon: '🔌',
    file: 'structural/adapter.md',
    category: 'Structural Patterns',
    section: 'design-patterns'
  },
  {
    id: 'bridge',
    title: 'Bridge',
    icon: '🌉',
    file: 'structural/bridge.md',
    category: 'Structural Patterns',
    section: 'design-patterns'
  },
  {
    id: 'composite',
    title: 'Composite',
    icon: '🌳',
    file: 'structural/composite.md',
    category: 'Structural Patterns',
    section: 'design-patterns'
  },
  {
    id: 'decorator',
    title: 'Decorator',
    icon: '🎨',
    file: 'structural/decorator.md',
    category: 'Structural Patterns',
    section: 'design-patterns'
  },
  {
    id: 'facade',
    title: 'Facade',
    icon: '🎭',
    file: 'structural/facade.md',
    category: 'Structural Patterns',
    section: 'design-patterns'
  },
  {
    id: 'flyweight',
    title: 'Flyweight',
    icon: '🪶',
    file: 'structural/flyweight.md',
    category: 'Structural Patterns',
    section: 'design-patterns'
  },
  {
    id: 'proxy',
    title: 'Proxy',
    icon: '🛡️',
    file: 'structural/proxy.md',
    category: 'Structural Patterns',
    section: 'design-patterns'
  },
  // Behavioral Patterns
  {
    id: 'observer',
    title: 'Observer',
    icon: '👁️',
    file: 'behavioral/observer.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'strategy',
    title: 'Strategy',
    icon: '🎯',
    file: 'behavioral/strategy.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'command',
    title: 'Command',
    icon: '⚡',
    file: 'behavioral/command.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'state',
    title: 'State',
    icon: '🔄',
    file: 'behavioral/state.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'chain-of-responsibility',
    title: 'Chain of Responsibility',
    icon: '⛓️',
    file: 'behavioral/chain-of-responsibility.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'iterator',
    title: 'Iterator',
    icon: '🔁',
    file: 'behavioral/iterator.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'mediator',
    title: 'Mediator',
    icon: '🤝',
    file: 'behavioral/mediator.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'memento',
    title: 'Memento',
    icon: '💾',
    file: 'behavioral/memento.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'template-method',
    title: 'Template Method',
    icon: '📋',
    file: 'behavioral/template-method.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'visitor',
    title: 'Visitor',
    icon: '🚶',
    file: 'behavioral/visitor.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  {
    id: 'interpreter',
    title: 'Interpreter',
    icon: '🔤',
    file: 'behavioral/interpreter.md',
    category: 'Behavioral Patterns',
    section: 'design-patterns'
  },
  // Interview Questions
  {
    id: 'interview-overview',
    title: 'Overview & Study Plan',
    icon: '📚',
    file: 'interview-questions/README.md',
    category: 'Interview Questions',
    section: 'design-patterns'
  },
  {
    id: 'interview-general',
    title: 'General Questions',
    icon: '❓',
    file: 'interview-questions/general.md',
    category: 'Interview Questions',
    section: 'design-patterns'
  },
  {
    id: 'interview-creational',
    title: 'Creational Q&A',
    icon: '🔨',
    file: 'interview-questions/creational.md',
    category: 'Interview Questions',
    section: 'design-patterns'
  },
  {
    id: 'interview-structural',
    title: 'Structural Q&A',
    icon: '🏗️',
    file: 'interview-questions/structural.md',
    category: 'Interview Questions',
    section: 'design-patterns'
  },
  {
    id: 'interview-behavioral',
    title: 'Behavioral Q&A',
    icon: '🎭',
    file: 'interview-questions/behavioral.md',
    category: 'Interview Questions',
    section: 'design-patterns'
  }
];

// Get categories for a specific section
export const getCategoriesForSection = (sectionId) => {
  const sectionPatterns = patterns.filter(p => p.section === sectionId);
  const uniqueCategories = [...new Set(sectionPatterns.map(p => p.category))].filter(Boolean);
  return uniqueCategories;
};

// Get patterns for a specific section
export const getPatternsForSection = (sectionId) => {
  return patterns.filter(p => p.section === sectionId);
};

// Get patterns by category within a section
export const getPatternsByCategory = (sectionId) => {
  const categories = getCategoriesForSection(sectionId);
  return categories.reduce((acc, category) => {
    acc[category] = patterns.filter(p => p.section === sectionId && p.category === category);
    return acc;
  }, {});
};
