"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Sistem Manajemen Parfum</h1>
        <p className="text-gray-600">Kelola produk, penjualan, dan inventory parfum Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/produk" className="no-underline">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Produk & HPP</h2>
            <p className="text-gray-600">Kelola produk dan hitung harga pokok penjualan</p>
          </Card>
        </Link>

        <Link href="/dashboard/penjualan" className="no-underline">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Rekap Penjualan</h2>
            <p className="text-gray-600">Lihat laporan dan analisis penjualan</p>
          </Card>
        </Link>

        <Link href="/dashboard/inventory" className="no-underline">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Inventory</h2>
            <p className="text-gray-600">Kelola stok dan biaya marketing</p>
          </Card>
        </Link>
      </div>

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/dashboard">
            Masuk ke Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
