"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  formatRupiah,
  calculateMaterialCosts,
  calculatePackagingCosts,
  calculateProductionCosts,
  calculateHPP,
  calculateSellingPrice,
  calculateProfit,
  calculateProfitPercentage,
  type ProductFormData,
  DEFAULT_PRODUCT_DATA,
} from "@/lib/product-utils"

export default function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>(DEFAULT_PRODUCT_DATA)
  const [calculations, setCalculations] = useState({
    totalMaterialCosts: 0,
    totalPackagingCosts: 0,
    totalProductionCosts: 0,
    hpp: 0,
    sellingPrice: 0,
    profit: 0,
    profitPercentage: 0,
  })

  const updateCalculations = (data: ProductFormData) => {
    const totalMaterialCosts = calculateMaterialCosts(data.materialCosts)
    const totalPackagingCosts = calculatePackagingCosts(data.packagingCosts)
    const totalProductionCosts = calculateProductionCosts(data.productionCosts)
    const hpp = calculateHPP(totalMaterialCosts, totalPackagingCosts, totalProductionCosts)
    const sellingPrice = calculateSellingPrice(hpp, data.marginPercentage, data.taxPercentage)
    const profit = calculateProfit(sellingPrice, hpp)
    const profitPercentage = calculateProfitPercentage(sellingPrice, hpp)

    setCalculations({
      totalMaterialCosts,
      totalPackagingCosts,
      totalProductionCosts,
      hpp,
      sellingPrice,
      profit,
      profitPercentage,
    })
  }

  const handleInputChange = (
    category: keyof ProductFormData,
    field: string,
    value: string
  ) => {
    const numericValue = value === "" ? 0 : parseFloat(value)
    
    setFormData((prev) => {
      const newData = {
        ...prev,
        [category]: typeof prev[category] === "object"
          ? {
              ...prev[category],
              [field]: numericValue,
            }
          : numericValue,
      }
      updateCalculations(newData)
      return newData
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement save functionality
    console.log("Form submitted:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informasi Dasar */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Informasi Dasar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Produk</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", "", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="volume">Volume (ml)</Label>
            <Input
              id="volume"
              type="number"
              value={formData.volume || ""}
              onChange={(e) => handleInputChange("volume", "", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="concentration">Konsentrasi (%)</Label>
            <Input
              id="concentration"
              type="number"
              value={formData.concentration || ""}
              onChange={(e) => handleInputChange("concentration", "", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", "", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Deskripsi Produk</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", "", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Biaya Bahan */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Biaya Bahan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parfumOil">Biaya Minyak Parfum</Label>
            <Input
              id="parfumOil"
              type="number"
              value={formData.materialCosts.parfumOil || ""}
              onChange={(e) => handleInputChange("materialCosts", "parfumOil", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alcohol">Biaya Alkohol</Label>
            <Input
              id="alcohol"
              type="number"
              value={formData.materialCosts.alcohol || ""}
              onChange={(e) => handleInputChange("materialCosts", "alcohol", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additives">Biaya Bahan Tambahan</Label>
            <Input
              id="additives"
              type="number"
              value={formData.materialCosts.additives || ""}
              onChange={(e) => handleInputChange("materialCosts", "additives", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="water">Biaya Air Suling</Label>
            <Input
              id="water"
              type="number"
              value={formData.materialCosts.water || ""}
              onChange={(e) => handleInputChange("materialCosts", "water", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            Total Biaya Bahan: {formatRupiah(calculations.totalMaterialCosts)}
          </p>
        </div>
      </Card>

      {/* Biaya Kemasan */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Biaya Kemasan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bottle">Biaya Botol</Label>
            <Input
              id="bottle"
              type="number"
              value={formData.packagingCosts.bottle || ""}
              onChange={(e) => handleInputChange("packagingCosts", "bottle", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packaging">Biaya Packaging</Label>
            <Input
              id="packaging"
              type="number"
              value={formData.packagingCosts.packaging || ""}
              onChange={(e) => handleInputChange("packagingCosts", "packaging", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="label">Biaya Label</Label>
            <Input
              id="label"
              type="number"
              value={formData.packagingCosts.label || ""}
              onChange={(e) => handleInputChange("packagingCosts", "label", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accessories">Biaya Aksesoris</Label>
            <Input
              id="accessories"
              type="number"
              value={formData.packagingCosts.accessories || ""}
              onChange={(e) => handleInputChange("packagingCosts", "accessories", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            Total Biaya Kemasan: {formatRupiah(calculations.totalPackagingCosts)}
          </p>
        </div>
      </Card>

      {/* Biaya Produksi */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Biaya Produksi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="labor">Biaya Tenaga Kerja</Label>
            <Input
              id="labor"
              type="number"
              value={formData.productionCosts.labor || ""}
              onChange={(e) => handleInputChange("productionCosts", "labor", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="overhead">Biaya Overhead</Label>
            <Input
              id="overhead"
              type="number"
              value={formData.productionCosts.overhead || ""}
              onChange={(e) => handleInputChange("productionCosts", "overhead", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shipping">Biaya Pengiriman</Label>
            <Input
              id="shipping"
              type="number"
              value={formData.productionCosts.shipping || ""}
              onChange={(e) => handleInputChange("productionCosts", "shipping", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="other">Biaya Lainnya</Label>
            <Input
              id="other"
              type="number"
              value={formData.productionCosts.other || ""}
              onChange={(e) => handleInputChange("productionCosts", "other", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            Total Biaya Produksi: {formatRupiah(calculations.totalProductionCosts)}
          </p>
        </div>
      </Card>

      {/* Harga dan Margin */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Harga dan Margin</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="marginPercentage">Margin Profit (%)</Label>
            <Input
              id="marginPercentage"
              type="number"
              value={formData.marginPercentage || ""}
              onChange={(e) => handleInputChange("marginPercentage", "", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxPercentage">Pajak (%)</Label>
            <Input
              id="taxPercentage"
              type="number"
              value={formData.taxPercentage || ""}
              onChange={(e) => handleInputChange("taxPercentage", "", e.target.value)}
              required
            />
          </div>
        </div>
      </Card>

      {/* Hasil Perhitungan */}
      <Card className="p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Hasil Perhitungan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">HPP (Harga Pokok Produksi)</p>
            <p className="text-xl font-semibold">{formatRupiah(calculations.hpp)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Harga Jual</p>
            <p className="text-xl font-semibold">{formatRupiah(calculations.sellingPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Profit per Unit</p>
            <p className="text-xl font-semibold">{formatRupiah(calculations.profit)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Persentase Profit</p>
            <p className="text-xl font-semibold">
              {calculations.profitPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Batal
        </Button>
        <Button type="submit">
          Simpan Produk
        </Button>
      </div>
    </form>
  )
}
