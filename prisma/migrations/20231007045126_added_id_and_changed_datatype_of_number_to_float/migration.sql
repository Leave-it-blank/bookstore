/*
  Warnings:

  - The primary key for the `Chapter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `number` on the `Chapter` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `id` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chapter` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `number` DOUBLE NOT NULL,
    ADD PRIMARY KEY (`id`);
