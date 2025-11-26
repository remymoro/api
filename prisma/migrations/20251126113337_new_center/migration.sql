/*
  Warnings:

  - Added the required column `address` to the `Center` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Center" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;
