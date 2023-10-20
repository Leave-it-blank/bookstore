/*
  Warnings:

  - Made the column `orderId` on table `sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sessions` MODIFY `orderId` INTEGER NOT NULL;
