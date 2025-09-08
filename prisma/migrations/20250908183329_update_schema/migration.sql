-- DropForeignKey
ALTER TABLE "public"."products_exit" DROP CONSTRAINT "products_exit_product_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."products_exit" ADD CONSTRAINT "products_exit_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
