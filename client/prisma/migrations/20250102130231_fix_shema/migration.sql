/*
  Warnings:

  - A unique constraint covering the columns `[room_id]` on the table `topics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_room_id_fkey";

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "topic_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "topics_room_id_key" ON "topics"("room_id");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
