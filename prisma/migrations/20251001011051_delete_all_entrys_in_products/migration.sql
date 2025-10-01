-- DropForeignKey
ALTER TABLE "public"."products_entry" DROP CONSTRAINT "products_entry_product_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."products_entry" ADD CONSTRAINT "products_entry_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
