const mongoose = require('mongoose')
const ProductModel = require('../models/Product').default
const CategoryModel = require('../models/Category').default
const SaleModel = require('../models/Sale').default

const MONGODB_URI = 'mongodb+srv://maullsarsha:dfHYCoGejBeDoIdg@cluster0.5nzyqbz.mongodb.net/'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connect() {
  if (cached?.conn) {
    return cached.conn
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

// Unified database interface
const db = {
  connect,
  models: {
    Product: ProductModel,
    Category: CategoryModel,
    Sale: SaleModel,
  },
  products: {
    findMany: async (options = {}) => {
      await connect()
      return ProductModel.find(options.where || {})
        .populate(options.include?.category ? 'category' : '')
    },

    create: async (data) => {
      await connect()
      const product = new ProductModel(data)
      await product.save()
      return product.populate('category')
    },

    update: async (where, data) => {
      await connect()
      return ProductModel.findOneAndUpdate(where, data, { new: true })
        .populate('category')
    },

    delete: async (where) => {
      await connect()
      return ProductModel.findOneAndDelete(where)
    }
  },

  categories: {
    findMany: async (options = {}) => {
      await connect()
      return CategoryModel.find(options.where || {})
        .populate(options.include?.products ? 'products' : '')
    },

    create: async (data) => {
      await connect()
      const category = new CategoryModel(data)
      await category.save()
      return category
    },

    update: async (where, data) => {
      await connect()
      return CategoryModel.findOneAndUpdate(where, data, { new: true })
    },

    delete: async (where) => {
      await connect()
      return CategoryModel.findOneAndDelete(where)
    }
  },

  sales: {
    findMany: async (options = {}) => {
      await connect()
      return SaleModel.find(options.where || {})
        .populate(options.include?.product ? 'product' : '')
        .sort({ date: -1 })
    },

    create: async (data) => {
      await connect()
      const sale = new SaleModel(data)
      await sale.save()
      return sale.populate('product')
    },

    update: async (where, data) => {
      await connect()
      return SaleModel.findOneAndUpdate(where, data, { new: true })
        .populate('product')
    },

    delete: async (where) => {
      await connect()
      return SaleModel.findOneAndDelete(where)
    },

    getAnalytics: async (startDate, endDate) => {
      await connect()
      return SaleModel.aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: '$total' },
            totalQuantity: { $sum: '$quantity' },
            averageOrderValue: { $avg: '$total' }
          }
        }
      ])
    }
  }
}

module.exports = db
