"use client"

import ChartComponent from "@/components/ui/chart-component"
import { generateSalesChartData } from "@/lib/chart-utils"

// Dummy data untuk contoh
const dummySalesData = [
  {
    date: "2024-01-01",
    total: 2500000,
    profit: 1250000,
  },
  {
    date: "2024-01-02",
    total: 3000000,
    profit: 1500000,
  },
  {
    date: "2024-01-03",
    total: 2800000,
    profit: 1400000,
  },
  {
    date: "2024-01-04",
    total: 3200000,
    profit: 1600000,
  },
  {
    date: "2024-01-05",
    total: 2900000,
    profit: 1450000,
  },
]

export default function SalesChart() {
  const chartData = generateSalesChartData(dummySalesData)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Grafik Penjualan dan Profit',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          }
        }
      }
    }
  }

  return (
    <ChartComponent
      type="line"
      data={chartData}
      options={options}
      height={300}
    />
  )
}
