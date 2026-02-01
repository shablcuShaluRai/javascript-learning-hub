# Facade Pattern

## Intent
Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.

## Problem
You have a complex subsystem with many classes and interfaces. You want to provide a simple interface for common tasks while still allowing access to the subsystem for advanced users.

## Structure
```
Facade → Subsystem Classes
         ├── ClassA
         ├── ClassB
         └── ClassC
```

## Implementation

### Basic Facade
```javascript
// Complex subsystem classes
class CPU {
  freeze() {
    console.log('CPU: Freezing...');
  }

  jump(position) {
    console.log(`CPU: Jumping to ${position}`);
  }

  execute() {
    console.log('CPU: Executing...');
  }
}

class Memory {
  load(position, data) {
    console.log(`Memory: Loading data at ${position}`);
  }
}

class HardDrive {
  read(lba, size) {
    console.log(`HardDrive: Reading ${size} bytes from ${lba}`);
    return 'boot data';
  }
}

// Facade
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    console.log('Computer starting...');
    this.cpu.freeze();
    const bootData = this.hardDrive.read('0x00', 1024);
    this.memory.load('0x00', bootData);
    this.cpu.jump('0x00');
    this.cpu.execute();
    console.log('Computer started!\\n');
  }
}

// Usage
const computer = new ComputerFacade();
computer.start();
```

### Home Theater Facade
```javascript
class Amplifier {
  on() {
    console.log('Amplifier on');
  }

  setVolume(level) {
    console.log(`Volume set to ${level}`);
  }

  off() {
    console.log('Amplifier off');
  }
}

class DVDPlayer {
  on() {
    console.log('DVD Player on');
  }

  play(movie) {
    console.log(`Playing "${movie}"`);
  }

  stop() {
    console.log('DVD stopped');
  }

  off() {
    console.log('DVD Player off');
  }
}

class Projector {
  on() {
    console.log('Projector on');
  }

  wideScreenMode() {
    console.log('Projector in widescreen mode');
  }

  off() {
    console.log('Projector off');
  }
}

class Lights {
  dim(level) {
    console.log(`Lights dimmed to ${level}%`);
  }

  on() {
    console.log('Lights on');
  }
}

// Facade
class HomeTheaterFacade {
  constructor() {
    this.amplifier = new Amplifier();
    this.dvdPlayer = new DVDPlayer();
    this.projector = new Projector();
    this.lights = new Lights();
  }

  watchMovie(movie) {
    console.log('Get ready to watch a movie...\\n');
    this.lights.dim(10);
    this.projector.on();
    this.projector.wideScreenMode();
    this.amplifier.on();
    this.amplifier.setVolume(5);
    this.dvdPlayer.on();
    this.dvdPlayer.play(movie);
    console.log('\\nEnjoy your movie!\\n');
  }

  endMovie() {
    console.log('Shutting down movie theater...\\n');
    this.dvdPlayer.stop();
    this.dvdPlayer.off();
    this.amplifier.off();
    this.projector.off();
    this.lights.on();
    console.log('\\nTheater shut down.\\n');
  }
}

// Usage
const homeTheater = new HomeTheaterFacade();
homeTheater.watchMovie('Inception');
homeTheater.endMovie();
```

### API Facade
```javascript
// Complex subsystem
class HTTPClient {
  async request(url, options) {
    console.log(`HTTP ${options.method} ${url}`);
    return { status: 200, data: {} };
  }
}

class AuthService {
  getToken() {
    return 'bearer_token_123';
  }
}

class Logger {
  log(message) {
    console.log(`[API] ${message}`);
  }
}

class ErrorHandler {
  handle(error) {
    console.error(`[Error] ${error.message}`);
    throw error;
  }
}

// Facade
class APIFacade {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.http = new HTTPClient();
    this.auth = new AuthService();
    this.logger = new Logger();
    this.errorHandler = new ErrorHandler();
  }

  async get(endpoint) {
    try {
      this.logger.log(`GET ${endpoint}`);
      const url = `${this.baseURL}${endpoint}`;
      const token = this.auth.getToken();

      const response = await this.http.request(url, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });

      return response.data;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async post(endpoint, data) {
    try {
      this.logger.log(`POST ${endpoint}`);
      const url = `${this.baseURL}${endpoint}`;
      const token = this.auth.getToken();

      const response = await this.http.request(url, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      return response.data;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}

// Usage
const api = new APIFacade('https://api.example.com');
api.get('/users');
api.post('/users', { name: 'John', email: 'john@example.com' });
```

### Database Facade
```javascript
// Complex database operations
class Connection {
  connect(connectionString) {
    console.log(`Connecting to ${connectionString}`);
  }

  disconnect() {
    console.log('Disconnecting...');
  }
}

class QueryBuilder {
  select(table, columns) {
    return `SELECT ${columns.join(', ')} FROM ${table}`;
  }

  insert(table, data) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map(v => `'${v}'`).join(', ');
    return `INSERT INTO ${table} (${columns}) VALUES (${values})`;
  }

  update(table, data, where) {
    const sets = Object.entries(data).map(([k, v]) => `${k} = '${v}'`).join(', ');
    return `UPDATE ${table} SET ${sets} WHERE ${where}`;
  }
}

class QueryExecutor {
  execute(query) {
    console.log(`Executing: ${query}`);
    return { rows: [], affectedRows: 0 };
  }
}

// Facade
class DatabaseFacade {
  constructor(connectionString) {
    this.connection = new Connection();
    this.builder = new QueryBuilder();
    this.executor = new QueryExecutor();
    this.connectionString = connectionString;
  }

  connect() {
    this.connection.connect(this.connectionString);
  }

  disconnect() {
    this.connection.disconnect();
  }

  findAll(table, columns = ['*']) {
    const query = this.builder.select(table, columns);
    return this.executor.execute(query);
  }

  findById(table, id, columns = ['*']) {
    const query = this.builder.select(table, columns) + ` WHERE id = ${id}`;
    return this.executor.execute(query);
  }

  create(table, data) {
    const query = this.builder.insert(table, data);
    return this.executor.execute(query);
  }

  update(table, id, data) {
    const query = this.builder.update(table, data, `id = ${id}`);
    return this.executor.execute(query);
  }
}

// Usage
const db = new DatabaseFacade('postgresql://localhost:5432/mydb');
db.connect();

db.findAll('users', ['id', 'name', 'email']);
db.findById('users', 1);
db.create('users', { name: 'John', email: 'john@example.com' });
db.update('users', 1, { name: 'Jane' });

db.disconnect();
```

## Pros

1. **Simplification**: Provides simple interface to complex subsystem
2. **Decoupling**: Isolates clients from subsystem components
3. **Layering**: Helps structure system into layers
4. **Flexibility**: Can still access subsystem directly if needed

## Cons

1. **God Object**: Facade can become too large
2. **Limited Functionality**: May not expose all subsystem features
3. **Indirection**: Adds another layer

## When to Use

- ✅ Simplify access to complex subsystem
- ✅ Layer your system
- ✅ Many dependencies between clients and implementation classes
- ✅ Want to provide simple default view with advanced options available

## When to Avoid

- ❌ Subsystem is already simple
- ❌ Need full access to all subsystem features
- ❌ Facade would just pass through calls

---

[← Back to Structural Patterns](../README.md#structural-patterns)
