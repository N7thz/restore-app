/*
  Warnings:

  - You are about to drop the column `username` on the `products_exit` table. All the data in the column will be lost.
  - Added the required column `name` to the `products_exit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."products_exit" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;
