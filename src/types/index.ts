export type ResponseProducts<T> = Promise<{
    products: T[]
    count: number
}> 