-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `activedat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `link` VARCHAR(191) NULL;
