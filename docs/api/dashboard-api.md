# API Calls For Dashboard Service

---
[[toc]]
--- 


##  1. Get Status

**Endpoint:**
```
GET /status
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}
```


--- 


##  2. Get Public Profile

**Endpoint:**
```
GET /p/:username
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}
```


--- 


## 3. Get User Profile

**Endpoint:**
```
POST /dashboard/profile
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


## 4. Update User Profile

**Endpoint:**
```
PUT /dashboard/profile
```

**Example API Call:**
```json
{
  "Headers": {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {
    "name": "<name>",
    "bio": "<bio>",
    "photo": "<photo>",
    "email": "<email>",
    "username": "<username>",
    "interests": ["<interest1>", "<interest2>"]
  }
}
```


--- 


##  5. Update User Settings

**Endpoint:**
```
PUT /dashboard/profile/settings
```

**Example API Call:**
```json
{
  "Headers": {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {
    "publicProfile": true,
    "publicEmail": true,
    "publicBio": true,
    "publicPhoto": true,
    "publicName": true,
    "publicInterests": true
  }
}
```


--- 


##  6. Get User Achievements

**Endpoint:**
```
POST /dashboard/achievements
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


##  7. Claim Achievement

**Endpoint:**
```
POST /dashboard/achievements/:achievementId/claim
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
