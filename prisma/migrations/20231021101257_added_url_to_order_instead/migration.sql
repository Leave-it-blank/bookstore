/*
  Warnings:

  - You are about to drop the column `url` on the `sessions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_orderId_fkey`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `pay_url` MEDIUMTEXT NULL;

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `url`;
