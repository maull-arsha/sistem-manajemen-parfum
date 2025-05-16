"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatRupiah } from "@/lib/product-utils"
import SalesChart from "./SalesChart"
import ProductPerformanceChart from "./ProductPerformanceChart"

// Dummy data untuk contoh
const dummySales = [
  {
    id: 1,
    date: "2024-01-15",
    productName: "Parfum A",
    quantity: 5,
    price: 300000,
    total: 1500000,
    profit: 750000,
  },
  {
    id: 2,
    date: "2024-01-16",
    productName: "Parfum B",
    quantity: 3,
    price: 500000,
    total: 1500000,
    profit: 750000,
  },
]

export default function SalesPage() {
  const [period, setPeriod] = useState("this-month")
  const [sales] = useState(dummySales)

  // Calculate summary data
  const totalSales = sales.reduce((acc, curr) => acc + curr.total, 0)
  const totalProfit = sales.reduce((acc, curr) => acc + curr.profit, 0)
  const totalQuantity = sales.reduce((acc, curr) => acc + curr.quantity, 0)
  const averageOrderValue = totalSales / sales.length || 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rekap Penjualan</h2>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="this-week">Minggu Ini</SelectItem>
              <SelectItem value="this-month">Bulan Ini</SelectItem>
              <SelectItem value="this-year">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            Export Data
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Penjualan</h3>
          <p className="text-2xl font-bold mt-2">{formatRupiah(totalSales)}</p>
          <p className="text-sm text-gray-600 mt-1">Periode: {period}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Profit</h3>
          <p className="text-2xl font-bold mt-2">{formatRupiah(totalProfit)}</p>
          <p className="text-sm text-gray-600 mt-1">
            Margin: {((totalProfit / totalSales) * 100).toFixed(1)}%
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Jumlah Produk Terjual</h3>
          <p className="text-2xl font-bold mt-2">{totalQuantity} unit</p>
          <p className="text-sm text-gray-600 mt-1">
            Rata-rata: {(totalQuantity / sales.length).toFixed(1)} per transaksi
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Rata-rata Order</h3>
          <p className="text-2xl font-bold mt-2">{formatRupiah(averageOrderValue)}</p>
          <p className="text-sm text-gray-600 mt-1">Per transaksi</p>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Grafik Penjualan</h3>
        <SalesChart />
      </Card>

      {/* Sales Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Detail Penjualan</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{new Date(sale.date).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>{sale.productName}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>{formatRupiah(sale.price)}</TableCell>
                  <TableCell>{formatRupiah(sale.total)}</TableCell>
                  <TableCell>{formatRupiah(sale.profit)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sales.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Belum ada data penjualan untuk periode ini.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Product Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performa Produk</h3>
        <ProductPerformanceChart />
      </Card>
    </div>
  )
}
