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

#### User
+ id (UUID,primary key)
+ email (unique)
+ password (hashed)
+ createdAt (timestamp)

#### Course
+ id (UUID)
+ name
+ color
+ userId (foreign key -> User)

#### Task
+ id (UUID)
+ title
+ dueDate
+ estimatedHours
+ type
+ courseId (foreign key -> Course)

### StudySession
+ id (UUID)
+ date
+ duration
+ completed
+ taskId(foreign key -> Task)

### Infrastructure 

- PostgreSQL hosted on Neon
- Prisma ORM (v7 configuration architecture)
- Migration-based schema evolution
- Environment-based database configuration