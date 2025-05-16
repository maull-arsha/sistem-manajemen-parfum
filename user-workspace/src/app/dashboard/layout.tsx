"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Produk & HPP", href: "/dashboard/produk" },
    { name: "Rekap Penjualan", href: "/dashboard/penjualan" },
    { name: "Inventory", href: "/dashboard/inventory" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </Button>
            <h1 className="text-xl font-semibold">Sistem Manajemen Parfum</h1>
          </div>
          <Button asChild variant="ghost">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "w-64 bg-white shadow-sm transition-all duration-300",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-2 rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
