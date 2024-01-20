# API Calls For Dashboard Service

::: warning TODO

1. Implement in frontend
2. add signup/sign using google/github OAuth

:::

## [[toc]]

## 1. Get Status

**Endpoint:**

```
GET /auth/status
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 2. Sign Up

**Endpoint:**

```
POST /auth/signup
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {
    "email": "<email>",
    "password": "<password>",
    "name": "<name>",
    "username": "<username>"
  },
  "cookie": "access_token=<token>"
}
```

:::

::: details api response

```json
{
  "status": 200,
  "message": "Signup successful",
  "user": "User Object"
}
```

## 3. Confirm Email (Signup)

**Endpoint:**

```
POST /auth/signup/confirm/:userEmail
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {
    "code": "<code>"
  }
}
```

:::

## 4. Sign Out

**Endpoint:**

```
POST /auth/signout
```

::: details **Example API Call:**

```json
{
  "Headers": {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {}
}
```

:::

## 5. Forgot Password

**Endpoint:**

```
POST /auth/password/forgot
```

::: warning
Implement in frontend
:::

::: details **Example API Call:**

```json
{
  "Headers": {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {
    "userEmail": "<email>"
  }
}
```

:::

## 6. Confirm Forgot Password's Email

**Endpoint:**

```
POST /auth/password/forgot/confirm/:userEmail
```

::: warning
Implement in frontend
:::

::: details **Example API Call:**

```json
{
  "params": {
    "userEmail": "<userEmail>"
  },
  "Headers": {},
  "Body": {
    "code": "<code>",
    "newPassword": "<newPassword>"
  }
}
```

:::

## 7. Change Password

**Endpoint:**

```
POST /auth/password/change
```

::: warning
Implement in frontend
:::

::: details **Example API Call:**

```json
{
  "Headers": {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {
    "newPassword": "<newPassword>"
  }
}
```

:::

## 8. Sign In

**Endpoint:**

```
POST /auth/signin
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {
    "email": "<email>",
    "password": "<password>"
  },
  "cookie": "access_token=<token>"
}
:::
```
