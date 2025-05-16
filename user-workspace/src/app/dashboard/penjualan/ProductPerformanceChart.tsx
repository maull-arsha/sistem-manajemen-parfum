"use client"

import ChartComponent from "@/components/ui/chart-component"
import { generateProductPerformanceChart } from "@/lib/chart-utils"

// Dummy data untuk contoh
const dummyProductData = [
  {
    name: "Parfum A",
    quantity: 45,
    revenue: 13500000,
  },
  {
    name: "Parfum B",
    quantity: 32,
    revenue: 16000000,
  },
  {
    name: "Parfum C",
    quantity: 28,
    revenue: 8400000,
  },
  {
    name: "Parfum D",
    quantity: 20,
    revenue: 10000000,
  },
  {
    name: "Parfum E",
    quantity: 15,
    revenue: 7500000,
  },
]

export default function ProductPerformanceChart() {
  const chartData = generateProductPerformanceChart(dummyProductData)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Performa Produk',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah Terjual'
        }
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <ChartComponent
          type="bar"
          data={chartData}
          options={options}
          height={300}
        />
      </div>
      
      {/* Top Products Table */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Top 5 Produk Terlaris</h4>
        <div className="border rounded-lg divide-y">
          {dummyProductData
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5)
            .map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">
                    #{index + 1}
                  </span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {product.quantity} unit
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.revenue)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
