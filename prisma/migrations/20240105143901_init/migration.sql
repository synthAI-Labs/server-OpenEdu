-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "token" TEXT NOT NULL DEFAULT 'demo',
    "interests" TEXT[],
    "userSettingsId" INTEGER NOT NULL,
    "emailServiceSubscriptionId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailServiceSubscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "CourseUpdates" BOOLEAN NOT NULL DEFAULT true,
    "montlyUpdates" BOOLEAN NOT NULL DEFAULT true,
    "security" BOOLEAN NOT NULL DEFAULT true,
    "emailService" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailServiceSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscription" (
    "id" SERIAL NOT NULL,
    "Email" TEXT[],
    "newsletter" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "publicProfile" BOOLEAN NOT NULL DEFAULT true,
    "publicEmail" BOOLEAN NOT NULL DEFAULT true,
    "publicBio" BOOLEAN NOT NULL DEFAULT true,
    "publicPhoto" BOOLEAN NOT NULL DEFAULT true,
    "publicName" BOOLEAN NOT NULL DEFAULT true,
    "publicInterests" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "madeByUserGit" TEXT[],
    "madeByUser" TEXT[],
    "GithubLink" TEXT,
    "userId" INTEGER,
    "tags" TEXT[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtopic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "madeByUserGit" TEXT[],
    "madeByUser" TEXT[],
    "GithubLink" TEXT,
    "courseId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Subtopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "madeByUserGit" TEXT[],
    "madeByUser" TEXT[],
    "GithubLink" TEXT,
    "content" TEXT,
    "video" TEXT,
    "image" TEXT NOT NULL,
    "subtopicId" INTEGER NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT[],
    "Options" TEXT[],
    "madeByUserGit" TEXT[],
    "madeByUser" TEXT[],
    "GithubLink" TEXT,
    "image" TEXT,
    "moduleId" INTEGER,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "totalModules" INTEGER NOT NULL,
    "completedModulesId" INTEGER[],

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES "UserSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_emailServiceSubscriptionId_fkey" FOREIGN KEY ("emailServiceSubscriptionId") REFERENCES "EmailServiceSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtopic" ADD CONSTRAINT "Subtopic_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Subtopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
