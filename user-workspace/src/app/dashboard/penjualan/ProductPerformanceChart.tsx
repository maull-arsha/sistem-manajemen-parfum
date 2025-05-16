"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Sale } from "@/types"
import { formatRupiah } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ProductPerformanceChartProps {
  sales: Sale[]
}

interface ProductPerformance {
  name: string
  totalSales: number
  totalQuantity: number
}

export default function ProductPerformanceChart({ sales }: ProductPerformanceChartProps) {
  // Process sales data for product performance
  const productPerformance = sales.reduce((acc: { [key: string]: ProductPerformance }, sale) => {
    const productName = sale.product?.name || "Unknown Product"
    
    if (!acc[productName]) {
      acc[productName] = {
        name: productName,
        totalSales: 0,
        totalQuantity: 0,
      }
    }
    
    acc[productName].totalSales += sale.total
    acc[productName].totalQuantity += sale.quantity
    
    return acc
  }, {})

  const chartData = Object.values(productPerformance)
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 10) // Top 10 products

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Top 10 Products by Sales</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatRupiah(value).split(",")[0]}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              width={150}
            />
            <Tooltip
              formatter={(value: number) => [formatRupiah(value), "Total Sales"]}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Bar
              dataKey="totalSales"
              fill="#2563eb"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Product Performance Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Product</th>
              <th className="text-right p-2">Units Sold</th>
              <th className="text-right p-2">Total Sales</th>
              <th className="text-right p-2">Avg. Price</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((product) => (
              <tr key={product.name} className="border-b">
                <td className="p-2">{product.name}</td>
                <td className="text-right p-2">{product.totalQuantity}</td>
                <td className="text-right p-2">{formatRupiah(product.totalSales)}</td>
                <td className="text-right p-2">
                  {formatRupiah(product.totalSales / product.totalQuantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
