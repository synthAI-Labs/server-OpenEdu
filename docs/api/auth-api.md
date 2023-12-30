# API Calls For Dashboard Service
---
[[toc]]
---


##  1. Get Status

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


--- 


##  2. Sign Up

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


--- 


##  3. Confirm Email (Signup)

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


--- 


##  4. Sign Out

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


--- 


##  5. Forgot Password

**Endpoint:**
```
POST /auth/password/forgot
```

**Example API Call:**
```json
{
  "Headers" : {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {
    "userEmail": "<email>"
  }
}
```


--- 


##  6. Confirm Forgot Password's Email

**Endpoint:**
```
POST /auth/password/forgot/confirm/:userEmail
```

**Example API Call:**
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


--- 


##  7. Change Password

**Endpoint:**
```
POST /auth/password/change
```

**Example API Call:**
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


--- 


##  8. Sign In

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