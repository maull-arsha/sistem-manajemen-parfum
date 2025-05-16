"use client"

import React, { useEffect, useState } from "react"
import { Product, Category } from "@prisma/client"
import ProductForm from "./ProductForm"

interface ProductWithRelations extends Product {
  category?: Category | null
}

export default function ProductDashboard() {
  const [products, setProducts] = useState<ProductWithRelations[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<ProductWithRelations | null>(null)
  const [showForm, setShowForm] = useState<boolean>(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/products")
      if (!res.ok) throw new Error("Failed to fetch products")
      const data = await res.json()
      setProducts(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      if (!res.ok) throw new Error("Failed to fetch categories")
      const data = await res.json()
      setCategories(data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const handleEdit = (product: ProductWithRelations) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete product")
      await fetchProducts()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleFormClose = () => {
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      const method = editingProduct ? "PUT" : "POST"
      const url = editingProduct ? `/api/products?id=${editingProduct.id}` : "/api/products"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to save product")
      await fetchProducts()
      handleFormClose()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <button
        className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => setShowForm(true)}
      >
        Add Product
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.category?.name || "-"}</td>
                <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}
