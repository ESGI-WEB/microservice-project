/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_OrderToProduct` DROP FOREIGN KEY `_OrderToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_OrderToProduct` DROP FOREIGN KEY `_OrderToProduct_B_fkey`;

-- DropTable
DROP TABLE `Order`;

-- DropTable
DROP TABLE `_OrderToProduct`;
