/*
  Warnings:

  - You are about to drop the column `GithubLink` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `madeByUser` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `madeByUserGit` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_moduleId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "GithubLink",
DROP COLUMN "madeByUser",
DROP COLUMN "madeByUserGit",
DROP COLUMN "moduleId",
ADD COLUMN     "assignmentId" INTEGER;

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
