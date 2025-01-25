/*
  Warnings:

  - The `value` column on the `votes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "votes" DROP COLUMN "value",
ADD COLUMN     "value" INTEGER;
