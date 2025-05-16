import { Schema, model, models, Document } from 'mongoose'

export interface ISale extends Document {
  quantity: number
  total: number
  productId: Schema.Types.ObjectId
  date: Date
  createdAt: Date
  updatedAt: Date
}

const SaleSchema = new Schema<ISale>(
  {
    quantity: { 
      type: Number, 
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1']
    },
    total: { 
      type: Number, 
      required: [true, 'Total is required'],
      min: [0, 'Total must be positive']
    },
    productId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product',
      required: [true, 'Product is required']
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Virtual for product details
SaleSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true
})

export default models.Sale || model<ISale>('Sale', SaleSchema)
