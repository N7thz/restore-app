"use server"

import { FindManyProductsWithFilterProps } from "@/components/forms/form-export-prodcts-exit/use-form-export-prodcts-exit"
import { prisma } from "@/lib/prisma"
import { ProductExit } from "@prisma/client"

type Type = keyof ProductExit

function arrayToObjet(array: Type[]) {
  const omit: { [key: string]: boolean } = {}

  for (const item of array) {
    omit[item] = true
  }

  return omit
}

function removeFalse(obj: { [k: string]: unknown }) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, valor]) => valor === false)
  )
}

export async function findManyProductsExitWithFilter({
  takeString,
  products,
}: FindManyProductsWithFilterProps) {
  const { dateStart, dateEnd } = products

  const array = Object.keys(removeFalse(products))

  const omit = arrayToObjet(array as Type[])

  const take = takeString !== "all" ? Number(takeString) : undefined

  const filteredProducts = await prisma.productExit.findMany({
    where: {
      createdAt: {
        gte: takeString !== "all" ? new Date(dateStart) : undefined,
        lte: takeString !== "all" ? new Date(dateEnd) : undefined,
      },
    },
    include: {
      product: true,
    },
    omit: {
      ...omit,
      updatedAt: true,
    },
    take,
  })

  if (filteredProducts.length === 0)
    throw new Error("Não foram encontrados dados dentro desse intervalo", {
      cause: "você passou um intervalo onde não existe um produto.",
    })

  return filteredProducts
}
