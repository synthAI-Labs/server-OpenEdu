# Auth Service Documentation

The `AuthService` is responsible for handling authentication-related operations within the AI-Res server.

## Table of Contents

- [Class: AuthService](#class-authservice)
  - [Methods](#methods)
    - [getStatus](#getstatus)
    - [generateRandomToken](#generaterandomtoken)
    - [signup](#signup)
    - [confirmEmail](#confirmemail)
    - [generateVerificationCode](#generateverificationcode)
    - [sendVerificationCode](#sendverificationcode)
    - [signin](#signin)

## Class: AuthService

### Methods

#### `getStatus`

```typescript
getStatus(): string
```

Retrieves the status of the authentication service.

- **Returns:**
  - `string`: A string indicating the status of the authentication service.

#### `generateRandomToken`

```typescript
generateRandomToken(): string
```

Generates a random token by combining a random string and a timestamp.

- **Returns:**
  - `string`: The generated random token.

#### `signup`

```typescript
async signup(dto: AuthDto): ForbiddenException | User
```

Signs up a new user with the provided authentication data.

- **Parameters:**
  - `dto` (AuthDto): The authentication data for the new user.

- **Returns:**
  - `User`: The created user object.

- **Throws:**
  - `ForbiddenException`: If the username is already taken, the password is less than 8 characters, name or username is less than 1 character, or if the email already exists.

#### `confirmEmail`

```typescript
async confirmEmail(userEmail: string, userGivenCode: string): ForbiddenException | User
```

Confirms the email of a user by comparing the verification code.

- **Parameters:**
  - `userEmail` (string): The email of the user.
  - `userGivenCode` (string): The verification code provided by the user.

- **Returns:**
  - `User`: The updated user object if the verification code is valid.

- **Throws:**
  - `ForbiddenException`: If no verification code is found, or if the verification code is invalid.

#### `generateVerificationCode`

```typescript
generateVerificationCode(): string
```

Generates a random verification code.

- **Returns:**
  - `string`: The generated verification code.

#### `sendVerificationCode`

```typescript
async sendVerificationCode(email: string, code: string): boolean
```

Sends a verification code to the provided email address.

- **Parameters:**
  - `email` (string): The email address to send the verification code to.
  - `code` (string): The verification code to send.

- **Returns:**
  - `boolean`: A boolean indicating whether the code was successfully sent.

#### `signin`

```typescript
async signin(dto: AuthDto): ForbiddenException | User
```

Signs in a user with the provided authentication data.

- **Parameters:**
  - `dto` (AuthDto): The authentication data for the user.

- **Returns:**
  - `User`: The signed-in user object.

- **Throws:**
  - `ForbiddenException`: If no user with the provided email is found or if the password is invalid.
