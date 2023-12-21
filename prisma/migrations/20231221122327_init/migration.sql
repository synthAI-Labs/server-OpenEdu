-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "publicBio" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "publicInterests" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "publicName" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "publicPhoto" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "publicEmail" SET DEFAULT true;
