# Abstract Factory Pattern

## Intent
Provide an interface for creating families of related or dependent objects without specifying their concrete classes. The Abstract Factory pattern allows you to produce families of related objects without specifying their concrete classes.

## Problem
You need to create sets of related objects that must be used together. For example, a UI toolkit might have different themes (light/dark), and each theme has its own buttons, inputs, and dialogs that must match.

## Structure
```
AbstractFactory
├── createProductA()
├── createProductB()
│
ConcreteFactory1           ConcreteFactory2
├── createProductA() → A1  ├── createProductA() → A2
└── createProductB() → B1  └── createProductB() → B2
```

## Implementation

### Basic Abstract Factory
```javascript
// Abstract Products
class Button {
  render() {
    throw new Error('render() must be implemented');
  }
}

class Checkbox {
  render() {
    throw new Error('render() must be implemented');
  }
}

// Concrete Products - Light Theme
class LightButton extends Button {
  render() {
    return '<button class="light-button">Click Me</button>';
  }
}

class LightCheckbox extends Checkbox {
  render() {
    return '<input type="checkbox" class="light-checkbox" />';
  }
}

// Concrete Products - Dark Theme
class DarkButton extends Button {
  render() {
    return '<button class="dark-button">Click Me</button>';
  }
}

class DarkCheckbox extends Checkbox {
  render() {
    return '<input type="checkbox" class="dark-checkbox" />';
  }
}

// Abstract Factory
class UIFactory {
  createButton() {
    throw new Error('createButton() must be implemented');
  }

  createCheckbox() {
    throw new Error('createCheckbox() must be implemented');
  }
}

// Concrete Factories
class LightThemeFactory extends UIFactory {
  createButton() {
    return new LightButton();
  }

  createCheckbox() {
    return new LightCheckbox();
  }
}

class DarkThemeFactory extends UIFactory {
  createButton() {
    return new DarkButton();
  }

  createCheckbox() {
    return new DarkCheckbox();
  }
}

// Client code
class Application {
  constructor(factory) {
    this.factory = factory;
  }

  renderUI() {
    const button = this.factory.createButton();
    const checkbox = this.factory.createCheckbox();

    return {
      button: button.render(),
      checkbox: checkbox.render()
    };
  }
}

// Usage
const lightFactory = new LightThemeFactory();
const darkFactory = new DarkThemeFactory();

const lightApp = new Application(lightFactory);
const darkApp = new Application(darkFactory);

console.log(lightApp.renderUI());
// { button: '<button class="light-button">Click Me</button>', ... }

console.log(darkApp.renderUI());
// { button: '<button class="dark-button">Click Me</button>', ... }
```

