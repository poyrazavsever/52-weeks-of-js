# The Engineering Redemption: From Vibe Coding to First Principles

This repository serves as the central documentation for a 52-week intensive software engineering roadmap.

**Objective:** To transition from AI-dependent development ("Vibe Coding") to fundamental computer science and engineering mastery.
**Target Date:** January 2027.

## Directory Structure

```
52-weeks-of-js/
├── 01-iron-foundations/          # Phase 1: Weeks 1-12
│   ├── week-01-js-memory/
│   │   ├── lab/                  # Örnek çalışmalar
│   │   ├── notes/                # Notlar
│   │   └── README.md             # Haftalık özet
│   ├── week-02-scope/
│   └── ...
├── 02-web-architecture/          # Phase 2: Weeks 13-28
├── 03-universal-ecosystem/       # Phase 3: Weeks 29-40
├── 04-seniority-cs/              # Phase 4: Weeks 41-52
├── resources/
│   ├── books.md                  # Okunan kaynaklar
│   └── tools.md                  # Kullanılan araçlar
└── README.md                     # Bu dosya
```

## Core Principles

1.  **No AI for Logic:** Artificial Intelligence tools are strictly prohibited for generating solution logic or writing code. They may only be used for explanation or debugging after a solution has been attempted.
2.  **First Principles:** The focus is not on "how" to use a framework, but "why" it works and how it is constructed at the source code level.
3.  **Deep Dives:** Every topic is explored until the underlying mechanism (memory, network, OS interaction) is understood.

---

## Phase 1: Iron Foundations (Weeks 1-12)

**Focus:** JavaScript Runtime, Node.js Internals, Data Structures, and Raw SQL.
**Goal:** Understanding how code interacts with the machine's memory and processor without abstraction layers.

- [ ] **Week 01: JS Memory Management & Runtime**
  - _Topics:_ Stack vs Heap, Reference Types, Garbage Collection algorithms (Mark and Sweep), Memory Leaks.
  - _Goal:_ To visualize physical memory allocation when writing code.
- [ ] **Week 02: Scope & Closures**
  - _Topics:_ Lexical Environment, Hoisting, IIFE, Module Pattern, Closure memory costs.
  - _Goal:_ To master variable lifecycles and encapsulation.
- [ ] **Week 03: Async JavaScript Deep Dive**
  - _Topics:_ Event Loop architecture, Macrotasks vs Microtasks, Callback Queues, Promise internals, async/await compilation.
  - _Goal:_ To manage concurrency and non-blocking I/O effectively.
- [ ] **Week 04: Object-Oriented JS & Prototypes**
  - _Topics:_ The 'this' keyword rules, Prototype Chain, Class Inheritance vs Composition, Factory Functions.
  - _Goal:_ To understand JavaScript's unique inheritance model compared to classical OOP.
- [ ] **Week 05: Advanced TypeScript I**
  - _Topics:_ Interfaces vs Types, Enums, Union/Intersection Types, Tuples, Unknown vs Any.
  - _Goal:_ To enforce strict type safety and reduce runtime errors.
- [ ] **Week 06: Advanced TypeScript II**
  - _Topics:_ Generics, Utility Types (Partial, Pick, Omit, Record), Type Guards, Conditional Types, Infer.
  - _Goal:_ To write reusable and robust type definitions for complex data.
- [ ] **Week 07: Node.js Internals**
  - _Topics:_ V8 Engine architecture, Libuv, Single Thread nature, Thread Pool, Event Loop phases.
  - _Goal:_ To understand the limitations and strengths of the Node.js runtime.
- [ ] **Week 08: Raw Backend Engineering**
  - _Topics:_ No-Framework Node.js, 'http' module, Streams, Buffers, Chunked Transfer Encoding.
  - _Goal:_ To build efficient servers without the overhead of Express or NestJS.
- [ ] **Week 09: Data Structures I**
  - _Topics:_ Big O Notation (Time/Space Complexity), Manual implementation of Arrays and Linked Lists.
  - _Goal:_ To understand the performance cost of data storage choices.
- [ ] **Week 10: SQL & Relational Theory**
  - _Topics:_ ACID Properties, Raw SQL Queries (SELECT, JOIN, GROUP BY), PostgreSQL setup without ORM.
  - _Goal:_ To master data manipulation language (DML) directly.
- [ ] **Week 11: Database Indexing & Performance**
  - _Topics:_ B-Tree data structures, Clustered vs Non-Clustered Indexes, Query Execution Plans.
  - _Goal:_ To optimize database performance at the architectural level.
- [ ] **Week 12: Application Architecture: CLI Tools**
  - _Topics:_ Command-line logic, File System (fs) module, Process arguments, Stream piping.
  - _Goal:_ To build a complete logic-heavy application without a graphical interface.

---

## Phase 2: Web Architecture & Engineering (Weeks 13-28)

