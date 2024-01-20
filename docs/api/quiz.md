# API calls for quiz

::: danger NOT IMPLEMENTED
The API calls for quiz are not implemented yet.
:::

[[toc]]

## 1. Get Status

**Endpoint:**

```
GET /quiz/status
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 2. Get All Quiz

**Endpoint:**

```
GET /quiz
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 3. Get specific quiz

**Endpoint:**

```
GET /quiz/:quizId
```

::: details **Example API Call:**

```json
{
  "Params": {
    "quizId": "5f9b3b5b9c9d440000f3b3b5"
  },
  "Headers": {},
  "Body": {}
}
```

:::

## 4. Sumbit quiz

**Endpoint:**

```
POST /quiz/submit
```

::: details **Example API Call:**

```json
{
  "Headers": {
    "userId": "1",
    "token": "token"
  },
  "Body": {
    "marks": 10
  }
}
```

:::
