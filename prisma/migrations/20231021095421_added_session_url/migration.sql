/*
  Warnings:

  - Added the required column `url` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `url` MEDIUMTEXT NOT NULL;
