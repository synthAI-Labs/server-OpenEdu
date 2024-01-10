Sure, here's an updated version of your API documentation:

# API Calls For Learn Service

[[toc]]

## 1. Get Status

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

---

## 2. Get All Courses

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

---

## 3. Get Course by ID with Topics Covered

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

---

## 4. Enroll in a Course

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

---

## 5. Get Module based on id
**Endpoint:**
```
GET /learn/courses/m/:moduleId
```

**Example API Call:**
```json
{
  "Headers": {},
  "Body": {}
}
```

---

## 6. Complete an module
**Endpoint:**
```
POST /learn/courses/complete/m/:moduleId
```

**Example Api Call:**
```json
{
  "Headers": {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {}
}
```