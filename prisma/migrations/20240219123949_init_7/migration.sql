/*
  Warnings:

  - You are about to drop the column `DeployedLink` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `content` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userId_fkey";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "DeployedLink",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "userId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserProjects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "DeployedLink" TEXT,
    "Githublink" TEXT,

    CONSTRAINT "UserProjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProjects" ADD CONSTRAINT "UserProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
