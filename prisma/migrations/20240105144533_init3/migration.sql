/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `NewsletterSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscription_Email_key" ON "NewsletterSubscription"("Email");
