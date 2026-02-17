# AI Study Planner

## Overview
AI study planner is full-stack  Typescript application designed to intelligently generate optimized study schedule for students based on deadlines and workload distribution.

## Objectives 
- Demonstrate full-stack engineering capability.
- Implement relational database modeling.
- Apply type-safe backend architecture.
- Develop Produciton level API patterns.

## Technology Stack 
- Next.js (App Router)
- Typescript
- PostgreSQL
- Prisma ORM
- React Query
- Zod Validation

## Architecture 
Client -> Next.js Frontened -> API Routes -> Prisma -> PostgreSQL

## Development Log
Day 1: Project Intialization and repository setup.



## Database Architecture

### Relational Model 

The System follows a normalized realtional Structure:
    
 
    ```
    User
    └── Course
        └── Task
            └── StudySession
    ```

### Design Principles

+ UUID primary keys for security and scalability.
+ One-to-many relationships across all entities.
+ Cascading deletes to maintain referential integrity.
+ Normalized schema to prevent redundacny.
+ Migrations-driven schema management via Prisma.

### Models Overview

**User**
+ id (UUID,primary key)
+ email (unique)
+ password (hashed)
+ createdAt (timestamp)

**Course**
+ id (UUID)
+ name
+ color
+ userId (foreign key -> User)

**Task**
+ id (UUID)
+ title
+ dueDate
+ estimatedHours
+ type
+ courseId (foreign key -> Course)

**StudySession**
+ id (UUID)
+ date
+ duration
+ completed
+ taskId(foreign key -> Task)

**Infrastructure**

- PostgreSQL hosted on Neon
- Prisma ORM (v7 configuration architecture)
- Migration-based schema evolution
- Environment-based database configuration


### Backend Infrastructure

#### Prisma Client Singleton

A development-safe singleton pattern is used to prevent multiple database connections during hot reload.

**Key Characteristics:**
+ Prevents connection exhaustion in development 
+ Uses environment-based behavior
+ Enables query logging for debugging

#### API Layer - Test Endpoint

**EndPoint**
```
    GET /api/test
```
**Purpose:**
+ Verifies database connectivity
+ Confirms Prisma client initialization
+ Ensures Neon integration is functional

**Response Structure:**

```
    {
        "success": true,
        "users": []
    }
```

**Error Handing:**
+ Returns HTTP 500 on failure
+ Structured JSON error response



### Authentication Architecture (In Progress)

**Endpoint: Register User**

```
    POST /api/auth/register
```

**Purpose:**

+ Creates a new user account.
+ Accepts email and password
+ Will enforce validation and hashing
+ Will prevent duplicate registrations

**Status:**

+ Endpoint skeleton created
+ Validation and persistence layer pending

**Design Principles:**

+ Authentication routes isolated under /api/auth
+ Uses HTTP POST for resource creation
+ Will implement strict input validation
+ Will hash passwords before storage


**Registration Flow:**

+ Parse request body
+ Validate input with Zod
+ Check for duplicate email
+ Hash password using bcrypt
+ Insert user into PostgreSQL
+ Return 201 Created

**Security Measures:**

+ Passwords never stored in plaintext
+ Unique email constraint enforced
+ Proper HTTP status codes used
+ Sensitive data excluded from response

**Registration Endpoint (Final Architecture)**

+ No application-level duplicate pre-check
+ Relies on database unique constraint
+ Catches Prisma P2002 error
+ Maps database errors to HTTP 409
+ Ensures strong consistency under concurrency
+ Passwords hashed using bcrypt (10 salt rounds)

**Concurrency Safety:**

+ Database-level atomic uniqueness enforcement
+ Race-condition safe under simultaneous requests