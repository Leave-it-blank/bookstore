/*
  Warnings:

  - A unique constraint covering the columns `[titleSlug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Product_titleSlug_key` ON `Product`(`titleSlug`);