**Focus:** React Internals, Next.js Architecture, Testing, CI/CD, and Security.
**Goal:** Mastering the source code and architectural decisions of the modern web stack.

- [ ] **Week 13: React Internals**
  - _Topics:_ Virtual DOM, Reconciliation Algorithm (Diffing), Fiber Architecture, Render Cycle.
  - _Goal:_ To optimize rendering performance by understanding the React engine.
- [ ] **Week 14: Advanced Hooks & Performance**
  - _Topics:_ useMemo, useCallback, Referential Equality, Custom Hooks design patterns.
  - _Goal:_ To prevent unnecessary re-renders and memory waste.
- [ ] **Week 15: State Management Patterns**
  - _Topics:_ Flux Architecture, Observer Pattern, Proxy Pattern (Zustand logic), Context API limitations.
  - _Goal:_ To manage complex application state without prop-drilling.
- [ ] **Week 16: Component Design Patterns**
  - _Topics:_ Higher Order Components (HOC), Compound Components, Render Props.
  - _Goal:_ To create reusable and maintainable component libraries.
- [ ] **Week 17: Rendering Architectures**
  - _Topics:_ SSR, CSR, SSG, ISR concepts, Server Cost vs Client Performance analysis.
  - _Goal:_ To choose the correct rendering strategy for different use cases.
- [ ] **Week 18: Next.js Internals**
  - _Topics:_ App Router architecture, React Server Components (RSC), Network Boundary.
  - _Goal:_ To leverage server-side capabilities within the React ecosystem.
- [ ] **Week 19: API Design Standards**
  - _Topics:_ REST vs GraphQL, HTTP Methods, Idempotency, Status Codes, API Versioning.
  - _Goal:_ To design predictable and standard-compliant APIs.
- [ ] **Week 20: Authentication & Security Theory**
  - _Topics:_ OAuth 2.0, OpenID Connect, JWT vs Session Auth, Secure Token Storage (HttpOnly Cookies).
  - _Goal:_ To implement secure identity management.
- [ ] **Week 21: Testing Methodologies**
  - _Topics:_ The Test Pyramid, Unit vs Integration vs E2E Testing, Mocking, Stubbing.
  - _Goal:_ To ensure software reliability through automated verification.
- [ ] **Week 22: Containerization (Docker)**
  - _Topics:_ OS-level virtualization, Docker Images, Layers, Networking, Volumes, Dockerfiles.
  - _Goal:_ To create consistent development and production environments.
- [ ] **Week 23: CI/CD Pipelines**
  - _Topics:_ Continuous Integration principles, GitHub Actions, Build Pipelines, Automated Testing.
  - _Goal:_ To automate the software delivery lifecycle.
- [ ] **Week 24: Web Security (OWASP)**
  - _Topics:_ XSS, CSRF, SQL Injection, Security Headers (CSP), Rate Limiting.
  - _Goal:_ To proactively harden applications against common vulnerabilities.
- [ ] **Week 25: Mobile Runtime Environment**
  - _Topics:_ React Native Bridge, Threading Model (JS vs UI vs Native), The New Architecture (JSI, Fabric).
  - _Goal:_ To understand how JavaScript drives native mobile UI.
- [ ] **Week 26: Mobile UI Architecture**
  - _Topics:_ Yoga Layout Engine, Flexbox differences on Mobile, Native UI Components.
  - _Goal:_ To build performant mobile interfaces.
- [ ] **Week 27: Native Modules Logic**
  - _Topics:_ Bridging JavaScript to Native iOS (Obj-C/Swift) and Android (Java/Kotlin) APIs.
  - _Goal:_ To access device capabilities not available in the standard runtime.
- [ ] **Week 28: Offline Data Strategy**
  - _Topics:_ Local Storage engines (SQLite/Realm), Synchronization logic, Conflict Resolution.
  - _Goal:_ To build "Offline-First" applications.

---

## Phase 3: Universal Ecosystem (Weeks 29-40)

**Focus:** Cross-Platform Development and Distributed Systems Basics.
**Goal:** Running code efficiently across Mobile, Desktop, and Server environments.

- [ ] **Week 29: Desktop Architecture (Electron)**
  - _Topics:_ Chromium & Node.js integration, Main Process vs Renderer Process, IPC Communication.
  - _Goal:_ To port web logic to desktop environments securely.
- [ ] **Week 30: OS Integration**
  - _Topics:_ File System Access, System Tray integration, Native OS Notifications.
  - _Goal:_ To build applications that feel native to the operating system.
- [ ] **Week 31: Monorepo Tooling**
  - _Topics:_ Workspaces, Dependency Graphs, Code Sharing Strategies, Tools (Turborepo/Nx).
  - _Goal:_ To manage large-scale codebases with shared libraries.
