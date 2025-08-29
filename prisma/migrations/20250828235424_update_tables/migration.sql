/*
  Warnings:

  - You are about to drop the column `productExistId` on the `products` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "product_inventories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "product_exist_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "product_inventories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_inventories_product_exist_id_fkey" FOREIGN KEY ("product_exist_id") REFERENCES "products_exist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image_url" TEXT,
    "description" TEXT,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "min_quantity" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_products" ("createdAt", "description", "id", "image_url", "min_quantity", "name", "price", "quantity", "updatedAt") SELECT "createdAt", "description", "id", "image_url", "min_quantity", "name", "price", "quantity", "updatedAt" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "product_inventories_product_id_product_exist_id_key" ON "product_inventories"("product_id", "product_exist_id");