### Cross-Platform UI Factory
```javascript
// Abstract Products
class Window {
  render() {
    throw new Error('render() must be implemented');
  }
}

class Dialog {
  show(message) {
    throw new Error('show() must be implemented');
  }
}

class Menu {
  render() {
    throw new Error('render() must be implemented');
  }
}

// Windows Products
class WindowsWindow extends Window {
  render() {
    return '┌─────────────────────┐\n│  Windows Window     │\n└─────────────────────┘';
  }
}

class WindowsDialog extends Dialog {
  show(message) {
    return `[Windows Dialog]\n${message}\n[OK] [Cancel]`;
  }
}

class WindowsMenu extends Menu {
  render() {
    return '≡ Windows Menu';
  }
}

// macOS Products
class MacWindow extends Window {
  render() {
    return '╭─────────────────────╮\n│  ● ● ●  Mac Window │\n╰─────────────────────╯';
  }
}

class MacDialog extends Dialog {
  show(message) {
    return `┌─ Mac Dialog ─┐\n│ ${message}\n│ [Cancel] [OK]`;
  }
}

class MacMenu extends Menu {
  render() {
    return ' Mac Menu';
  }
}

// Linux Products
class LinuxWindow extends Window {
  render() {
    return '┏━━━━━━━━━━━━━━━━━━━━━┓\n┃  Linux Window       ┃\n┗━━━━━━━━━━━━━━━━━━━━━┛';
  }
}

class LinuxDialog extends Dialog {
  show(message) {
    return `╔═ Linux Dialog ═╗\n║ ${message}\n║ [OK] [Cancel]`;
  }
}

class LinuxMenu extends Menu {
  render() {
    return '☰ Linux Menu';
  }
}

// Abstract Factory
class OSFactory {
  createWindow() {
    throw new Error('createWindow() must be implemented');
  }

  createDialog() {
    throw new Error('createDialog() must be implemented');
  }

  createMenu() {
    throw new Error('createMenu() must be implemented');
  }
}

// Concrete Factories
class WindowsFactory extends OSFactory {
  createWindow() {
    return new WindowsWindow();
  }

  createDialog() {
    return new WindowsDialog();
  }

  createMenu() {
    return new WindowsMenu();
  }
}

class MacFactory extends OSFactory {
  createWindow() {
    return new MacWindow();
  }

  createDialog() {
    return new MacDialog();
  }

  createMenu() {
    return new MacMenu();
  }
}

class LinuxFactory extends OSFactory {
  createWindow() {
    return new LinuxWindow();
  }

  createDialog() {
    return new LinuxDialog();
  }

  createMenu() {
    return new LinuxMenu();
  }
}

// Factory selector
function getOSFactory() {
  const platform = process.platform;

  switch(platform) {
    case 'win32':
      return new WindowsFactory();
    case 'darwin':
      return new MacFactory();
    case 'linux':
      return new LinuxFactory();
    default:
      return new WindowsFactory();
  }
}

// Usage
const factory = getOSFactory();

const window = factory.createWindow();
const dialog = factory.createDialog();
const menu = factory.createMenu();

console.log(window.render());
console.log(dialog.show('Save changes?'));
console.log(menu.render());
```

### Database Connection Factory
```javascript
// Abstract Products
class Connection {
  connect() {
    throw new Error('connect() must be implemented');
  }
}

class Query {
  execute(sql) {
    throw new Error('execute() must be implemented');
  }
}

class Transaction {
  begin() {
    throw new Error('begin() must be implemented');
  }

  commit() {
    throw new Error('commit() must be implemented');
  }

  rollback() {
    throw new Error('rollback() must be implemented');
  }
}

// MySQL Products
class MySQLConnection extends Connection {
  connect() {
    return 'Connected to MySQL';
  }
}

class MySQLQuery extends Query {
  execute(sql) {
    return `MySQL: Executing ${sql}`;
  }
}

class MySQLTransaction extends Transaction {
  begin() {
    return 'MySQL: START TRANSACTION';
  }

  commit() {
    return 'MySQL: COMMIT';
  }

  rollback() {
    return 'MySQL: ROLLBACK';
  }
}

// PostgreSQL Products
class PostgreSQLConnection extends Connection {
  connect() {
    return 'Connected to PostgreSQL';
  }
}

class PostgreSQLQuery extends Query {
  execute(sql) {
    return `PostgreSQL: Executing ${sql}`;
  }
}

class PostgreSQLTransaction extends Transaction {
  begin() {
    return 'PostgreSQL: BEGIN';
  }

  commit() {
    return 'PostgreSQL: COMMIT';
  }

  rollback() {
    return 'PostgreSQL: ROLLBACK';
  }
}

// MongoDB Products
class MongoConnection extends Connection {
  connect() {
    return 'Connected to MongoDB';
  }
}

class MongoQuery extends Query {
  execute(query) {
    return `MongoDB: Executing ${JSON.stringify(query)}`;
  }
}

class MongoTransaction extends Transaction {
  begin() {
    return 'MongoDB: Starting session';
  }

  commit() {
    return 'MongoDB: Committing transaction';
  }

  rollback() {
    return 'MongoDB: Aborting transaction';
  }
}

// Abstract Factory
class DatabaseFactory {
  createConnection() {
    throw new Error('createConnection() must be implemented');
  }

  createQuery() {
    throw new Error('createQuery() must be implemented');
  }

  createTransaction() {
    throw new Error('createTransaction() must be implemented');
  }
}

// Concrete Factories
class MySQLFactory extends DatabaseFactory {
  createConnection() {
    return new MySQLConnection();
  }

  createQuery() {
    return new MySQLQuery();
  }

  createTransaction() {
    return new MySQLTransaction();
  }
}

class PostgreSQLFactory extends DatabaseFactory {
  createConnection() {
    return new PostgreSQLConnection();
  }

  createQuery() {
    return new PostgreSQLQuery();
  }

  createTransaction() {
    return new PostgreSQLTransaction();
  }
}

class MongoFactory extends DatabaseFactory {
  createConnection() {
    return new MongoConnection();
  }

  createQuery() {
    return new MongoQuery();
  }

  createTransaction() {
    return new MongoTransaction();
  }
}

// Database Manager
class DatabaseManager {
  constructor(factory) {
    this.connection = factory.createConnection();
    this.query = factory.createQuery();
    this.transaction = factory.createTransaction();
  }

  executeTransaction(operations) {
    console.log(this.connection.connect());
    console.log(this.transaction.begin());

    try {
      operations.forEach(op => {
        console.log(this.query.execute(op));
      });
      console.log(this.transaction.commit());
    } catch (error) {
      console.log(this.transaction.rollback());
      throw error;
    }
  }
}

// Usage
const mysqlDB = new DatabaseManager(new MySQLFactory());
mysqlDB.executeTransaction([
  'INSERT INTO users VALUES (1, "John")',
  'UPDATE accounts SET balance = 1000'
]);

console.log('\n---\n');

const mongoDB = new DatabaseManager(new MongoFactory());
mongoDB.executeTransaction([
  { collection: 'users', operation: 'insert', data: { name: 'John' } },
  { collection: 'accounts', operation: 'update', filter: { id: 1 } }
]);
```

