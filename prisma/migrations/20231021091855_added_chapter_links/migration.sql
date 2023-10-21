/*
  Warnings:

  - You are about to drop the column `chapterId` on the `links` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `links` DROP FOREIGN KEY `links_chapterId_fkey`;

-- AlterTable
ALTER TABLE `links` DROP COLUMN `chapterId`,
    ADD COLUMN `chapterNumber` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `links` ADD CONSTRAINT `links_chapterNumber_fkey` FOREIGN KEY (`chapterNumber`) REFERENCES `Chapter`(`number`) ON DELETE SET NULL ON UPDATE CASCADE;
