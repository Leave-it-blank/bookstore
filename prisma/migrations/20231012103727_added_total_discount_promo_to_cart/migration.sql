-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `discount` DOUBLE NULL,
    ADD COLUMN `promo` VARCHAR(191) NULL,
    ADD COLUMN `total` DOUBLE NULL;
