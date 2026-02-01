# Flyweight Pattern

## Intent
Use sharing to support large numbers of fine-grained objects efficiently. The Flyweight pattern minimizes memory usage by sharing as much data as possible with similar objects.

## Problem
You need to create a large number of similar objects, which would consume too much memory. Many objects share common data that doesn't need to be duplicated.

## Structure
```
FlyweightFactory
└── manages Flyweight objects
    ├── Intrinsic State (shared)
    └── Extrinsic State (unique)
```

## Implementation

### Basic Flyweight
```javascript
// Flyweight - contains intrinsic (shared) state
class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  draw(canvas, x, y) {
    console.log(`Drawing ${this.name} tree at (${x}, ${y}) with ${this.color} color`);
  }
}

// Flyweight Factory
class TreeFactory {
  constructor() {
    this.treeTypes = new Map();
  }

  getTreeType(name, color, texture) {
    const key = `${name}_${color}_${texture}`;

    if (!this.treeTypes.has(key)) {
      console.log(`Creating new tree type: ${key}`);
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }

    return this.treeTypes.get(key);
  }

  getTreeTypeCount() {
    return this.treeTypes.size;
  }
}

// Context - contains extrinsic (unique) state
class Tree {
  constructor(x, y, treeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType; // shared flyweight
  }

  draw(canvas) {
    this.treeType.draw(canvas, this.x, this.y);
  }
}

// Forest - manages tree instances
class Forest {
  constructor() {
    this.trees = [];
    this.treeFactory = new TreeFactory();
  }

  plantTree(x, y, name, color, texture) {
    const treeType = this.treeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, treeType);
    this.trees.push(tree);
  }

  draw(canvas) {
    this.trees.forEach(tree => tree.draw(canvas));
  }

  getStats() {
    return {
      totalTrees: this.trees.length,
      treeTypes: this.treeFactory.getTreeTypeCount(),
      memorySaved: `${this.trees.length - this.treeFactory.getTreeTypeCount()} objects`
    };
  }
}

// Usage
const forest = new Forest();

// Plant 1000 trees, but only a few types
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * 1000;
  const y = Math.random() * 1000;

  if (i % 3 === 0) {
    forest.plantTree(x, y, 'Oak', 'Green', 'rough');
  } else if (i % 3 === 1) {
    forest.plantTree(x, y, 'Pine', 'Dark Green', 'smooth');
  } else {
    forest.plantTree(x, y, 'Birch', 'White', 'peeling');
  }
}

console.log(forest.getStats());
// { totalTrees: 1000, treeTypes: 3, memorySaved: '997 objects' }
```

### Character Rendering
```javascript
// Flyweight - character glyph
class CharacterGlyph {
  constructor(char, fontFamily, fontSize) {
    this.char = char;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
  }

  render(x, y, color) {
    return {
      char: this.char,
      x,
      y,
      color,
      font: `${this.fontSize}px ${this.fontFamily}`
    };
  }
}

// Flyweight Factory
class GlyphFactory {
  constructor() {
    this.glyphs = new Map();
  }

  getGlyph(char, fontFamily, fontSize) {
    const key = `${char}_${fontFamily}_${fontSize}`;

    if (!this.glyphs.has(key)) {
      this.glyphs.set(key, new CharacterGlyph(char, fontFamily, fontSize));
    }

    return this.glyphs.get(key);
  }
}

// Document character with position and color (extrinsic state)
class DocumentCharacter {
  constructor(glyph, x, y, color) {
    this.glyph = glyph;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  render() {
    return this.glyph.render(this.x, this.y, this.color);
  }
}

// Document
class TextEditor {
  constructor() {
    this.characters = [];
    this.glyphFactory = new GlyphFactory();
  }

  insertCharacter(char, x, y, color, fontFamily = 'Arial', fontSize = 12) {
    const glyph = this.glyphFactory.getGlyph(char, fontFamily, fontSize);
    const character = new DocumentCharacter(glyph, x, y, color);
    this.characters.push(character);
  }

  render() {
    return this.characters.map(char => char.render());
  }
}

// Usage
const editor = new TextEditor();
const text = 'Hello World!!!';

text.split('').forEach((char, i) => {
  editor.insertCharacter(char, i * 10, 0, 'black');
});

console.log(editor.render().slice(0, 5)); // First 5 characters
```

