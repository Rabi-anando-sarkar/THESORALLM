/*
  Warnings:

  - You are about to drop the column `defaultModel` on the `shelf` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shelf" DROP COLUMN "defaultModel",
ADD COLUMN     "selectModel" TEXT NOT NULL DEFAULT 'gpt-4o-mini';
