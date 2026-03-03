# SOLID Principles in TypeScript — A Complete Practical Guide

> Modern software systems demand maintainability, extensibility, and testability.
> The SOLID principles, introduced by **Robert C. Martin (Uncle Bob)**, provide a foundation for building modular and scalable systems that evolve gracefully.

## In This Guide

- Each SOLID principle explained clearly
- Real-world TypeScript examples
- Anti-patterns (bad design) and how to fix them
- The reasoning and design thinking behind each improvement

---

## 🧩 S — Single Responsibility Principle (SRP)

> **A class should have only one reason to change.**

### ❌ Bad Example — Violating SRP

```typescript
class UserService {
  createUser(data: any) {
    // Save to DB
  }

  sendWelcomeEmail(email: string) {
    // Send email
  }

  logToFile(message: string) {
    // Write to local file
  }
}
```

**Why this is bad:**
- This class performs three distinct responsibilities: persistence, email communication, and logging.
- When unrelated concerns coexist, the class becomes tightly coupled and difficult to maintain.
- A change in one area can break others.
- Reduces testability since you can't isolate behavior during testing.

### ✅ Good Example — Applying SRP

```typescript
class UserRepository {
  create(data: any) {
    console.log("User saved:", data);
  }
}

class EmailService {
  sendWelcome(email: string) {
    console.log("Welcome email sent:", email);
  }
}

class Logger {
  log(message: string) {
    console.log("[LOG]", message);
  }
}

class UserService {
  constructor(
    private repo: UserRepository,
    private email: EmailService,
    private logger: Logger
  ) {}

  registerUser(data: any) {
    this.repo.create(data);
    this.email.sendWelcome(data.email);
    this.logger.log("User registered: " + data.email);
  }
}
```

**Why this is good:**
- Each class now has a single, well-defined purpose.
- Each can be tested independently.
- Changing email or logging logic doesn't affect user registration.
- The design exhibits **high cohesion** and **low coupling**.

---

## 🧱 O — Open/Closed Principle (OCP)

> **Software should be open for extension but closed for modification.**

### ❌ Bad Example — Hardcoded Logic

```typescript
class Payment {
  pay(type: string) {
    if (type === "paypal") {
      // ...
    }

    if (type === "stripe") {
      // ...
    }
  }
}
```

**Why this is bad:**
- Each new payment method requires modifying this class.
- This breaks OCP — it's not closed for modification.
- You risk regressions every time new logic is added.
- Makes the system rigid to change.

### ✅ Good Example — Using Polymorphism

```typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log("Paid with PayPal:", amount);
  }
}

class StripePayment implements PaymentStrategy {
  pay(amount: number) {
    console.log("Paid with Stripe:", amount);
  }
}

class Checkout {
  constructor(private payment: PaymentStrategy) {}

  process(amount: number) {
    this.payment.pay(amount);
  }
}
```

**Why this is good:**
- Adding a new payment method is just adding a new class.
- The existing system stays untouched — that's the essence of OCP.
- Achieved via **polymorphism** and **dependency injection**, enabling flexible extension without risky modification.

---

## 🪶 L — Liskov Substitution Principle (LSP)

> **Subclasses must be replaceable for their base classes without breaking the application.**

### ❌ Bad Example — Broken Inheritance

```typescript
class Bird {
  fly() {}
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins cannot fly!");
  }
}
```

**Why this is bad:**
- Clients expecting a `Bird` that can `fly()` will fail with `Penguin`.
- This violates **behavioural substitutability** — the core of LSP.
- Such inheritance structures are misleading and create fragile hierarchies.

### ✅ Good Example — Model Capabilities, Not Inheritance

```typescript
interface Flyable {
  fly(): void;
}

class Sparrow implements Flyable {
  fly() {
    console.log("Flying...");
  }
}

class Penguin {
  swim() {
    console.log("Swimming...");
  }
}
```

**Why this is good:**
- Instead of forcing inheritance, this design models capabilities explicitly.
- Classes represent only what they can do — maintaining **semantic correctness**.
- Ensures safe substitution, stronger contracts, and accurate abstraction.

---

## ⚙️ I — Interface Segregation Principle (ISP)

> **Clients should not be forced to depend on interfaces they don't use.**

