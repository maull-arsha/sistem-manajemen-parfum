import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (startDate && endDate) {
      // Get analytics data
      const analytics = await db.sales.getAnalytics(
        new Date(startDate),
        new Date(endDate)
      )
      return NextResponse.json(analytics)
    }

    // Get regular sales data
    const sales = await db.sales.findMany({
      include: {
        product: true
      }
    })
    return NextResponse.json(sales)
  } catch (error) {
    console.error('Error fetching sales:', error)
    return NextResponse.json(
      { error: 'Error fetching sales' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    // Calculate total if not provided
    if (!json.total && json.quantity && json.price) {
      json.total = json.quantity * json.price
    }

    const sale = await db.sales.create({
      data: {
        quantity: json.quantity,
        total: json.total,
        productId: json.productId,
        date: json.date || new Date(),
      },
      include: {
        product: true
      }
    })

    // Update product stock
    await db.products.update(
      { id: json.productId },
      { stock: { decrement: json.quantity } }
    )

    return NextResponse.json(sale)
  } catch (error) {
    console.error('Error creating sale:', error)
    return NextResponse.json(
      { error: 'Error creating sale' },
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
        { error: 'Sale ID is required' },
        { status: 400 }
      )
    }

    const json = await request.json()
    const oldSale = await db.sales.findMany({
      where: { id: parseInt(id) }
    })

    const sale = await db.sales.update(
      { id: parseInt(id) },
      {
        quantity: json.quantity,
        total: json.total,
        date: json.date
      }
    )

    // Update product stock
    if (oldSale && oldSale[0].quantity !== json.quantity) {
      const stockDiff = oldSale[0].quantity - json.quantity
      await db.products.update(
        { id: sale.productId },
        { stock: { increment: stockDiff } }
      )
    }

    return NextResponse.json(sale)
  } catch (error) {
    console.error('Error updating sale:', error)
    return NextResponse.json(
      { error: 'Error updating sale' },
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
        { error: 'Sale ID is required' },
        { status: 400 }
      )
    }

    const sale = await db.sales.findMany({
      where: { id: parseInt(id) }
    })

    await db.sales.delete({ id: parseInt(id) })

    // Restore product stock
    if (sale && sale[0]) {
      await db.products.update(
        { id: sale[0].productId },
        { stock: { increment: sale[0].quantity } }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting sale:', error)
    return NextResponse.json(
      { error: 'Error deleting sale' },
      { status: 500 }
    )
  }
}