### API Client Factory
```javascript
// Abstract Products
class HttpClient {
  request(url, options) {
    throw new Error('request() must be implemented');
  }
}

class AuthHandler {
  authenticate(credentials) {
    throw new Error('authenticate() must be implemented');
  }
}

class ErrorHandler {
  handle(error) {
    throw new Error('handle() must be implemented');
  }
}

// REST API Products
class RESTClient extends HttpClient {
  async request(url, options) {
    const method = options.method || 'GET';
    return `REST ${method} ${url}`;
  }
}

class RESTAuthHandler extends AuthHandler {
  authenticate(credentials) {
    return {
      type: 'Bearer',
      token: `rest_token_${credentials.username}`
    };
  }
}

class RESTErrorHandler extends ErrorHandler {
  handle(error) {
    return {
      status: error.status || 500,
      message: error.message,
      type: 'REST Error'
    };
  }
}

// GraphQL API Products
class GraphQLClient extends HttpClient {
  async request(url, options) {
    const query = options.query || '';
    return `GraphQL query to ${url}: ${query}`;
  }
}

class GraphQLAuthHandler extends AuthHandler {
  authenticate(credentials) {
    return {
      type: 'JWT',
      token: `graphql_token_${credentials.username}`
    };
  }
}

class GraphQLErrorHandler extends ErrorHandler {
  handle(error) {
    return {
      errors: [{ message: error.message, path: error.path }],
      type: 'GraphQL Error'
    };
  }
}

// SOAP API Products
class SOAPClient extends HttpClient {
  async request(url, options) {
    const action = options.action || '';
    return `SOAP ${action} to ${url}`;
  }
}

class SOAPAuthHandler extends AuthHandler {
  authenticate(credentials) {
    return {
      type: 'WS-Security',
      token: `soap_token_${credentials.username}`
    };
  }
}

class SOAPErrorHandler extends ErrorHandler {
  handle(error) {
    return {
      faultCode: error.code || 'Server',
      faultString: error.message,
      type: 'SOAP Fault'
    };
  }
}

// Abstract Factory
class APIFactory {
  createClient() {
    throw new Error('createClient() must be implemented');
  }

  createAuthHandler() {
    throw new Error('createAuthHandler() must be implemented');
  }

  createErrorHandler() {
    throw new Error('createErrorHandler() must be implemented');
  }
}

// Concrete Factories
class RESTFactory extends APIFactory {
  createClient() {
    return new RESTClient();
  }

  createAuthHandler() {
    return new RESTAuthHandler();
  }

  createErrorHandler() {
    return new RESTErrorHandler();
  }
}

class GraphQLFactory extends APIFactory {
  createClient() {
    return new GraphQLClient();
  }

  createAuthHandler() {
    return new GraphQLAuthHandler();
  }

  createErrorHandler() {
    return new GraphQLErrorHandler();
  }
}

class SOAPFactory extends APIFactory {
  createClient() {
    return new SOAPClient();
  }

  createAuthHandler() {
    return new SOAPAuthHandler();
  }

  createErrorHandler() {
    return new SOAPErrorHandler();
  }
}

// API Service
class APIService {
  constructor(factory) {
    this.client = factory.createClient();
    this.auth = factory.createAuthHandler();
    this.errorHandler = factory.createErrorHandler();
  }

  async makeRequest(url, options, credentials) {
    try {
      const authData = this.auth.authenticate(credentials);
      console.log('Auth:', authData);

      const response = await this.client.request(url, options);
      console.log('Response:', response);

      return response;
    } catch (error) {
      const handledError = this.errorHandler.handle(error);
      console.log('Error:', handledError);
      throw handledError;
    }
  }
}

// Usage
async function main() {
  const restAPI = new APIService(new RESTFactory());
  await restAPI.makeRequest('https://api.example.com/users', { method: 'GET' }, { username: 'john' });

  console.log('\n---\n');

  const graphqlAPI = new APIService(new GraphQLFactory());
  await graphqlAPI.makeRequest('https://api.example.com/graphql', { query: '{ users { name } }' }, { username: 'jane' });
}

main();
```

