"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatRupiah } from "@/lib/product-utils"
import ProductForm from "./ProductForm"

// Dummy data untuk contoh
const dummyProducts = [
  {
    id: 1,
    name: "Parfum A",
    category: "Extrait de Parfume",
    volume: 50,
    concentration: 20,
    hpp: 150000,
    sellingPrice: 300000,
  },
  {
    id: 2,
    name: "Parfum B",
    category: "Extrait de Parfume",
    volume: 100,
    concentration: 25,
    hpp: 250000,
    sellingPrice: 500000,
  },
]

export default function ProductPage() {
  const [showForm, setShowForm] = useState(false)
  const [products] = useState(dummyProducts)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manajemen Produk & HPP</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Tutup Form" : "Tambah Produk"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <ProductForm />
        </Card>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Daftar Produk</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Volume (ml)</TableHead>
                <TableHead>Konsentrasi (%)</TableHead>
                <TableHead>HPP</TableHead>
                <TableHead>Harga Jual</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.volume}</TableCell>
                  <TableCell>{product.concentration}%</TableCell>
                  <TableCell>{formatRupiah(product.hpp)}</TableCell>
                  <TableCell>{formatRupiah(product.sellingPrice)}</TableCell>
                  <TableCell className="text-right">
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Belum ada produk. Klik "Tambah Produk" untuk menambahkan produk baru.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Produk</h3>
          <p className="text-2xl font-bold mt-2">{products.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Rata-rata HPP</h3>
          <p className="text-2xl font-bold mt-2">
            {formatRupiah(
              products.reduce((acc, curr) => acc + curr.hpp, 0) / products.length || 0
            )}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Rata-rata Harga Jual</h3>
          <p className="text-2xl font-bold mt-2">
            {formatRupiah(
              products.reduce((acc, curr) => acc + curr.sellingPrice, 0) / products.length || 0
            )}
          </p>
        </Card>
      </div>
    </div>
  )
}
