"use client"

import React, { useEffect, useState } from "react"
import { Sale, Product, SaleAnalytics } from "@/types"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { formatRupiah } from "@/lib/utils"
import SalesChart from "./SalesChart"
import ProductPerformanceChart from "./ProductPerformanceChart"

export default function SalesDashboard() {
  const [sales, setSales] = useState<Sale[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analytics, setAnalytics] = useState<SaleAnalytics | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")

  const fetchSales = async () => {
    try {
      const res = await fetch("/api/sales")
      if (!res.ok) throw new Error("Failed to fetch sales")
      const data = await res.json()
      setSales(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products")
      if (!res.ok) throw new Error("Failed to fetch products")
      const data = await res.json()
      setProducts(data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setMonth(startDate.getMonth() - 1) // Last 30 days

      const res = await fetch(
        `/api/sales?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      )
      if (!res.ok) throw new Error("Failed to fetch analytics")
      const data = await res.json()
      setAnalytics(data[0])
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchSales()
    fetchProducts()
    fetchAnalytics()
  }, [])

  const handleCreateSale = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct || !quantity) return

    const product = products.find((p) => p.id.toString() === selectedProduct)
    if (!product) return

    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: parseInt(selectedProduct),
          quantity: parseInt(quantity),
          price: product.price,
        }),
      })

      if (!res.ok) throw new Error("Failed to create sale")

      setSelectedProduct("")
      setQuantity("")
      await Promise.all([fetchSales(), fetchAnalytics()])
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteSale = async (id: number) => {
    if (!confirm("Are you sure you want to delete this sale?")) return

    try {
      const res = await fetch(`/api/sales?id=${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete sale")

      await Promise.all([fetchSales(), fetchAnalytics()])
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <SalesChart sales={sales} />
        <ProductPerformanceChart sales={sales} />
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Sales (30d)</h3>
          <p className="text-2xl font-bold">{formatRupiah(analytics?.totalSales || 0)}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Units Sold (30d)</h3>
          <p className="text-2xl font-bold">{analytics?.totalQuantity || 0}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
          <p className="text-2xl font-bold">{formatRupiah(analytics?.averageOrderValue || 0)}</p>
        </Card>
      </div>

      {/* New Sale Form */}
      <Card className="p-4 mb-6">
        <form onSubmit={handleCreateSale} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="product">Product</Label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - {formatRupiah(product.price)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full">
              Record Sale
            </Button>
          </div>
        </form>
      </Card>

      {/* Sales Table */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Quantity</th>
                <th className="text-left p-2">Total</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-b">
                  <td className="p-2">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="p-2">{sale.product?.name}</td>
                  <td className="p-2">{sale.quantity}</td>
                  <td className="p-2">{formatRupiah(sale.total)}</td>
                  <td className="p-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSale(sale.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
