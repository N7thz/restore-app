-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image_url" TEXT,
    "description" TEXT,
    "price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "quantity" REAL NOT NULL,
    "min_quantity" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "products_exit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "username" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "products_exit_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "action" TEXT NOT NULL
);
