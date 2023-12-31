# Auth Service Documentation

The `AuthService` is responsible for handling authentication-related operations within the OPEN-EDU server.

---
[[toc]]
--- 


##  `getStatus`

```typescript
getStatus(): string
```

Retrieves the status of the authentication service.

- **Returns:**
  - `string`: A string indicating the status of the authentication service.


--- 


## `generateRandomToken`

```typescript
generateRandomToken(): string
```

Generates a random token by combining a random string and a timestamp.

- **Returns:**
  - `string`: The generated random token.


--- 


##  `signup`

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


--- 


##  `confirmEmail`

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


--- 


## `generateVerificationCode`

```typescript
generateVerificationCode(): string
```

Generates a random verification code.

- **Returns:**
  - `string`: The generated verification code.


--- 


##  `sendVerificationCode`

```typescript
async sendVerificationCode(email: string, code: string): boolean
```

Sends a verification code to the provided email address.

- **Parameters:**
  - `email` (string): The email address to send the verification code to.
  - `code` (string): The verification code to send.

- **Returns:**
  - `boolean`: A boolean indicating whether the code was successfully sent.


--- 


## `signin`

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


--- 


## `signOut`

```typescript
async signOut(token: string, userId: string): { status: number, message: string }
```

Logs out a user by generating a new token.

- **Parameters:**
  - `token` (string): The user's current token.
  - `userId` (string): The user's ID.

- **Returns:**
  - `{ status: number, message: string }`: An object indicating the status and message of the logout operation.


--- 


## `forgotPassword`

```typescript
async forgotPassword(token: string, userId: string, userEmail: string): { status: number, message: string }
```

Sends a verification code to the user's email for password reset.

- **Parameters:**
  - `token` (string): The token associated with the password reset request.
  - `userId` (string): The ID of the user requesting the password reset.
  - `userEmail` (string): The email address of the user requesting the password reset.

- **Returns:**
  - `{ status: number, message: string }`: An object indicating the status and message of the password reset verification code sent.


--- 


## `confirmResetPassword`

```typescript
async confirmResetPassword(userEmail: string, dto: ResetPasswordDto): { status: number, message: string }
```

Confirms the reset password for a user.

- **Parameters:**
  - `userEmail` (string): The email of the user.
  - `dto` (ResetPasswordDto): The reset password data transfer object.

- **Returns:**
  - `{ status: number, message: string }`: An object indicating the status and message of the password reset confirmation.


--- 


## `resetPassword`

```typescript
async resetPassword(token: string, userId: string, password: string): { status: number, message: string }
```

Resets the password for a user.

- **Parameters:**
  - `token` (string): The token associated with the password reset request.
  - `userId` (string): The ID of the user requesting the password reset.
  - `password` (string): The new password.

- **Returns:**
  - `{ status: number, message: string }`: An object indicating the status and message of the password reset operation.