### Icon Cache
```javascript
// Flyweight - Icon
class Icon {
  constructor(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.imageData = this.loadImage(imagePath);
  }

  loadImage(path) {
    console.log(`Loading image from ${path}`);
    return `[Image data for ${path}]`; // Simulated
  }

  render(x, y, size) {
    return `<img src="${this.imagePath}" style="left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px" />`;
  }
}

// Flyweight Factory
class IconFactory {
  constructor() {
    this.icons = new Map();
  }

  getIcon(name, imagePath) {
    if (!this.icons.has(name)) {
      this.icons.set(name, new Icon(name, imagePath));
    }

    return this.icons.get(name);
  }

  getStats() {
    return {
      cachedIcons: this.icons.size,
      iconNames: Array.from(this.icons.keys())
    };
  }
}

// File system item using icon
class FileItem {
  constructor(name, icon, x, y, size = 32) {
    this.name = name;
    this.icon = icon; // shared flyweight
    this.x = x;
    this.y = y;
    this.size = size;
  }

  render() {
    return this.icon.render(this.x, this.y, this.size);
  }
}

// File system
class FileSystem {
  constructor() {
    this.items = [];
    this.iconFactory = new IconFactory();
  }

  createFile(name, type, x, y) {
    const iconMap = {
      pdf: '/icons/pdf.png',
      doc: '/icons/doc.png',
      jpg: '/icons/jpg.png',
      folder: '/icons/folder.png'
    };

    const iconPath = iconMap[type] || '/icons/file.png';
    const icon = this.iconFactory.getIcon(type, iconPath);
    const file = new FileItem(name, icon, x, y);
    this.items.push(file);
  }

  render() {
    return this.items.map(item => item.render());
  }
}

// Usage
const fs = new FileSystem();

// Create many files
fs.createFile('document1.pdf', 'pdf', 0, 0);
fs.createFile('document2.pdf', 'pdf', 0, 50);
fs.createFile('report.doc', 'doc', 0, 100);
fs.createFile('photo.jpg', 'jpg', 0, 150);
fs.createFile('Documents', 'folder', 0, 200);

console.log(fs.iconFactory.getStats());
// Only 4 icon images loaded despite 5 files
```

### Particle System
```javascript
// Flyweight - Particle type
class ParticleType {
  constructor(color, sprite, physics) {
    this.color = color;
    this.sprite = sprite;
    this.physics = physics; // gravity, mass, etc.
  }

  render(x, y, velocity) {
    console.log(`Rendering ${this.color} particle at (${x}, ${y}) moving at ${velocity}`);
  }
}

// Flyweight Factory
class ParticleFactory {
  constructor() {
    this.types = new Map();
  }

  getParticleType(color, sprite, physics) {
    const key = `${color}_${sprite}`;

    if (!this.types.has(key)) {
      this.types.set(key, new ParticleType(color, sprite, physics));
    }

    return this.types.get(key);
  }
}

// Particle with unique state
class Particle {
  constructor(type, x, y, velocity) {
    this.type = type; // shared
    this.x = x;       // unique
    this.y = y;       // unique
    this.velocity = velocity; // unique
  }

  update(deltaTime) {
    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;
    this.velocity.y += this.type.physics.gravity * deltaTime;
  }

  render() {
    this.type.render(this.x, this.y, this.velocity);
  }
}

// Particle system
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.factory = new ParticleFactory();
  }

  emit(x, y, count, typeName) {
    const types = {
      fire: { color: 'orange', sprite: 'fire.png', physics: { gravity: -0.1 } },
      smoke: { color: 'gray', sprite: 'smoke.png', physics: { gravity: -0.05 } },
      spark: { color: 'yellow', sprite: 'spark.png', physics: { gravity: 0.2 } }
    };

    const config = types[typeName];
    const type = this.factory.getParticleType(config.color, config.sprite, config.physics);

    for (let i = 0; i < count; i++) {
      const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      };
      this.particles.push(new Particle(type, x, y, velocity));
    }
  }

  update(deltaTime) {
    this.particles.forEach(particle => particle.update(deltaTime));
    // Remove dead particles
    this.particles = this.particles.filter(p => p.y < 1000);
  }

  render() {
    this.particles.forEach(particle => particle.render());
  }
}

// Usage
const ps = new ParticleSystem();

// Emit 1000 particles but only 3 types
ps.emit(100, 100, 300, 'fire');
ps.emit(100, 100, 400, 'smoke');
ps.emit(100, 100, 300, 'spark');

console.log(`Total particles: ${ps.particles.length}`);
console.log(`Unique types: ${ps.factory.types.size}`);
```

## Pros

1. **Memory Efficiency**: Dramatically reduces memory usage
2. **Performance**: Fewer objects means better performance
3. **Scalability**: Can handle massive numbers of objects
4. **Sharing**: Reuses common data effectively

## Cons

1. **Complexity**: Adds complexity to codebase
2. **Runtime Costs**: Extra lookups in flyweight factory
3. **Extrinsic State**: Client must manage extrinsic state
4. **Thread Safety**: May need synchronization in multi-threaded environments

## When to Use

- ✅ Application uses large number of objects
- ✅ Storage costs are high due to quantity
- ✅ Most object state can be made extrinsic
- ✅ Many groups of objects can be replaced by fewer shared objects
- ✅ Application doesn't depend on object identity

## When to Avoid

- ❌ Few objects are created
- ❌ Objects don't share significant state
- ❌ Extrinsic state is expensive to compute
- ❌ Object identity is important

## Related Patterns

- **Composite**: Can use Flyweight for shared leaf nodes
- **State/Strategy**: Often implemented as Flyweights
- **Singleton**: Flyweight factory often implemented as Singleton

---

[← Back to Structural Patterns](../README.md#structural-patterns)
