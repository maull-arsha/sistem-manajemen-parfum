import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create initial categories
    const categories = await prisma.category.createMany({
      data: [
        { name: 'Parfum Pria' },
        { name: 'Parfum Wanita' },
        { name: 'Parfum Unisex' },
      ],
      skipDuplicates: true,
    })

    // Create admin user
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin',
        password: 'admin123', // In production, use hashed password
        role: 'ADMIN',
      },
    })

    // Create sample products
    const products = await prisma.product.createMany({
      data: [
        {
          name: 'Blue de Chanel',
          description: 'A woody aromatic fragrance for men',
          price: 1500000,
          stock: 10,
          categoryId: 1,
        },
        {
          name: 'Miss Dior',
          description: 'A floral fragrance for women',
          price: 1800000,
          stock: 8,
          categoryId: 2,
        },
        {
          name: 'CK One',
          description: 'A citrus aromatic fragrance for everyone',
          price: 1200000,
          stock: 15,
          categoryId: 3,
        },
      ],
      skipDuplicates: true,
    })

    console.log('Database initialized with sample data')
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
