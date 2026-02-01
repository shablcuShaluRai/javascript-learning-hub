# Bridge Pattern

## Intent
Decouple an abstraction from its implementation so that the two can vary independently. The Bridge pattern separates the abstraction and implementation into separate class hierarchies.

## Problem
You want to avoid a permanent binding between an abstraction and its implementation. When both the abstraction and implementation should be extensible through subclassing, you need a way to combine different abstractions with different implementations.

## Structure
```
Abstraction → Implementation Interface
    ↓              ↓            ↓
RefinedAbs   ConcreteImpl1  ConcreteImpl2
```

## Implementation

### Basic Bridge
```javascript
// Implementation interface
class DrawingAPI {
  drawCircle(x, y, radius) {
    throw new Error('drawCircle() must be implemented');
  }
}

// Concrete Implementations
class SVGDrawingAPI extends DrawingAPI {
  drawCircle(x, y, radius) {
    return `<circle cx="${x}" cy="${y}" r="${radius}" />`;
  }
}

class CanvasDrawingAPI extends DrawingAPI {
  drawCircle(x, y, radius) {
    return `ctx.arc(${x}, ${y}, ${radius}, 0, 2 * Math.PI)`;
  }
}

// Abstraction
class Shape {
  constructor(drawingAPI) {
    this.drawingAPI = drawingAPI;
  }

  draw() {
    throw new Error('draw() must be implemented');
  }
}

// Refined Abstractions
class Circle extends Shape {
  constructor(x, y, radius, drawingAPI) {
    super(drawingAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    return this.drawingAPI.drawCircle(this.x, this.y, this.radius);
  }
}

// Usage
const svgCircle = new Circle(10, 10, 5, new SVGDrawingAPI());
const canvasCircle = new Circle(10, 10, 5, new CanvasDrawingAPI());

console.log(svgCircle.draw());    // <circle cx="10" cy="10" r="5" />
console.log(canvasCircle.draw()); // ctx.arc(10, 10, 5, 0, 2 * Math.PI)
```

### Device and Remote Control
```javascript
// Implementation
class Device {
  isEnabled() {
    throw new Error('isEnabled() must be implemented');
  }

  enable() {
    throw new Error('enable() must be implemented');
  }

  disable() {
    throw new Error('disable() must be implemented');
  }

  getVolume() {
    throw new Error('getVolume() must be implemented');
  }

  setVolume(volume) {
    throw new Error('setVolume() must be implemented');
  }
}

class TV extends Device {
  constructor() {
    super();
    this.on = false;
    this.volume = 50;
  }

  isEnabled() {
    return this.on;
  }

  enable() {
    this.on = true;
    return 'TV is now ON';
  }

  disable() {
    this.on = false;
    return 'TV is now OFF';
  }

  getVolume() {
    return this.volume;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(100, volume));
    return `TV volume set to ${this.volume}`;
  }
}

class Radio extends Device {
  constructor() {
    super();
    this.on = false;
    this.volume = 30;
  }

  isEnabled() {
    return this.on;
  }

  enable() {
    this.on = true;
    return 'Radio is now ON';
  }

  disable() {
    this.on = false;
    return 'Radio is now OFF';
  }

  getVolume() {
    return this.volume;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(100, volume));
    return `Radio volume set to ${this.volume}`;
  }
}

// Abstraction
class RemoteControl {
  constructor(device) {
    this.device = device;
  }

  togglePower() {
    if (this.device.isEnabled()) {
      return this.device.disable();
    } else {
      return this.device.enable();
    }
  }

  volumeUp() {
    const current = this.device.getVolume();
    return this.device.setVolume(current + 10);
  }

  volumeDown() {
    const current = this.device.getVolume();
    return this.device.setVolume(current - 10);
  }
}

// Refined Abstraction
class AdvancedRemoteControl extends RemoteControl {
  mute() {
    return this.device.setVolume(0);
  }

  setCustomVolume(volume) {
    return this.device.setVolume(volume);
  }
}

// Usage
const tv = new TV();
const radio = new Radio();

const tvRemote = new RemoteControl(tv);
const radioRemote = new AdvancedRemoteControl(radio);

console.log(tvRemote.togglePower());  // TV is now ON
console.log(tvRemote.volumeUp());     // TV volume set to 60

console.log(radioRemote.togglePower()); // Radio is now ON
console.log(radioRemote.mute());        // Radio volume set to 0
```

### Message Sender Bridge
```javascript
// Implementation
class MessageSender {
  sendMessage(message, recipient) {
    throw new Error('sendMessage() must be implemented');
  }
}

class EmailSender extends MessageSender {
  sendMessage(message, recipient) {
    return `Email sent to ${recipient}: ${message}`;
  }
}

class SMSSender extends MessageSender {
  sendMessage(message, recipient) {
    return `SMS sent to ${recipient}: ${message}`;
  }
}

class PushNotificationSender extends MessageSender {
  sendMessage(message, recipient) {
    return `Push notification sent to ${recipient}: ${message}`;
  }
}

// Abstraction
class Message {
  constructor(sender) {
    this.sender = sender;
  }

  send(content, recipient) {
    throw new Error('send() must be implemented');
  }
}

class TextMessage extends Message {
  send(content, recipient) {
    return this.sender.sendMessage(content, recipient);
  }
}

class UrgentMessage extends Message {
  send(content, recipient) {
    const urgentContent = `[URGENT] ${content}`;
    return this.sender.sendMessage(urgentContent, recipient);
  }
}

class EncryptedMessage extends Message {
  send(content, recipient) {
    const encrypted = this.encrypt(content);
    return this.sender.sendMessage(encrypted, recipient);
  }

  encrypt(content) {
    // Simple encryption simulation
    return Buffer.from(content).toString('base64');
  }
}

// Usage
const emailSender = new EmailSender();
const smsSender = new SMSSender();

const regularEmail = new TextMessage(emailSender);
const urgentSMS = new UrgentMessage(smsSender);
const encryptedEmail = new EncryptedMessage(emailSender);

console.log(regularEmail.send('Hello', 'john@example.com'));
console.log(urgentSMS.send('Server is down!', '+1234567890'));
console.log(encryptedEmail.send('Secret message', 'jane@example.com'));
```

## Pros

1. **Decoupling**: Separates abstraction from implementation
2. **Flexibility**: Change abstraction and implementation independently
3. **Extensibility**: Add new abstractions or implementations easily
4. **Hide Implementation**: Client code only sees abstraction
5. **Runtime Binding**: Can switch implementations at runtime

## Cons

1. **Complexity**: Increases number of classes
2. **Indirection**: Extra layer makes code harder to understand
3. **Overhead**: May be overkill for simple scenarios

## When to Use

- ✅ Want to avoid permanent binding between abstraction and implementation
- ✅ Both abstraction and implementation should be extensible
- ✅ Changes in implementation shouldn't affect clients
- ✅ Want to share implementation among multiple objects
- ✅ Need to switch implementations at runtime

## When to Avoid

- ❌ Only one implementation exists
- ❌ Abstraction and implementation won't vary independently
- ❌ Simple hierarchy is sufficient

## Related Patterns

- **Adapter**: Changes interface of existing object; Bridge separates from the start
- **Abstract Factory**: Can create and configure bridges
- **Strategy**: Similar structure but different intent

---

[← Back to Structural Patterns](../README.md#structural-patterns)
