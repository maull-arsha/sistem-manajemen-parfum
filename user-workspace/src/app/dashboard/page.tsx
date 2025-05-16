"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  // Dummy data untuk tampilan awal
  const summaryData = {
    totalProduk: 0,
    totalPenjualan: "Rp 0",
    avgProfit: "0%",
    lowStock: 0
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="space-x-2">
          <Button asChild>
            <Link href="/dashboard/produk/tambah">
              Tambah Produk
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Produk</h3>
          <p className="text-2xl font-bold mt-2">{summaryData.totalProduk}</p>
          <Link href="/dashboard/produk" className="text-sm text-blue-600 mt-2 block">
            Lihat semua produk →
          </Link>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Penjualan</h3>
          <p className="text-2xl font-bold mt-2">{summaryData.totalPenjualan}</p>
          <Link href="/dashboard/penjualan" className="text-sm text-blue-600 mt-2 block">
            Lihat detail penjualan →
          </Link>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Rata-rata Profit</h3>
          <p className="text-2xl font-bold mt-2">{summaryData.avgProfit}</p>
          <Link href="/dashboard/produk" className="text-sm text-blue-600 mt-2 block">
            Analisis profit →
          </Link>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Stok Menipis</h3>
          <p className="text-2xl font-bold mt-2">{summaryData.lowStock}</p>
          <Link href="/dashboard/inventory" className="text-sm text-blue-600 mt-2 block">
            Cek inventory →
          </Link>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
          <div className="space-y-2">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/produk/tambah">
                Tambah Produk Baru
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/penjualan/tambah">
                Catat Penjualan
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/inventory/update">
                Update Stok
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Laporan Cepat</h3>
          <div className="space-y-2">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/penjualan/laporan">
                Laporan Penjualan
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/produk/analisis">
                Analisis HPP
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/inventory/laporan">
                Status Inventory
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
