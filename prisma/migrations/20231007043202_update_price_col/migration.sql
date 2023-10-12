/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chapter` ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `price`;

-- CreateIndex
CREATE UNIQUE INDEX `Author_id_key` ON `Author`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Chapter_number_key` ON `Chapter`(`number`);
