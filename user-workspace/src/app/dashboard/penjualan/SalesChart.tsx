"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Sale } from "@/types"
import { formatRupiah } from "@/lib/utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface SalesChartProps {
  sales: Sale[]
}

export default function SalesChart({ sales }: SalesChartProps) {
  // Process sales data for the chart
  const dailySales = sales.reduce((acc: { [key: string]: number }, sale) => {
    const date = new Date(sale.date).toLocaleDateString()
    acc[date] = (acc[date] || 0) + sale.total
    return acc
  }, {})

  const chartData = Object.entries(dailySales)
    .map(([date, total]) => ({
      date,
      total,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30) // Last 30 days

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Sales Trend (Last 30 Days)</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatRupiah(value).split(",")[0]}
            />
            <Tooltip
              formatter={(value: number) => [formatRupiah(value), "Total Sales"]}
              labelFormatter={(label) => new Date(label).toLocaleDateString("id-ID", { 
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
