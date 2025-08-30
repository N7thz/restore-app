export const queryKeys = {
    findAllNotifications: () => ["find-all-notifications"],
    findAllProducts: () => ["find-all-products"],
    findProductById: (id: string) => ["find-product-by-id", id],
    createManyProducts: () => ["create-many-products"],
    deleteProduct: () => ["delete-product"],
    updateProduct: (id: string) => ["update-product", id]
}