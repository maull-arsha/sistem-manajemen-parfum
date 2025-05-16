const db = require('../src/lib/db').default;

async function seed() {
  try {
    await db.connect()
    console.log('Connected to MongoDB')

    // Create categories
    const categories = await Promise.all([
      db.categories.create({
        name: 'Parfum Pria',
      }),
      db.categories.create({
        name: 'Parfum Wanita',
      }),
      db.categories.create({
        name: 'Parfum Unisex',
      }),
    ])
    console.log('Categories created:', categories)

    // Create products
    const products = await Promise.all([
      db.products.create({
        name: 'Blue de Chanel',
        description: 'Aroma woody dan citrus yang maskulin',
        price: 1500000,
        stock: 50,
        categoryId: categories[0]._id,
      }),
      db.products.create({
        name: 'Miss Dior',
        description: 'Aroma floral yang feminin dan elegan',
        price: 1800000,
        stock: 40,
        categoryId: categories[1]._id,
      }),
      db.products.create({
        name: 'CK One',
        description: 'Aroma segar dan ringan untuk semua gender',
        price: 1200000,
        stock: 60,
        categoryId: categories[2]._id,
      }),
      db.products.create({
        name: 'Acqua di Gio',
        description: 'Aroma aquatic yang segar dan maskulin',
        price: 1600000,
        stock: 45,
        categoryId: categories[0]._id,
      }),
      db.products.create({
        name: 'La Vie Est Belle',
        description: 'Aroma manis dan hangat yang mempesona',
        price: 1700000,
        stock: 35,
        categoryId: categories[1]._id,
      }),
    ])
    console.log('Products created:', products)

    // Create sample sales
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const twoDaysAgo = new Date(today)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    const sales = await Promise.all([
      db.sales.create({
        productId: products[0]._id,
        quantity: 2,
        total: products[0].price * 2,
        date: today,
      }),
      db.sales.create({
        productId: products[1]._id,
        quantity: 1,
        total: products[1].price,
        date: today,
      }),
      db.sales.create({
        productId: products[2]._id,
        quantity: 3,
        total: products[2].price * 3,
        date: yesterday,
      }),
      db.sales.create({
        productId: products[3]._id,
        quantity: 2,
        total: products[3].price * 2,
        date: yesterday,
      }),
      db.sales.create({
        productId: products[4]._id,
        quantity: 1,
        total: products[4].price,
        date: twoDaysAgo,
      }),
    ])
    console.log('Sales created:', sales)

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    process.exit(0)
  }
}

seed()
