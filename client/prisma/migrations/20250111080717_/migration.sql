/*
  Warnings:

  - You are about to drop the column `topic_id` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `topic_id` on the `votes` table. All the data in the column will be lost.
  - You are about to drop the `room_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `topics` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[room_id,user_id]` on the table `votes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_id` to the `votes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_room_id_fkey";

-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_topic_id_fkey";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "topic_id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "room_id";

-- AlterTable
ALTER TABLE "votes" DROP COLUMN "topic_id",
ADD COLUMN     "room_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "room_users";

-- DropTable
DROP TABLE "topics";

-- DropEnum
DROP TYPE "TopicStatus";

-- CreateIndex
CREATE UNIQUE INDEX "votes_room_id_user_id_key" ON "votes"("room_id", "user_id");

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
