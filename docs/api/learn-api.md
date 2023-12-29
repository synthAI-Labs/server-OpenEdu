# API Calls For learn Service

---
[[toc]]
---

### 1. Get Status

**Endpoint:**
```
GET /learn/courses/status
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}
```

### 2. Get All Courses

**Endpoint:**
```
GET /learn/courses
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}
```

### 3. Get Course by ID with Topics Covered

**Endpoint:**
```
GET /learn/courses/:id
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}
```

### 4. Enroll in a Course

**Endpoint:**
```
POST /learn/courses/enroll/:id
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

### 5. Get Topics Covered in a Course

**Endpoint:**
```
GET /learn/courses/:id/:topicId
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}
```

### 6. Get Module of a Course

**Endpoint:**
```
GET /learn/courses/:id/:topicId/:moduleId
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}