- [ ] **Week 32: Network Protocols**
  - _Topics:_ TCP vs UDP, WebSockets (Handshake, Frames), Server-Sent Events (SSE).
  - _Goal:_ To implement real-time communication protocols.
- [ ] **Week 33: Caching Strategies**
  - _Topics:_ Cache-Aside, Write-Through, Write-Back, Redis Data Structures.
  - _Goal:_ To reduce database load and improve latency.
- [ ] **Week 34: Message Brokers**
  - _Topics:_ Publisher/Subscriber Model, Message Queues (RabbitMQ/Kafka basics), Async Job Processing.
  - _Goal:_ To decouple system components and handle background tasks.
- [ ] **Week 35: Distributed Systems I**
  - _Topics:_ CAP Theorem (Consistency, Availability, Partition Tolerance), Eventual Consistency.
  - _Goal:_ To understand the trade-offs in distributed data systems.
- [ ] **Week 36: Distributed Systems II**
  - _Topics:_ Load Balancing Algorithms (Round Robin, Least Connections), Horizontal vs Vertical Scaling.
  - _Goal:_ To design systems that can handle increased traffic load.
- [ ] **Week 37: Data Structures II (Trees)**
  - _Topics:_ Binary Search Trees (BST), AVL Trees, Tree Traversal (BFS/DFS).
  - _Goal:_ To solve hierarchical data problems efficiently.
- [ ] **Week 38: Data Structures III (Graphs)**
  - _Topics:_ Adjacency Matrix vs List, Shortest Path Algorithms (Dijkstra), Network flow.
  - _Goal:_ To solve complex relationship and routing problems.
- [ ] **Week 39: Algorithm Patterns I**
  - _Topics:_ Dynamic Programming (Memoization, Tabulation), Recursion limits.
  - _Goal:_ To optimize recursive solutions for time complexity.
- [ ] **Week 40: Algorithm Patterns II**
  - _Topics:_ Greedy Algorithms, Backtracking.
  - _Goal:_ To solve optimization and constraint satisfaction problems.

---

## Phase 4: Seniority & Computer Science (Weeks 41-52)

**Focus:** System Design, Advanced Algorithms, and Engineering Career.
**Goal:** Developing the ability to design large-scale systems and demonstrate senior-level competency.

- [ ] **Week 41: System Design: Scalability**
  - _Topics:_ Database Sharding, Partitioning strategies, Replication (Master-Slave).
  - _Goal:_ To design data layers that scale horizontally.
- [ ] **Week 42: System Design: Microservices**
  - _Topics:_ API Gateway pattern, Service Discovery, Circuit Breakers, Inter-service communication.
  - _Goal:_ To architect decoupled and resilient systems.
- [ ] **Week 43: System Design: Data Modeling**
  - _Topics:_ NoSQL (Document, Columnar) vs SQL selection criteria, Data normalization vs denormalization.
  - _Goal:_ To choose the right storage technology for specific data patterns.
- [ ] **Week 44: Web Performance Engineering**
  - _Topics:_ Critical Rendering Path analysis, Browser Painting, Bundle Optimization, Tree Shaking.
  - _Goal:_ To achieve maximum runtime performance on the client side.
- [ ] **Week 45: LeetCode Practice (Arrays/Strings)**
  - _Topics:_ Optimization problems using Sliding Window and Two Pointer techniques.
  - _Goal:_ To prepare for algorithmic problem solving under constraints.
- [ ] **Week 46: LeetCode Practice (LinkedLists/Trees)**
  - _Topics:_ Pointer manipulation, Inverting trees, Level-order traversal.
  - _Goal:_ To master non-contiguous data structures.
- [ ] **Week 47: LeetCode Practice (DP/Graphs)**
  - _Topics:_ Complex dynamic programming and graph traversal problems.
  - _Goal:_ To solve the most challenging class of interview problems.
- [ ] **Week 48: Code Review Discipline**
  - _Topics:_ SOLID Principles, DRY, KISS, Refactoring techniques, Code Smells.
  - _Goal:_ To write maintainable code and conduct effective peer reviews.
- [ ] **Week 49: Open Source Contribution Theory**
  - _Topics:_ Reading large codebases, Understanding contribution guidelines, Pull Request etiquette.
  - _Goal:_ To learn how to collaborate on global-scale software.
- [ ] **Week 50: Technical Documentation**
  - _Topics:_ Writing technical specifications, Architecture Decision Records (ADR), API documentation.
  - _Goal:_ To communicate complex technical concepts clearly.
- [ ] **Week 51: Career & Interview Preparation**
  - _Topics:_ System Design whiteboard simulations, Behavioral competency, Technical storytelling.
  - _Goal:_ To effectively demonstrate engineering expertise.
- [ ] **Week 52: Retrospective & Graduation**
  - _Topics:_ Review of the 52-week journey, Analysis of learned concepts, Future specialization planning.
  - _Goal:_ To conclude the roadmap and transition to the next career phase.
