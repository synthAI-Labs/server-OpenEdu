# API Calls For Dashboard Service
---
[[toc]]
---

### 1. Get Status

**Endpoint:**
```
GET /auth/status
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}
```

### 2. Sign Up

**Endpoint:**
```
POST /auth/signup
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {
    "email": "<email>",
    "password": "<password>",
    "name": "<name>",
    "username": "<username>"
  }
}
```

### 3. Confirm Email (Signup)

**Endpoint:**
```
POST /auth/signup/confirm/:userEmail
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {
    "code": "<code>"
  }
}
```

### 4. Sign Out

**Endpoint:**
```
POST /auth/signout
```

**Example API Call:**
```json
{
  "Headers": {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {}
}
```

### 5. Sign In

**Endpoint:**
```
POST /auth/signin
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {
    "email": "<email>",
    "password": "<password>"
  }
}