# Learn Service Documentation

The `LearnService` is responsible for handling learn-related operations within the AI-Res server.

## Table of Contents

- [Class: LearnService](#class-learnservice)
  - [Methods](#methods)
    - [getStatus](#getstatus)
    - [validateIdFormat](#validateidformat)
    - [getLearn](#getlearn)
    - [getCourseById](#getcoursebyid)
    - [enroll](#enroll)
    - [getTopics](#gettopics)
    - [getModule](#getmodule)

## Class: LearnService

### Methods

#### `getStatus`

```typescript
getStatus(): string
```

Retrieves the status of the authentication service.

- **Returns:**
  - `string`: A string indicating the status of the authentication service.

#### `validateIdFormat`

```typescript
private validateIdFormat(id: string, field: string): number | ForbiddenException
```

Validates the format of an ID.

- **Parameters:**
  - `id` (string): The ID to validate.
  - `field` (string): The field name associated with the ID.

- **Returns:**
  - `number | ForbiddenException`: The parsed ID as a number or a `ForbiddenException` if the ID format is invalid.

#### `getLearn`

```typescript
async getLearn(): Promise<Course[]>
```

Retrieves all learn courses.

- **Returns:**
  - `Promise<Course[]>`: A promise that resolves to an array of courses.

#### `getCourseById`

```typescript
async getCourseById(courseId: string): Promise<Course | ForbiddenException>
```

Retrieves a course by its ID.

- **Parameters:**
  - `courseId` (string): The ID of the course to retrieve.

- **Returns:**
  - `Promise<Course | ForbiddenException>`: A promise that resolves to the course or a `ForbiddenException` if the course is not found.

#### `enroll`

```typescript
async enroll(courseId: string, userId: string, token: string): Promise<string | ForbiddenException>
```

Enrolls a user in a course.

- **Parameters:**
  - `courseId` (string): The ID of the course to enroll in.
  - `userId` (string): The ID of the user to enroll.
  - `token` (string): The token for user authentication.

- **Returns:**
  - `Promise<string | ForbiddenException>`: A promise that resolves to a string indicating the enrollment status or a `ForbiddenException` if the user or course is not found.

#### `getTopics`

```typescript
async getTopics(courseId: string): Promise<Subtopic[] | ForbiddenException>
```

Retrieves the topics of a course.

- **Parameters:**
  - `courseId` (string): The ID of the course.

- **Returns:**
  - `Promise<Subtopic[] | ForbiddenException>`: A promise that resolves to an array of topics or a `ForbiddenException` if the course is not found.

#### `getModule`

```typescript
async getModule(courseId: string, topicId: string, moduleId: string): Promise<Module | ForbiddenException>
```

Retrieves a module of a course.

- **Parameters:**
  - `courseId` (string): The ID of the course.
  - `topicId` (string): The ID of the topic.
  - `moduleId` (string): The ID of the module.

- **Returns:**
  - `Promise<Module | ForbiddenException>`: A promise that resolves to the module or a `ForbiddenException` if the course, topic, or module is not found.
