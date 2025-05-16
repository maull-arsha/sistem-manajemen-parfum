import { PrismaClient } from '@prisma/client'
import { Model } from 'mongoose'
import { Product, Category, Sale } from '.'

export interface DatabaseInterface {
  provider: string
  prisma: PrismaClient | null
  connect: () => Promise<void>
  models: {
    Product: Model<any>
    Category: Model<any>
    Sale: Model<any>
  } | null
  products: {
    findMany: (options?: any) => Promise<Product[]>
    create: (data: any) => Promise<Product>
    update: (where: any, data: any) => Promise<Product>
    delete: (where: any) => Promise<Product>
  }
  categories: {
    findMany: (options?: any) => Promise<Category[]>
    create: (data: any) => Promise<Category>
    update: (where: any, data: any) => Promise<Category>
    delete: (where: any) => Promise<Category>
  }
  sales: {
    findMany: (options?: any) => Promise<Sale[]>
    create: (data: any) => Promise<Sale>
    update: (where: any, data: any) => Promise<Sale>
    delete: (where: any) => Promise<Sale>
    getAnalytics: (startDate: Date, endDate: Date) => Promise<any>
  }
}
