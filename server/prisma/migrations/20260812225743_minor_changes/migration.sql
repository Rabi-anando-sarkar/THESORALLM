/*
  Warnings:

  - Changed the type of `selectModel` on the `shelf` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ChatModel" AS ENUM ('gpt_4o_mini', 'gpt_4o');

-- AlterTable
ALTER TABLE "shelf" DROP COLUMN "selectModel",
ADD COLUMN     "selectModel" "ChatModel" NOT NULL;
