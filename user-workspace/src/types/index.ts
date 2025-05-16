export interface Product {
  id: number
  name: string
  description?: string
  price: number
  stock: number
  categoryId?: number
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Sale {
  id: number
  quantity: number
  total: number
  productId: number
  date: Date
  createdAt: Date
  updatedAt: Date
  product?: Product
}

export interface ProductWithRelations extends Product {
  category?: Category | null
  inventory?: {
    id: number
    quantity: number
  } | null
  sales?: Sale[]
}

export interface FormData {
  name: string
  description?: string
  price: number
  stock: number
  categoryId?: number
}

export interface SaleFormData {
  quantity: number
  productId: number
  price?: number
  date?: Date
}

export interface SaleAnalytics {
  totalSales: number
  totalQuantity: number
  averageOrderValue: number
}
