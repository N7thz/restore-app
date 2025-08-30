-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image_url" TEXT,
    "description" TEXT,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" REAL NOT NULL,
    "min_quantity" REAL NOT NULL DEFAULT 0,
    "productExistId" TEXT,
    CONSTRAINT "products_productExistId_fkey" FOREIGN KEY ("productExistId") REFERENCES "products_exist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products_exist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "name_user" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "quantity" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false
);
