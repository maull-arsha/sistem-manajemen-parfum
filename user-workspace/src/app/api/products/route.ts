import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        inventory: true,
      },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const product = await prisma.product.create({
      data: {
        name: json.name,
        description: json.description,
        price: json.price,
        stock: json.stock,
        category: json.categoryId 
          ? {
              connect: { id: json.categoryId }
            }
          : undefined,
        inventory: {
          create: {
            quantity: json.stock
          }
        }
      },
      include: {
        category: true,
        inventory: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    )
  }
}
