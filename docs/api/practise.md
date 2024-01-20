# API calls for practise

::: danger NOT IMPLEMENTED
The API calls for practise are not implemented yet.
:::

[[toc]]

## 1. Get Status

**Endpoint:**

```
GET /practise/status
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 2. Get All Practise

**Endpoint:**

```
GET /practise
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 3. Get specific practise

**Endpoint:**

```
GET /practise/:practiseId
```

::: details **Example API Call:**

```json
{
  "Params": {
    "practiseId": "5f9b3b5b9c9d440000f3b3b5"
  },
  "Headers": {},
  "Body": {}
}
```

:::

## 4. Sumbit practise

**Endpoint:**

```
POST /practise/completed/:practiseId
```

::: details **Example API Call:**

```json
{
  "Params": {
    "practiseId": "5f9b3b5b9c9d440000f3b3b5"
  },
  "Headers": {
    "userId": "1",
    "token": "token"
  },
  "Body": {}
}
```

:::
