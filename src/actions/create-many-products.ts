import { prisma } from "@/lib/prisma"
import { Prisma } from '@prisma/client'

export async function createManyProducts() {

    const products: Prisma.ProductCreateInput[] = [
        {
            name: 'Notebook Gamer',
            description: 'Notebook para jogos de alta performance',
            price: 4500.99,
            quantity: 15,
            minQuantity: 5,
        },
        {
            name: 'Smartphone Premium',
            description: 'Celular flagship com câmera de 108MP',
            price: 3200.50,
            quantity: 8,
            minQuantity: 3
        },
        {
            name: 'Tablet Android',
            description: 'Tablet 10 polegadas com caneta digital',
            price: 1200.00,
            quantity: 20,
            minQuantity: 10
        },
        {
            name: 'Fone Bluetooth',
            description: 'Fone sem fio com cancelamento de ruído',
            price: 350.75,
            quantity: 25,
            minQuantity: 8
        },
        {
            name: 'Monitor 4K',
            description: 'Monitor 27 polegadas resolução 4K',
            price: 1800.00,
            quantity: 12,
            minQuantity: 4
        },
        {
            name: 'Teclado Mecânico',
            description: 'Teclado mecânico RGB switches azuis',
            price: 450.25,
            quantity: 30,
            minQuantity: 12
        },
        {
            name: 'Mouse Gamer',
            description: 'Mouse com DPI ajustável e iluminação RGB',
            price: 280.90,
            quantity: 18,
            minQuantity: 6
        },
        {
            name: 'Webcam Full HD',
            description: 'Webcam 1080p com microfone integrado',
            price: 320.00,
            quantity: 22,
            minQuantity: 7
        },
        {
            name: 'SSD 1TB NVMe',
            description: 'SSD de alta velocidade para games',
            price: 580.00,
            quantity: 14,
            minQuantity: 5
        },
        {
            name: 'Placa de Vídeo RTX',
            description: 'Placa de vídeo para jogos em 4K',
            price: 5200.00,
            quantity: 6,
            minQuantity: 2
        }
    ]

    await prisma.product.createMany({
        data: products
    })
}
