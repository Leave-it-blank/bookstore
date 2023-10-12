/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_authorId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Chapter_id_key` ON `Chapter`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Order_id_key` ON `Order`(`id`);
