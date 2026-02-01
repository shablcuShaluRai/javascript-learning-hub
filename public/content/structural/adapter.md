# Adapter Pattern

## Intent
Convert the interface of a class into another interface clients expect. The Adapter pattern lets classes work together that couldn't otherwise because of incompatible interfaces.

## Problem
You want to use an existing class, but its interface doesn't match the one you need. Or you want to create a reusable class that cooperates with unrelated classes with incompatible interfaces.

## Structure
```
Client → Target Interface
         ↑
         Adapter → Adaptee
```

## Implementation

### Class Adapter
```javascript
// Old interface (Adaptee)
class OldPrinter {
  printDocument(text) {
    console.log(`[Old Printer] ${text}`);
  }
}

// New interface (Target)
class ModernPrinter {
  print(document) {
    throw new Error('print() must be implemented');
  }
}

// Adapter
class PrinterAdapter extends ModernPrinter {
  constructor() {
    super();
    this.oldPrinter = new OldPrinter();
  }

  print(document) {
    // Convert new interface to old interface
    this.oldPrinter.printDocument(document.content);
  }
}

// Usage
const document = { content: 'Hello World', format: 'PDF' };
const printer = new PrinterAdapter();
printer.print(document); // [Old Printer] Hello World
```

### Object Adapter
```javascript
// Third-party library with incompatible interface
class SpotifyAPI {
  playTrack(trackId) {
    return `Playing Spotify track: ${trackId}`;
  }

  pauseTrack() {
    return 'Pausing Spotify';
  }
}

class YouTubeMusicAPI {
  startVideo(videoId) {
    return `Playing YouTube video: ${videoId}`;
  }

  stopVideo() {
    return 'Stopping YouTube';
  }
}

// Target interface our app expects
class MusicPlayer {
  play(songId) {
    throw new Error('play() must be implemented');
  }

  pause() {
    throw new Error('pause() must be implemented');
  }
}

// Adapters
class SpotifyAdapter extends MusicPlayer {
  constructor(spotifyAPI) {
    super();
    this.spotify = spotifyAPI;
  }

  play(songId) {
    return this.spotify.playTrack(songId);
  }

  pause() {
    return this.spotify.pauseTrack();
  }
}

class YouTubeMusicAdapter extends MusicPlayer {
  constructor(youtubeAPI) {
    super();
    this.youtube = youtubeAPI;
  }

  play(songId) {
    return this.youtube.startVideo(songId);
  }

  pause() {
    return this.youtube.stopVideo();
  }
}

// Usage
const spotifyPlayer = new SpotifyAdapter(new SpotifyAPI());
const youtubePlayer = new YouTubeMusicAdapter(new YouTubeMusicAPI());

console.log(spotifyPlayer.play('track123')); // Playing Spotify track: track123
console.log(youtubePlayer.play('video456')); // Playing YouTube video: video456
```

### API Adapter
```javascript
// Legacy API format
class LegacyUserAPI {
  getUserData(userId) {
    return {
      user_id: userId,
      user_name: 'John Doe',
      user_email: 'john@example.com',
      created_date: '2020-01-15'
    };
  }
}

// Modern API format expected by the app
class UserService {
  getUser(id) {
    throw new Error('getUser() must be implemented');
  }
}

// Adapter to convert legacy format to modern format
class LegacyUserAdapter extends UserService {
  constructor(legacyAPI) {
    super();
    this.legacyAPI = legacyAPI;
  }

  getUser(id) {
    const legacyData = this.legacyAPI.getUserData(id);

    // Transform to modern format
    return {
      id: legacyData.user_id,
      name: legacyData.user_name,
      email: legacyData.user_email,
      createdAt: new Date(legacyData.created_date)
    };
  }
}

// Usage
const legacyAPI = new LegacyUserAPI();
const userService = new LegacyUserAdapter(legacyAPI);
const user = userService.getUser(1);

console.log(user);
// { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: Date }
```

### Payment Gateway Adapter
```javascript
// Different payment provider interfaces
class PayPalSDK {
  makePayment(amount, email) {
    return {
      success: true,
      transactionId: `PP-${Date.now()}`,
      message: `Paid $${amount} via PayPal to ${email}`
    };
  }
}

class StripeSDK {
  charge(cents, token) {
    return {
      id: `ch_${Date.now()}`,
      status: 'succeeded',
      amount: cents
    };
  }
}

class CryptoPaySDK {
  sendPayment(wallet, amountBTC) {
    return {
      txHash: `0x${Math.random().toString(16).substr(2, 8)}`,
      confirmed: true,
      btc: amountBTC
    };
  }
}

// Unified interface
class PaymentProcessor {
  process(amount, details) {
    throw new Error('process() must be implemented');
  }
}

// Adapters
class PayPalAdapter extends PaymentProcessor {
  constructor() {
    super();
    this.paypal = new PayPalSDK();
  }

  process(amount, details) {
    const result = this.paypal.makePayment(amount, details.email);
    return {
      success: result.success,
      transactionId: result.transactionId,
      provider: 'PayPal'
    };
  }
}

class StripeAdapter extends PaymentProcessor {
  constructor() {
    super();
    this.stripe = new StripeSDK();
  }

  process(amount, details) {
    const cents = Math.round(amount * 100);
    const result = this.stripe.charge(cents, details.token);
    return {
      success: result.status === 'succeeded',
      transactionId: result.id,
      provider: 'Stripe'
    };
  }
}

class CryptoAdapter extends PaymentProcessor {
  constructor() {
    super();
    this.crypto = new CryptoPaySDK();
  }

  process(amount, details) {
    // Convert USD to BTC (simplified)
    const btc = amount / 50000;
    const result = this.crypto.sendPayment(details.wallet, btc);
    return {
      success: result.confirmed,
      transactionId: result.txHash,
      provider: 'Crypto'
    };
  }
}

// Usage
function checkout(amount, method, details) {
  let processor;

  switch(method) {
    case 'paypal':
      processor = new PayPalAdapter();
      break;
    case 'stripe':
      processor = new StripeAdapter();
      break;
    case 'crypto':
      processor = new CryptoAdapter();
      break;
  }

  return processor.process(amount, details);
}

console.log(checkout(100, 'paypal', { email: 'user@example.com' }));
console.log(checkout(100, 'stripe', { token: 'tok_visa' }));
console.log(checkout(100, 'crypto', { wallet: '0x123abc' }));
```

