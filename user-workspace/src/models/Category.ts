import { Schema, model, models, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { 
      type: String, 
      required: [true, 'Category name is required'],
      unique: true
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Virtual for products in this category
CategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'categoryId'
})

// Pre-save middleware to capitalize category name
CategorySchema.pre('save', function(next) {
  if (this.name) {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
  }
  next()
})

export default models.Category || model<ICategory>('Category', CategorySchema)
