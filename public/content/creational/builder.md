# Builder Pattern

## Intent
Separate the construction of a complex object from its representation, allowing the same construction process to create different representations. The Builder pattern lets you construct complex objects step by step.

## Problem
You need to create complex objects with many optional parameters or configuration steps. Using constructors with many parameters becomes unwieldy and error-prone, especially when many parameters are optional.

## Structure
```
Director
└── construct() → uses Builder

Builder Interface
├── buildPartA()
├── buildPartB()
├── buildPartC()
└── getResult()

ConcreteBuilder
└── implements all build methods
```

## Implementation

### Basic Builder
```javascript
class Car {
  constructor() {
    this.make = '';
    this.model = '';
    this.year = 0;
    this.color = '';
    this.engine = '';
    this.transmission = '';
    this.features = [];
  }

  display() {
    return `${this.year} ${this.color} ${this.make} ${this.model} - ${this.engine}, ${this.transmission}`;
  }
}

class CarBuilder {
  constructor() {
    this.car = new Car();
  }

  setMake(make) {
    this.car.make = make;
    return this; // Enable method chaining
  }

  setModel(model) {
    this.car.model = model;
    return this;
  }

  setYear(year) {
    this.car.year = year;
    return this;
  }

  setColor(color) {
    this.car.color = color;
    return this;
  }

  setEngine(engine) {
    this.car.engine = engine;
    return this;
  }

  setTransmission(transmission) {
    this.car.transmission = transmission;
    return this;
  }

  addFeature(feature) {
    this.car.features.push(feature);
    return this;
  }

  build() {
    return this.car;
  }
}

// Usage
const car = new CarBuilder()
  .setMake('Tesla')
  .setModel('Model S')
  .setYear(2024)
  .setColor('Red')
  .setEngine('Electric')
  .setTransmission('Automatic')
  .addFeature('Autopilot')
  .addFeature('Premium Audio')
  .build();

console.log(car.display());
// 2024 Red Tesla Model S - Electric, Automatic
```

### Builder with Validation
```javascript
class User {
  constructor(builder) {
    this.username = builder.username;
    this.email = builder.email;
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;
    this.age = builder.age;
    this.address = builder.address;
    this.phone = builder.phone;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class UserBuilder {
  constructor(username, email) {
    // Required parameters
    this.username = username;
    this.email = email;

    // Optional parameters
    this.firstName = '';
    this.lastName = '';
    this.age = 0;
    this.address = null;
    this.phone = '';
  }

  setFirstName(firstName) {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  setAge(age) {
    if (age < 0 || age > 150) {
      throw new Error('Invalid age');
    }
    this.age = age;
    return this;
  }

  setAddress(street, city, state, zip) {
    this.address = { street, city, state, zip };
    return this;
  }

  setPhone(phone) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error('Invalid phone format. Use XXX-XXX-XXXX');
    }
    this.phone = phone;
    return this;
  }

  build() {
    // Final validation
    if (!this.username || !this.email) {
      throw new Error('Username and email are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error('Invalid email format');
    }

    return new User(this);
  }
}

// Usage
const user = new UserBuilder('johndoe', 'john@example.com')
  .setFirstName('John')
  .setLastName('Doe')
  .setAge(30)
  .setAddress('123 Main St', 'New York', 'NY', '10001')
  .setPhone('555-123-4567')
  .build();

console.log(user.getFullName()); // John Doe
console.log(user.email); // john@example.com
```

