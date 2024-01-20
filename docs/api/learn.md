# API Calls For Learn Service

::: warning

1. Implement in frontend

:::

[[toc]]

## 1. Get Status

**Endpoint:**

```
GET /learn/courses/status
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 2. Get All Courses

**Endpoint:**

```
GET /learn/courses
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 3. Get Course by ID with Topics Covered

**Endpoint:**

```
GET /learn/courses/:id
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 4. Enroll in a Course

**Endpoint:**

```
POST /learn/courses/enroll/:id
```

::: details **Example API Call:**

```json
{
  "Headers": {
    "authorization": "<token>",
    "user_id": "<userId>"
  },
  "Body": {},
  "cookie": "access_token=<token>"
}
```

:::

## 5. Get Module based on id

**Endpoint:**

```
GET /learn/courses/m/:moduleId
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 6. Complete an module

**Endpoint:**

```
POST /learn/courses/complete/m/:moduleId
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
  "Body": {},
  "cookie": "access_token=<token>"
}
```

:::
