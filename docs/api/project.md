# API calls for Project

::: danger NOT IMPLEMENTED
The API calls for project are not implemented yet.
:::

[[toc]]

## 1. Get Status

**Endpoint:**

```
GET /project/status
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 2. Get All Project

**Endpoint:**

```
GET /project
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 3. Get specific project

**Endpoint:**

```
GET /project/:projectId
```

::: details **Example API Call:**

```json
{
  "Params": {
    "projectId": "5f9b3b5b9c9d440000f3b3b5"
  },
  "Headers": {},
  "Body": {}
}
```

:::

## 4. Complete project

**Endpoint:**

```
POST /project/completed/:projectId
```

::: details **Example API Call:**

```json
{
  "Params": {
    "projectId": "5f9b3b5b9c9d440000f3b3b5"
  },
  "Headers": {
    "userId": "1",
    "token": "token"
  },
  "Body": {
    "githubLink": "git+...."
  }
}
```

:::