### ❌ Bad Example — Fat Interface

```typescript
interface Worker {
  work(): void;
  eat(): void;
}

class Robot implements Worker {
  work() {}
  eat() {
    throw new Error("Robots do not eat");
  }
}
```

**Why this is bad:**
- The `Robot` class is forced to implement irrelevant behaviour.
- Such non-cohesive interfaces lead to brittle code and unnecessary coupling.
- Violates semantic design integrity — every contract should represent one consistent responsibility.

### ✅ Good Example — Segregated Interfaces

```typescript
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

class Human implements Workable, Eatable {
  work() {}
  eat() {}
}

class Robot implements Workable {
  work() {}
}
```

**Why this is good:**
- Interfaces are now minimal and precise, aligning with each actor's behaviour.
- Clients depend only on the contracts they need — improving flexibility and reuse.
- This design promotes **composability** and fine-grained abstraction.

---

## 🧠 D — Dependency Inversion Principle (DIP)

> **High-level modules should not depend on low-level modules. Both should depend on abstractions.**

### ❌ Bad Example — Tight Coupling

```typescript
class MySQLDatabase {
  save(data: any) {
    console.log("Saving to MySQL", data);
  }
}

class UserService {
  db = new MySQLDatabase(); // ❌ Hard dependency

  saveUser(data: any) {
    this.db.save(data);
  }
}
```

**Why this is bad:**
- `UserService` depends directly on a concrete implementation.
- Switching to another database (e.g., PostgreSQL) would require modifying it.
- Introduces rigid coupling, violates OCP, and makes testing in isolation impossible.

### ✅ Good Example — Depend on Abstractions

```typescript
interface Database {
  save(data: any): void;
}

class MySQLDatabase implements Database {
  save(data: any) {
    console.log("Saved in MySQL:", data);
  }
}

class PostgresDatabase implements Database {
  save(data: any) {
    console.log("Saved in PostgreSQL:", data);
  }
}

class UserService {
  constructor(private db: Database) {}

  saveUser(data: any) {
    this.db.save(data);
  }
}
```

**Why this is good:**
- The high-level module (`UserService`) depends on an interface, not an implementation.
- This **inverts the dependency direction** — the abstraction defines the contract, and concrete classes implement it.
- The result: loose coupling, testability, and extensibility.

---

## 🔄 Putting It All Together — A SOLID Example

```typescript
// ✅ SRP: Each class has one responsibility
interface MessageSender {
  send(message: string): void;
}

// ✅ OCP: Extendable via new senders
class EmailSender implements MessageSender {
  send(message: string) {
    console.log("Email:", message);
  }
}

class SmsSender implements MessageSender {
  send(message: string) {
    console.log("SMS:", message);
  }
}

// ✅ DIP: Depends on abstraction, not implementation
class NotificationService {
  constructor(private sender: MessageSender) {}

  notify(user: string, message: string) {
    this.sender.send(`${user}: ${message}`);
  }
}

// ✅ LSP: Any MessageSender can replace another safely
const service = new NotificationService(new EmailSender());
service.notify("Navid", "Your SOLID article is ready!");

// ✅ ISP: Interfaces are minimal and behaviour-specific
```

**Why this is powerful — all five principles in harmony:**

| Principle | How It's Applied |
|-----------|-----------------|
| **SRP** | Each class is focused and testable |
| **OCP** | New senders can be added without touching old code |
| **LSP** | Any sender can substitute another safely |
| **ISP** | Interfaces are small and cohesive |
| **DIP** | High-level services depend on abstractions |

---

## 🧭 Conclusion

The SOLID principles aren't strict rules — they're **architectural philosophies** that help you reason about software design.

By following them, you can:

- ✅ Write maintainable and scalable systems
- ✅ Enable growth without rewriting core logic
- ✅ Isolate responsibilities and reduce coupling
- ✅ Design testable, modular, and reusable components

When combined with **TypeScript's strong type system** and interface abstractions, SOLID principles become an incredibly powerful design toolkit for building clean, modern software.

---

> *Original article by [Navid Barsalari](https://medium.com/@navidbarsalari/solid-principles-in-typescript-a-complete-practical-guide-with-real-examples-83f25e093bdf) on Medium.*