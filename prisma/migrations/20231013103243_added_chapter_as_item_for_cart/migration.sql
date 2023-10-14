-- AlterTable
ALTER TABLE `CartItems` ADD COLUMN `chapterId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CartItems` ADD CONSTRAINT `CartItems_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
