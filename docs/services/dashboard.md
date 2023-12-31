# Dashboard Service Documentation

The `DashboardService` is a part of the OPEN-EDU server and provides functionality related to user dashboards and profiles.

---
[[toc]]
---


##  `validateTokenAndUserId`

```typescript
private validateTokenAndUserId(token: string, userId: string): BadRequestException | void
```

Validates the token and user ID.

- **Parameters:**
  - `token` (string): The token to validate.
  - `userId` (string): The user ID to validate.

- **Throws:**
  - `BadRequestException`: If the token or user ID is invalid.


---

##  `validateIdFormat`

```typescript
private validateIdFormat(id: string, field: string): number
```

Validates the ID format.

- **Parameters:**
  - `id` (string): The ID to validate.
  - `field` (string): The field name associated with the ID.

- **Returns:**
  - `number`: The parsed ID.

- **Throws:**
  - `BadRequestException`: If the ID format is invalid.


---

##  `verifyUser`

```typescript
async verifyUser(userId: string): NotFoundException | void
```

Verifies if a user is verified based on their user ID.

- **Parameters:**
  - `userId` (string): The ID of the user to verify.

- **Throws:**
  - `NotFoundException`: If the user is not verified.


---

##  `getPublicProfile`

```typescript
async getPublicProfile(profileId: string): NotFoundException | string | Profile
```

Retrieves the public profile of a user.

- **Parameters:**
  - `profileId` (string): The ID of the user's profile.

- **Returns:**
  - `Profile`: The public profile of the user.

- **Throws:**
  - `NotFoundException`: If the user is not found.


---

##  `getStatus`

```typescript
getStatus(): string
```

Retrieves the status of the authentication service.

- **Returns:**
  - `string`: A string indicating the status of the authentication service.


---

##  `getProfile`

```typescript
async getProfile(token: string, userId: string): NotFoundException | User
```

Retrieves the user profile.

- **Parameters:**
  - `token` (string): The user token.
  - `userId` (string): The user ID.

- **Returns:**
  - `User`: The user profile.

- **Throws:**
  - `NotFoundException`: If the user is not found.


---

##  `updateProfile`

```typescript
async updateProfile(token: string, userId: string, dto: DashboardDto): NotFoundException | User
```

Updates the user profile.

- **Parameters:**
  - `token` (string): The user token.
  - `userId` (string): The user ID.
  - `dto` (DashboardDto): The dashboard DTO containing the updated profile information.

- **Returns:**
  - `User`: The updated user profile.

- **Throws:**
  - `NotFoundException`: If the user is not found.


---

##  `updateSettings`

```typescript
async updateSettings(token: string, userId: string, dto: UserSettingsDto): UserSettings
```

Updates the user settings.

- **Parameters:**
  - `token` (string): The user token.
  - `userId` (string): The user ID.
  - `dto` (UserSettingsDto): The user settings DTO containing the updated settings information.

- **Returns:**
  - `UserSettings`: The updated user settings.


---

##  `getAchievements`

```typescript
async getAchievements(token: string, userId: string): NotFoundException | UserAchievements
```

Retrieves the user achievements.

- **Parameters:**
  - `token` (string): The user token.
  - `userId` (string): The user ID.

- **Returns:**
  - `UserAchievements`: The user achievements.

- **Throws:**
  - `NotFoundException`: If the user is not found.


---

##  `claimAchievement`

```typescript
async claimAchievement(token: string, userId: string, achievementId: string): NotFoundException | ConflictException | User
```

Claims an achievement for the user.

- **Parameters:**
  - `token` (string): The user token.
  - `userId` (string): The user ID.
  - `achievementId` (string): The ID of the achievement to claim.

- **Returns:**
  - `User`: The updated user profile.

- **Throws:**
  - `NotFoundException`: If the user or achievement is not found.
  - `ConflictException`: If the achievement is already claimed by the user.