## Use Cases

1. **Cross-platform UI applications** - Different look and feel for each platform
2. **Multi-database applications** - Support multiple database systems
3. **Theme systems** - Light/dark themes with matching components
4. **Multi-cloud deployments** - AWS, Azure, GCP specific implementations
5. **API integrations** - REST, GraphQL, SOAP clients
6. **Game development** - Different rendering engines or platforms

## Pros

1. **Consistency**: Ensures related objects work together
2. **Isolation**: Separates product creation from usage
3. **Flexibility**: Easy to switch between families of products
4. **Single Responsibility**: Product creation logic is centralized
5. **Open/Closed**: Easy to add new product families
6. **Type Safety**: Products from same family are guaranteed compatible

## Cons

1. **Complexity**: Many classes and interfaces to manage
2. **Rigidity**: Difficult to add new products to existing families
3. **Overhead**: May be excessive for simple scenarios
4. **Verbosity**: Requires more code than simpler patterns

## When to Use

- ✅ Need to work with families of related products
- ✅ System should be independent of product creation
- ✅ Products must be used together for consistency
- ✅ Supporting multiple platforms or themes
- ✅ Product families may change at runtime

## When to Avoid

- ❌ Only one product family exists
- ❌ Products don't need to be used together
- ❌ Product types change frequently
- ❌ Simple object creation is sufficient

## Alternatives

1. **Factory Method**: For single products instead of families
2. **Builder**: For complex object construction
3. **Prototype**: For cloning product families
4. **Dependency Injection**: For managing object creation externally

## Related Patterns

- **Factory Method**: Often used to implement creation methods
- **Singleton**: Factories are often Singletons
- **Prototype**: Can be used instead of Abstract Factory
- **Facade**: Can use Abstract Factory to create complex subsystems

## Best Practices

1. Use interfaces/abstract classes to define product contracts
2. Make factories stateless when possible
3. Consider factory registration for extensibility
4. Use dependency injection to provide factories
5. Document which products must be used together
6. Consider using enums or constants for factory selection
7. Validate that products from the same family are compatible

## Modern JavaScript Considerations

- Use ES6 classes with `extends` for clear hierarchies
- Leverage dependency injection frameworks
- Consider using TypeScript for better type safety
- Use Symbol for private product registries
- Consider factory composition over deep inheritance
- Module systems can help organize product families

---

[← Back to Creational Patterns](../README.md#creational-patterns)