### Query Builder
```javascript
class SQLQuery {
  constructor(builder) {
    this.table = builder.table;
    this.columns = builder.columns;
    this.conditions = builder.conditions;
    this.orderBy = builder.orderBy;
    this.limit = builder.limit;
    this.joins = builder.joins;
  }

  toString() {
    let query = `SELECT ${this.columns.join(', ')} FROM ${this.table}`;

    if (this.joins.length > 0) {
      query += ' ' + this.joins.join(' ');
    }

    if (this.conditions.length > 0) {
      query += ' WHERE ' + this.conditions.join(' AND ');
    }

    if (this.orderBy) {
      query += ` ORDER BY ${this.orderBy}`;
    }

    if (this.limit) {
      query += ` LIMIT ${this.limit}`;
    }

    return query;
  }
}

class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.columns = ['*'];
    this.conditions = [];
    this.orderBy = null;
    this.limit = null;
    this.joins = [];
  }

  select(...columns) {
    this.columns = columns;
    return this;
  }

  where(column, operator, value) {
    const condition = typeof value === 'string'
      ? `${column} ${operator} '${value}'`
      : `${column} ${operator} ${value}`;
    this.conditions.push(condition);
    return this;
  }

  andWhere(column, operator, value) {
    return this.where(column, operator, value);
  }

  orWhere(column, operator, value) {
    if (this.conditions.length > 0) {
      this.conditions[this.conditions.length - 1] += ' OR';
    }
    return this.where(column, operator, value);
  }

  join(table, condition) {
    this.joins.push(`JOIN ${table} ON ${condition}`);
    return this;
  }

  leftJoin(table, condition) {
    this.joins.push(`LEFT JOIN ${table} ON ${condition}`);
    return this;
  }

  orderByAsc(column) {
    this.orderBy = `${column} ASC`;
    return this;
  }

  orderByDesc(column) {
    this.orderBy = `${column} DESC`;
    return this;
  }

  limitTo(count) {
    this.limit = count;
    return this;
  }

  build() {
    return new SQLQuery(this);
  }

  execute() {
    const query = this.build();
    // Simulate query execution
    console.log('Executing:', query.toString());
    return query;
  }
}

// Usage
const query = new QueryBuilder('users')
  .select('id', 'name', 'email')
  .join('profiles', 'users.id = profiles.user_id')
  .where('age', '>', 18)
  .andWhere('status', '=', 'active')
  .orderByDesc('created_at')
  .limitTo(10)
  .build();

console.log(query.toString());
// SELECT id, name, email FROM users JOIN profiles ON users.id = profiles.user_id WHERE age > 18 AND status = 'active' ORDER BY created_at DESC LIMIT 10
```

### HTTP Request Builder
```javascript
class HttpRequest {
  constructor(builder) {
    this.url = builder.url;
    this.method = builder.method;
    this.headers = builder.headers;
    this.params = builder.params;
    this.body = builder.body;
    this.timeout = builder.timeout;
  }

  async execute() {
    const url = new URL(this.url);

    // Add query parameters
    Object.entries(this.params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const options = {
      method: this.method,
      headers: this.headers
    };

    if (this.body) {
      options.body = JSON.stringify(this.body);
    }

    console.log(`${this.method} ${url.toString()}`);
    console.log('Headers:', this.headers);

    // Simulate fetch
    return { status: 200, data: 'Mock response' };
  }
}

class HttpRequestBuilder {
  constructor(url) {
    this.url = url;
    this.method = 'GET';
    this.headers = {};
    this.params = {};
    this.body = null;
    this.timeout = 30000;
  }

  get() {
    this.method = 'GET';
    return this;
  }

  post() {
    this.method = 'POST';
    return this;
  }

  put() {
    this.method = 'PUT';
    return this;
  }

  delete() {
    this.method = 'DELETE';
    return this;
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  setHeaders(headers) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  addParam(key, value) {
    this.params[key] = value;
    return this;
  }

  setParams(params) {
    this.params = { ...this.params, ...params };
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  setTimeout(timeout) {
    this.timeout = timeout;
    return this;
  }

  withAuth(token) {
    return this.setHeader('Authorization', `Bearer ${token}`);
  }

  asJson() {
    return this.setHeader('Content-Type', 'application/json');
  }

  build() {
    return new HttpRequest(this);
  }

  async send() {
    const request = this.build();
    return await request.execute();
  }
}

// Usage
async function makeRequest() {
  const response = await new HttpRequestBuilder('https://api.example.com/users')
    .get()
    .addParam('page', 1)
    .addParam('limit', 10)
    .withAuth('my-secret-token')
    .asJson()
    .setTimeout(5000)
    .send();

  console.log(response);
}

makeRequest();
```

