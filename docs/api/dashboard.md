# API Calls For Dashboard Service

::: warning TODO

1. Implement in frontend

:::

[[toc]]

---

## 1. Get Status

**Endpoint:**

```
GET /status
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 2. Get Public Profile

**Endpoint:**

```
GET /p/:username
```

::: details **Example API Call:**

```json
{
  "Headers": {},
  "Body": {}
}
```

:::

## 3. Get User Profile

**Endpoint:**

```
POST /dashboard/profile
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

## 4. Update User Profile

**Endpoint:**

```
PUT /dashboard/profile
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
    "name": "<name>",
    "bio": "<bio>",
    "photo": "<photo>",
    "email": "<email>",
    "username": "<username>",
    "interests": ["<interest1>", "<interest2>"]
  }
}
```

:::

## 5. Update User Settings

**Endpoint:**

```
PUT /dashboard/profile/settings
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
    "publicProfile": true,
    "publicEmail": true,
    "publicBio": true,
    "publicPhoto": true,
    "publicName": true,
    "publicInterests": true
  }
}
```

:::

## 6. Get User Achievements

**Endpoint:**

```
POST /dashboard/achievements
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

## 7. Claim Achievement

**Endpoint:**

```
POST /dashboard/achievements/:achievementId/claim
```

::: warning
Decide Functionality
:::

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
