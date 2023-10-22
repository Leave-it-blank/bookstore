/*
  Warnings:

  - You are about to drop the column `activedat` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `activedate` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `activedat`,
    ADD COLUMN `activedate` DATETIME(3) NOT NULL;