### Form Builder
```javascript
class Form {
  constructor(builder) {
    this.fields = builder.fields;
    this.validations = builder.validations;
    this.submitHandler = builder.submitHandler;
  }

  render() {
    return this.fields.map(field => {
      switch(field.type) {
        case 'text':
        case 'email':
        case 'password':
          return `<input type="${field.type}" name="${field.name}" placeholder="${field.placeholder || ''}" />`;
        case 'textarea':
          return `<textarea name="${field.name}" placeholder="${field.placeholder || ''}"></textarea>`;
        case 'select':
          const options = field.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
          return `<select name="${field.name}">${options}</select>`;
        default:
          return '';
      }
    }).join('\n');
  }

  validate(data) {
    const errors = {};

    this.validations.forEach(validation => {
      const value = data[validation.field];
      const result = validation.rule(value);

      if (!result.valid) {
        errors[validation.field] = result.message;
      }
    });

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
}

class FormBuilder {
  constructor() {
    this.fields = [];
    this.validations = [];
    this.submitHandler = null;
  }

  addTextField(name, placeholder = '') {
    this.fields.push({ type: 'text', name, placeholder });
    return this;
  }

  addEmailField(name, placeholder = '') {
    this.fields.push({ type: 'email', name, placeholder });
    return this;
  }

  addPasswordField(name, placeholder = '') {
    this.fields.push({ type: 'password', name, placeholder });
    return this;
  }

  addTextarea(name, placeholder = '') {
    this.fields.push({ type: 'textarea', name, placeholder });
    return this;
  }

  addSelect(name, options) {
    this.fields.push({ type: 'select', name, options });
    return this;
  }

  addValidation(field, rule, message) {
    this.validations.push({
      field,
      rule: (value) => ({
        valid: rule(value),
        message
      })
    });
    return this;
  }

  required(field, message = 'This field is required') {
    return this.addValidation(field, value => !!value, message);
  }

  email(field, message = 'Invalid email address') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.addValidation(field, value => emailRegex.test(value), message);
  }

  minLength(field, length, message = `Minimum length is ${length}`) {
    return this.addValidation(field, value => value && value.length >= length, message);
  }

  onSubmit(handler) {
    this.submitHandler = handler;
    return this;
  }

  build() {
    return new Form(this);
  }
}

// Usage
const loginForm = new FormBuilder()
  .addEmailField('email', 'Enter your email')
  .addPasswordField('password', 'Enter your password')
  .required('email')
  .email('email')
  .required('password')
  .minLength('password', 8)
  .onSubmit((data) => {
    console.log('Form submitted:', data);
  })
  .build();

console.log(loginForm.render());

const validationResult = loginForm.validate({
  email: 'test@example.com',
  password: 'password123'
});

console.log(validationResult); // { valid: true, errors: {} }
```

## Use Cases

1. **Complex object construction** - Objects with many optional parameters
2. **Query builders** - SQL, NoSQL, or API query construction
3. **HTTP request builders** - Building API requests fluently
4. **Form builders** - Dynamic form generation
5. **Document builders** - PDF, HTML, or report generation
6. **Configuration builders** - Application or component configuration

## Pros

1. **Fluent Interface**: Readable, chainable method calls
2. **Flexibility**: Easy to create different representations
3. **Immutability**: Can build immutable objects
4. **Validation**: Centralized validation before construction
5. **Encapsulation**: Hides complex construction logic
6. **Default Values**: Easy to provide sensible defaults

## Cons

1. **Verbosity**: Requires additional builder class
2. **Complexity**: Overkill for simple objects
3. **Memory**: Additional objects during construction
4. **Duplication**: Builder and product may have similar code

## When to Use

- ✅ Objects with many optional parameters
- ✅ Step-by-step construction process
- ✅ Need different representations of an object
- ✅ Construction requires validation
- ✅ Want immutable objects
- ✅ Telescoping constructor anti-pattern

## When to Avoid

- ❌ Simple objects with few parameters
- ❌ Object construction is straightforward
- ❌ No optional parameters or variations
- ❌ Performance is critical and overhead matters

## Alternatives

1. **Object Literal**: For simple configuration objects
2. **Factory Pattern**: For simple object creation
3. **Constructor Overloading**: For limited variations
4. **Fluent API**: Without full builder pattern
5. **Options Object**: Single object parameter with defaults

## Related Patterns

- **Abstract Factory**: Can use Builder to create products
- **Composite**: Builder can build composite structures
- **Prototype**: Alternative for creating complex objects
- **Template Method**: Director can use Template Method

## Best Practices

1. Return `this` from builder methods for chaining
2. Validate required parameters in build()
3. Make built objects immutable
4. Provide sensible defaults for optional parameters
5. Use descriptive method names
6. Consider fluent interface for readability
7. Separate builder from product class
8. Document required vs optional parameters

## Modern JavaScript Considerations

- Use ES6 classes for clean syntax
- Leverage default parameters where appropriate
- Consider using Proxy for dynamic builders
- Use TypeScript for better type safety
- Private fields (#) for internal builder state
- Object spread for combining configurations
- Method chaining with arrow functions

---

[← Back to Creational Patterns](../README.md#creational-patterns)
