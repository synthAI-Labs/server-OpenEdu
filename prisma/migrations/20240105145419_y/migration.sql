/*
  Warnings:

  - The `Email` column on the `NewsletterSubscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "NewsletterSubscription_Email_key";

-- AlterTable
ALTER TABLE "NewsletterSubscription" DROP COLUMN "Email",
ADD COLUMN     "Email" TEXT[];
