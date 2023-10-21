/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `sessions_orderId_key` ON `sessions`(`orderId`);

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
