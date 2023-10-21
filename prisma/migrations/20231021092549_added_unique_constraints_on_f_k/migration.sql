/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `links` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapterNumber]` on the table `links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `links_productId_key` ON `links`(`productId`);

-- CreateIndex
CREATE UNIQUE INDEX `links_chapterNumber_key` ON `links`(`chapterNumber`);
