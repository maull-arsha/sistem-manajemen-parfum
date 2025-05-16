import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const products = await db.products.findMany({
      where: categoryId ? { categoryId: parseInt(categoryId) } : {},
      include: {
        category: true,
        inventory: true,
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const product = await db.products.create({
      data: {
        name: json.name,
        description: json.description,
        price: parseFloat(json.price),
        stock: parseInt(json.stock),
        categoryId: json.categoryId ? parseInt(json.categoryId) : undefined,
      },
      include: {
        category: true,
        inventory: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const json = await request.json()

    const product = await db.products.update(
      { id: parseInt(id) },
      {
        name: json.name,
        description: json.description,
        price: parseFloat(json.price),
        stock: parseInt(json.stock),
        categoryId: json.categoryId ? parseInt(json.categoryId) : undefined,
      }
    )

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Error updating product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await db.products.delete({ id: parseInt(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    )
  }
}
