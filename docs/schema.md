# Schema Documentation

This schema defines the data models for a startup application. It includes models for users, email service subscriptions, newsletter subscriptions, user settings, courses, modules, quizzes, assignments, and achievements.

## User Model

The `User` model represents a user in the application. It has the following fields:

- `id`: An auto-incrementing integer representing the user's ID.
- `username`: A unique string representing the user's username.
- `photo`: A string representing the URL of the user's photo.
- `name`: A string representing the user's name.
- `bio`: A string representing the user's biography.
- `email`: A unique string representing the user's email address.
- `password`: A string representing the user's password.
- `emailVerified`: A boolean indicating whether the user's email has been verified.
- `role`: A string representing the user's role.
- `settings`: A relation to the `UserSettings` model.
- `token`: A string representing the user's token.
- `interests`: An array of strings representing the user's interests.
- `achievements`: An array of `Achievement` models representing the user's achievements.
- `userSettingsId`: An integer representing the ID of the user's settings.
- `CourseEnrollment`: An array of `CourseEnrollment` models representing the user's course enrollments.
- `EmailServiceSubscription`: A relation to the `EmailServiceSubscription` model.
- `emailServiceSubscriptionId`: An integer representing the ID of the user's email service subscription.

## EmailServiceSubscription Model

The `EmailServiceSubscription` model represents a user's email service subscription. It has the following fields:

- `id`: An auto-incrementing integer representing the subscription's ID.
- `userId`: An integer representing the ID of the user.
- `CourseUpdates`: A boolean indicating whether the user wants to receive course updates via email.
- `montlyUpdates`: A boolean indicating whether the user wants to receive monthly updates via email.
- `security`: A boolean indicating whether the user wants to receive security-related emails.
- `emailService`: A boolean indicating whether the user wants to receive general email service notifications.
- `updatedAt`: A datetime representing the last update time of the subscription.
- `User`: A relation to the `User` model.

## NewsletterSubscription Model

The `NewsletterSubscription` model represents a user's newsletter subscription. It has the following fields:

- `id`: An auto-incrementing integer representing the subscription's ID.
- `Email`: An array of strings representing the email addresses subscribed to the newsletter.
- `newsletter`: A boolean indicating whether the user wants to receive the newsletter.
- `updatedAt`: A datetime representing the last update time of the subscription.

## UserSettings Model

The `UserSettings` model represents a user's settings. It has the following fields:

- `id`: An auto-incrementing integer representing the settings' ID.
- `userId`: An integer representing the ID of the user.
- `publicProfile`: A boolean indicating whether the user's profile is public.
- `publicEmail`: A boolean indicating whether the user's email is public.
- `publicBio`: A boolean indicating whether the user's bio is public.
- `publicPhoto`: A boolean indicating whether the user's photo is public.
- `publicName`: A boolean indicating whether the user's name is public.
- `publicInterests`: A boolean indicating whether the user's interests are public.
- `User`: A relation to the `User` model.

## Course Model

The `Course` model represents a course in the application. It has the following fields:

- `id`: An auto-incrementing integer representing the course's ID.
- `name`: A string representing the course's name.
- `description`: A string representing the course's description.
- `image`: A string representing the URL of the course's image.
- `madeByUserGit`: An array of strings representing the GitHub usernames of users who contributed to the course (Git version).
- `madeByUser`: An array of strings representing the usernames of users who contributed to the course.
- `GithubLink`: An optional string representing the GitHub repository link of the course.
- `modules`: An array of `Module` models representing the modules of the course.
- `userId`: An optional integer representing the ID of the user who created the course.
- `Achievement`: An array of `Achievement` models representing the achievements associated with the course.
- `tags`: An array of strings representing the tags associated with the course.
- `CourseEnrollment`: An array of `CourseEnrollment` models representing the enrollments in the course.

## Module Model

The `Module` model represents a module in a course. It has the following fields:

- `id`: An auto-incrementing integer representing the module's ID.
- `name`: A string representing the module's name.
- `type`: A string representing the module's type.
- `description`: A string representing the module's description.
- `madeByUserGit`: An array of strings representing the GitHub usernames of users who contributed to the module (Git version).
- `madeByUser`: An array of strings representing the usernames of users who contributed to the module.
- `GithubLink`: An optional string representing the GitHub repository link of the module.
- `numbering`: An integer representing the module's numbering.
- `content`: An optional string representing the module's content.
- `video`: An optional string representing the URL of the module's video.
- `image`: A string representing the URL of the module's image.
- `courseId`: An integer representing the ID of the course the module belongs to.
- `Course`: A relation to the `Course` model.

## Quiz Model

The `Quiz` model represents a quiz in the application. It has the following fields:

- `id`: An auto-incrementing integer representing the quiz's ID.
- `Question`: A string representing the quiz question.
- `Answer`: An array of strings representing the correct answers to the quiz.
- `Options`: An array of strings representing the options for the quiz.
- `image`: An optional string representing the URL of the quiz's image.
- `Assignment`: A relation to the `Assignment` model.
- `assignmentId`: An optional integer representing the ID of the assignment the quiz belongs to.

## Assignment Model

The `Assignment` model represents an assignment in the application. It has the following fields:

- `id`: An auto-incrementing integer representing the assignment's ID.
- `title`: A string representing the assignment's title.
- `description`: A string representing the assignment's description.
- `image`: An optional string representing the URL of the assignment's image.
- `Quiz`: An array of `Quiz` models representing the quizzes associated with the assignment.

## Achievement Model

The `Achievement` model represents an achievement in the application. It has the following fields:

- `id`: An auto-incrementing integer representing the achievement's ID.
- `name`: A string representing the achievement's name.
- `icon`: A string representing the URL of the achievement's icon.
- `description`: A string representing the achievement's description.
- `courseId`: An integer representing the ID of the course associated with the achievement.
- `userId`: An integer representing the ID of the user associated with the achievement.
- `course`: A relation to the `Course` model.
- `user`: A relation to the `User` model.

## CourseEnrollment Model

The `CourseEnrollment` model represents a user's enrollment in a course. It has the following fields:

- `id`: An auto-incrementing integer representing the enrollment's ID.
- `userId`: An integer representing the ID of the user.
- `courseId`: An integer representing the ID of the course.
- `enrolledAt`: A datetime representing the enrollment date.
- `completedAt`: A datetime representing the completion date (optional).
- `course`: A relation to the `Course` model.
- `name`: A string representing the course's name.
- `description`: A string representing the course's description.
- `image`: A string representing the URL of the course's image.
- `completed`: A boolean indicating whether the course has been completed.
- `progress`: An integer representing the progress of the course.
- `totalModules`: An integer representing the total number of modules in the course.
- `User`: A relation to the `User` model.
- `completedModulesId`: An array of integers representing the IDs of the completed modules in the course.
