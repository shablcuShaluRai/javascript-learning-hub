# Chain of Responsibility Pattern

## Intent
Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.

## Problem
You want to give more than one object a chance to handle a request, and you don't want to hardcode which object handles it.

## Structure
```
Client → Handler1 → Handler2 → Handler3
         (chain of handlers)
```

## Implementation

### Basic Chain
```javascript
// Handler
class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// Concrete Handlers
class AuthenticationHandler extends Handler {
  handle(request) {
    if (!request.authenticated) {
      console.log('Authentication failed');
      return false;
    }
    console.log('Authenticated');
    return super.handle(request);
  }
}

class AuthorizationHandler extends Handler {
  handle(request) {
    if (!request.authorized) {
      console.log('Authorization failed');
      return false;
    }
    console.log('Authorized');
    return super.handle(request);
  }
}

class ValidationHandler extends Handler {
  handle(request) {
    if (!request.valid) {
      console.log('Validation failed');
      return false;
    }
    console.log('Valid request');
    return super.handle(request);
  }
}

// Usage
const auth = new AuthenticationHandler();
const authz = new AuthorizationHandler();
const validation = new ValidationHandler();

auth.setNext(authz).setNext(validation);

auth.handle({ authenticated: true, authorized: true, valid: true });
```

## Pros

1. **Decoupling**: Sender and receiver are decoupled
2. **Flexibility**: Add/remove handlers dynamically
3. **Single Responsibility**: Each handler has one job

## Cons

1. **No Guarantee**: Request might not be handled
2. **Debugging**: Hard to observe runtime characteristics

## When to Use

- ✅ More than one object may handle a request
- ✅ Set of handlers determined dynamically
- ✅ Request handling order matters

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
