-- DropForeignKey
ALTER TABLE `CartItems` DROP FOREIGN KEY `CartItems_productId_fkey`;

-- AlterTable
ALTER TABLE `CartItems` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'DIGITAL',
    MODIFY `productId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CartItems` ADD CONSTRAINT `CartItems_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
