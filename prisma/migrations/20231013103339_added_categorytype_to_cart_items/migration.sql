/*
  Warnings:

  - Added the required column `category` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CartItems` ADD COLUMN `category` ENUM('BOOK', 'CHAPTER') NOT NULL;
