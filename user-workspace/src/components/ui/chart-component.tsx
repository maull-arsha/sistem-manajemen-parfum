"use client"

import { useEffect, useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js"
import { Chart } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface ChartComponentProps {
  type: "line" | "bar" | "pie"
  data: ChartData<any>
  options?: ChartOptions<any>
  height?: number
}

export default function ChartComponent({
  type,
  data,
  options,
  height = 350,
}: ChartComponentProps) {
  const chartRef = useRef<ChartJS>(null)

  useEffect(() => {
    // Update chart on data change
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [data])

  const defaultOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: type !== "pie" ? {
      y: {
        beginAtZero: true,
      },
    } : undefined,
  }

  return (
    <div style={{ height: height }}>
      <Chart
        ref={chartRef}
        type={type}
        data={data}
        options={{ ...defaultOptions, ...options }}
      />
    </div>
  )
}
