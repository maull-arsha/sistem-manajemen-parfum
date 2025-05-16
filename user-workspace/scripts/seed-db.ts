import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.sale.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Create categories
  const parfumPria = await prisma.category.create({
    data: { name: 'Parfum Pria' },
  })
  const parfumWanita = await prisma.category.create({
    data: { name: 'Parfum Wanita' },
  })
  const parfumUnisex = await prisma.category.create({
    data: { name: 'Parfum Unisex' },
  })

  // Create products
  const blueDeChanel = await prisma.product.create({
    data: {
      name: 'Blue de Chanel',
      description: 'Aroma woody dan citrus yang maskulin',
      price: 1500000,
      stock: 50,
      categoryId: parfumPria.id,
    },
  })

  const missDior = await prisma.product.create({
    data: {
      name: 'Miss Dior',
      description: 'Aroma floral yang feminin dan elegan',
      price: 1800000,
      stock: 40,
      categoryId: parfumWanita.id,
    },
  })

  const ckOne = await prisma.product.create({
    data: {
      name: 'CK One',
      description: 'Aroma segar dan ringan untuk semua gender',
      price: 1200000,
      stock: 60,
      categoryId: parfumUnisex.id,
    },
  })

  // Create sales
  await prisma.sale.createMany({
    data: [
      {
        productId: blueDeChanel.id,
        quantity: 2,
        total: blueDeChanel.price * 2,
        date: new Date(),
      },
      {
        productId: missDior.id,
        quantity: 1,
        total: missDior.price,
        date: new Date(),
      },
      {
        productId: ckOne.id,
        quantity: 3,
        total: ckOne.price * 3,
        date: new Date(),
      },
    ],
  })

  console.log('Sample data seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