### Data Format Adapter
```javascript
// XML Data Source
class XMLDataSource {
  getXMLData() {
    return `
      <users>
        <user>
          <id>1</id>
          <name>John</name>
        </user>
      </users>
    `;
  }
}

// CSV Data Source
class CSVDataSource {
  getCSVData() {
    return 'id,name\n1,John\n2,Jane';
  }
}

// Our app expects JSON
class DataAdapter {
  constructor(source, type) {
    this.source = source;
    this.type = type;
  }

  getData() {
    switch(this.type) {
      case 'xml':
        return this.convertXMLtoJSON(this.source.getXMLData());
      case 'csv':
        return this.convertCSVtoJSON(this.source.getCSVData());
      default:
        throw new Error('Unsupported format');
    }
  }

  convertXMLtoJSON(xml) {
    // Simplified conversion
    return [{ id: 1, name: 'John' }];
  }

  convertCSVtoJSON(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
    });
  }
}

// Usage
const xmlSource = new XMLDataSource();
const csvSource = new CSVDataSource();

const xmlAdapter = new DataAdapter(xmlSource, 'xml');
const csvAdapter = new DataAdapter(csvSource, 'csv');

console.log(xmlAdapter.getData()); // [{ id: 1, name: 'John' }]
console.log(csvAdapter.getData()); // [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }]
```

### Storage Adapter
```javascript
// Different storage mechanisms
class LocalStorage {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}

class CookieStorage {
  save(key, value) {
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}`;
  }

  load(key) {
    const matches = document.cookie.match(new RegExp(`${key}=([^;]+)`));
    return matches ? JSON.parse(decodeURIComponent(matches[1])) : null;
  }
}

class IndexedDBStorage {
  async save(key, value) {
    // Simplified IndexedDB save
    console.log(`Saving to IndexedDB: ${key}`, value);
  }

  async load(key) {
    // Simplified IndexedDB load
    console.log(`Loading from IndexedDB: ${key}`);
    return null;
  }
}

// Unified storage interface
class StorageAdapter {
  constructor(storage) {
    this.storage = storage;
  }

  async set(key, value) {
    return await this.storage.save(key, value);
  }

  async get(key) {
    return await this.storage.load(key);
  }
}

// Usage (browser environment)
// const localStorage = new StorageAdapter(new LocalStorage());
// const cookieStorage = new StorageAdapter(new CookieStorage());
// const idbStorage = new StorageAdapter(new IndexedDBStorage());

// localStorage.set('user', { name: 'John' });
// const user = localStorage.get('user');
```

## Use Cases

1. **Legacy system integration** - Adapt old code to new interfaces
2. **Third-party library integration** - Make external APIs fit your interface
3. **Data format conversion** - XML to JSON, CSV to objects
4. **Payment gateway integration** - Unified interface for multiple providers
5. **Database abstraction** - Single interface for different databases
6. **API versioning** - Adapt old API versions to new ones

## Pros

1. **Single Responsibility**: Separates interface conversion from business logic
2. **Open/Closed**: Add new adapters without modifying existing code
3. **Flexibility**: Easy to switch between different implementations
4. **Reusability**: Adapter can be reused across the application
5. **Clean Code**: Client code doesn't know about adaptation

## Cons

1. **Complexity**: Increases number of classes
2. **Indirection**: Adds another layer between client and adaptee
3. **Performance**: Small overhead from adaptation

## When to Use

- ✅ Want to use existing class with incompatible interface
- ✅ Need to create reusable class cooperating with unrelated classes
- ✅ Integrating third-party libraries
- ✅ Working with legacy code
- ✅ Multiple data format conversions
- ✅ Platform-specific implementations

## When to Avoid

- ❌ Can modify the source class directly
- ❌ Interface differences are minimal
- ❌ Only used in one place
- ❌ Performance overhead is unacceptable

## Alternatives

1. **Facade**: Simplifies interface rather than adapting it
2. **Bridge**: Separates abstraction from implementation upfront
3. **Decorator**: Adds functionality rather than adapting
4. **Proxy**: Controls access rather than adapting interface

## Related Patterns

- **Bridge**: Similar structure but different intent
- **Decorator**: Similar structure but adds responsibilities
- **Facade**: Provides simpler interface to subsystem
- **Proxy**: Provides same interface with additional control

## Best Practices

1. Keep adapters simple and focused on conversion
2. Use composition over inheritance when possible
3. Document what interface is being adapted and why
4. Consider creating adapter factories for multiple adaptees
5. Make adapters stateless when possible
6. Test adapters thoroughly for edge cases
7. Consider using TypeScript for better type safety

## Modern JavaScript Considerations

- Use ES6 classes for cleaner adapter implementation
- Leverage async/await for asynchronous adapters
- Use Proxy object for dynamic adaptation
- Consider using wrapper functions for simple adaptations
- TypeScript interfaces make adapter contracts explicit

---

[← Back to Structural Patterns](../README.md#structural-patterns)
