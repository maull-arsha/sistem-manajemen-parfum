"use client"

import React, { useEffect, useState } from "react"
import { Category } from "@/types"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      if (!res.ok) throw new Error("Failed to fetch categories")
      const data = await res.json()
      setCategories(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      })

      if (!res.ok) throw new Error("Failed to create category")
      
      setNewCategoryName("")
      await fetchCategories()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleUpdate = async (id: number, name: string) => {
    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })

      if (!res.ok) throw new Error("Failed to update category")
      
      setEditingCategory(null)
      await fetchCategories()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete category")
      
      await fetchCategories()
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <Card className="p-4 mb-6">
        <form onSubmit={handleCreate} className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="newCategory">New Category</Label>
            <Input
              id="newCategory"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <Button type="submit" className="mt-6">
            Add Category
          </Button>
        </form>
      </Card>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="p-4 flex items-center justify-between">
            {editingCategory?.id === category.id ? (
              <div className="flex-1 mr-2">
                <Input
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                />
              </div>
            ) : (
              <span className="text-lg">{category.name}</span>
            )}
            <div className="flex gap-2">
              {editingCategory?.id === category.id ? (
                <>
                  <Button
                    onClick={() => handleUpdate(category.id, editingCategory.name)}
                    variant="outline"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditingCategory(null)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setEditingCategory(category)}
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(category.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
