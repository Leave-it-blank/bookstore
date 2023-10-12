/*
  Warnings:

  - You are about to alter the column `priceDigital` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `priceHardCopy` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `priceDigital` DOUBLE NOT NULL,
    MODIFY `priceHardCopy` DOUBLE NOT NULL;
