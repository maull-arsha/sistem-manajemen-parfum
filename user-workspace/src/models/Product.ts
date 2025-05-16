import { Schema, model, models, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description?: string
  price: number
  stock: number
  categoryId?: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { 
      type: String, 
      required: [true, 'Product name is required'] 
    },
    description: { 
      type: String 
    },
    price: { 
      type: Number, 
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    stock: { 
      type: Number, 
      default: 0,
      min: [0, 'Stock cannot be negative']
    },
    categoryId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Category' 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Virtual for category
ProductSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
})

// Virtual for inventory
ProductSchema.virtual('inventory', {
  ref: 'Inventory',
  localField: '_id',
  foreignField: 'productId',
  justOne: true
})

// Virtual for sales
ProductSchema.virtual('sales', {
  ref: 'Sale',
  localField: '_id',
  foreignField: 'productId'
})

export default models.Product || model<IProduct>('Product', ProductSchema)
