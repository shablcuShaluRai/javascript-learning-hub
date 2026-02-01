# Strategy Pattern

## Intent
Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

## Problem
You want to define a class with multiple behaviors, and these behaviors appear as multiple conditional statements. Instead of conditionals, move each branch to its own strategy class.

## Structure
```
Context → Strategy Interface
          ├── ConcreteStrategyA
          ├── ConcreteStrategyB
          └── ConcreteStrategyC
```

## Implementation

### Basic Strategy
```javascript
// Strategy interface
class PaymentStrategy {
  pay(amount) {
    throw new Error('pay() must be implemented');
  }
}

// Concrete Strategies
class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  pay(amount) {
    console.log(`Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`);
    return { success: true, method: 'Credit Card', amount };
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }

  pay(amount) {
    console.log(`Paid $${amount} using PayPal account ${this.email}`);
    return { success: true, method: 'PayPal', amount };
  }
}

class CryptoStrategy extends PaymentStrategy {
  constructor(walletAddress) {
    super();
    this.walletAddress = walletAddress;
  }

  pay(amount) {
    console.log(`Paid $${amount} using Crypto wallet ${this.walletAddress}`);
    return { success: true, method: 'Cryptocurrency', amount };
  }
}

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }

  addItem(item, price) {
    this.items.push({ item, price });
  }

  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }

  checkout() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);

    if (!this.paymentStrategy) {
      throw new Error('Payment strategy not set');
    }

    return this.paymentStrategy.pay(total);
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem('Laptop', 1000);
cart.addItem('Mouse', 50);

cart.setPaymentStrategy(new CreditCardStrategy('1234-5678-9012-3456', '123'));
cart.checkout();

cart.setPaymentStrategy(new PayPalStrategy('user@example.com'));
cart.checkout();
```

### Sorting Strategies
```javascript
class SortStrategy {
  sort(array) {
    throw new Error('sort() must be implemented');
  }
}

class BubbleSortStrategy extends SortStrategy {
  sort(array) {
    console.log('Using Bubble Sort');
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSortStrategy extends SortStrategy {
  sort(array) {
    console.log('Using Quick Sort');
    if (array.length <= 1) return array;

    const pivot = array[Math.floor(array.length / 2)];
    const left = array.filter(x => x < pivot);
    const middle = array.filter(x => x === pivot);
    const right = array.filter(x => x > pivot);

    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

class MergeSortStrategy extends SortStrategy {
  sort(array) {
    console.log('Using Merge Sort');
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = this.sort(array.slice(0, mid));
    const right = this.sort(array.slice(mid));

    return this.merge(left, right);
  }

  merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
  }
}

// Context
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(array) {
    return this.strategy.sort(array);
  }
}

// Usage
const data = [64, 34, 25, 12, 22, 11, 90];

const sorter = new Sorter(new BubbleSortStrategy());
console.log(sorter.sort(data));

sorter.setStrategy(new QuickSortStrategy());
console.log(sorter.sort(data));

sorter.setStrategy(new MergeSortStrategy());
console.log(sorter.sort(data));
```

### Compression Strategies
```javascript
class CompressionStrategy {
  compress(file) {
    throw new Error('compress() must be implemented');
  }
}

class ZipCompression extends CompressionStrategy {
  compress(file) {
    console.log(`Compressing ${file} using ZIP`);
    return `${file}.zip`;
  }
}

class RarCompression extends CompressionStrategy {
  compress(file) {
    console.log(`Compressing ${file} using RAR`);
    return `${file}.rar`;
  }
}

class TarCompression extends CompressionStrategy {
  compress(file) {
    console.log(`Compressing ${file} using TAR`);
    return `${file}.tar.gz`;
  }
}

class FileCompressor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  compress(file) {
    return this.strategy.compress(file);
  }
}

// Usage
const compressor = new FileCompressor(new ZipCompression());
compressor.compress('document.pdf');

compressor.setStrategy(new RarCompression());
compressor.compress('photos');
```

### Validation Strategies
```javascript
class ValidationStrategy {
  validate(value) {
    throw new Error('validate() must be implemented');
  }
}

class EmailValidation extends ValidationStrategy {
  validate(value) {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return {
      valid: regex.test(value),
      message: regex.test(value) ? 'Valid email' : 'Invalid email format'
    };
  }
}

class PhoneValidation extends ValidationStrategy {
  validate(value) {
    const regex = /^\\d{3}-\\d{3}-\\d{4}$/;
    return {
      valid: regex.test(value),
      message: regex.test(value) ? 'Valid phone' : 'Invalid phone format (XXX-XXX-XXXX)'
    };
  }
}

class PasswordValidation extends ValidationStrategy {
  validate(value) {
    const hasLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\\d/.test(value);

    const valid = hasLength && hasUpper && hasLower && hasNumber;

    return {
      valid,
      message: valid ? 'Strong password' : 'Password must be 8+ chars with upper, lower, and number'
    };
  }
}

class Validator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  validate(value) {
    return this.strategy.validate(value);
  }
}

// Usage
const validator = new Validator(new EmailValidation());
console.log(validator.validate('test@example.com'));
console.log(validator.validate('invalid-email'));

validator.setStrategy(new PasswordValidation());
console.log(validator.validate('Weak'));
console.log(validator.validate('Strong123'));
```

## Pros

1. **Open/Closed**: Add new strategies without changing context
2. **Runtime Switching**: Change algorithms at runtime
3. **Eliminates Conditionals**: Replace complex if/else chains
4. **Isolation**: Each algorithm is isolated and testable
5. **Flexibility**: Easy to add new variations

## Cons

1. **Increased Classes**: More classes to manage
2. **Client Awareness**: Client must understand different strategies
3. **Communication Overhead**: Extra objects and interfaces

## When to Use

- ✅ Many related classes differ only in behavior
- ✅ Need different variants of an algorithm
- ✅ Algorithm uses data clients shouldn't know about
- ✅ Class has multiple conditional statements

## When to Avoid

- ❌ Only one or two algorithms
- ❌ Algorithms never change
- ❌ Simple conditional is clearer

---

[← Back to Behavioral Patterns](../README.md#behavioral-patterns)
