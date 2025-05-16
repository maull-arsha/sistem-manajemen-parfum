"use client"

import ChartComponent from "@/components/ui/chart-component"
import { generateInventoryChart, generateMarketingEffectivenessChart } from "@/lib/chart-utils"

interface InventoryChartsProps {
  inventoryData: any[]
  marketingCosts: Record<string, number>
}

export default function InventoryCharts({ inventoryData, marketingCosts }: InventoryChartsProps) {
  const stockChartData = generateInventoryChart(inventoryData)
  const marketingChartData = generateMarketingEffectivenessChart(marketingCosts, 0)

  const stockChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Status Stok Produk',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah Unit'
        }
      }
    }
  }

  const marketingChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Distribusi Biaya Marketing',
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-4">Pergerakan Stok</h4>
        <ChartComponent
          type="bar"
          data={stockChartData}
          options={stockChartOptions}
          height={300}
        />
      </div>
      <div className="border rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-4">Efektivitas Marketing</h4>
        <ChartComponent
          type="pie"
          data={marketingChartData}
          options={marketingChartOptions}
          height={300}
        />
      </div>
    </div>
  )
}
