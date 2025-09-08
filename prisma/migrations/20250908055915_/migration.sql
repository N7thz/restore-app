-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products_exit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "username" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "products_exit_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products_exit" ("created_at", "description", "id", "product_id", "quantity", "region", "updated_at", "username") SELECT "created_at", "description", "id", "product_id", "quantity", "region", "updated_at", "username" FROM "products_exit";
DROP TABLE "products_exit";
ALTER TABLE "new_products_exit" RENAME TO "products_exit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
