import React from "react"
import { mockProducts } from "../data/products"

type VariantNode = {
  id?: string
  title?: string
  price?: string
  sku?: string
  inventoryQuantity?: number
}

type Product = {
  id: string
  title: string
  status?: string
  priceRangeV2?: { minVariantPrice?: { amount?: string; currencyCode?: string } }
  variants?: { nodes?: VariantNode[] }
  tags?: string[]
}

export function ProductInsights() {
  const products: Product[] = mockProducts as any

  const totalProducts = products.length
  const statusCounts = products.reduce((acc: Record<string, number>, p) => {
    const s = p.status ?? "UNKNOWN"
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  let totalVariants = 0
  let totalInventory = 0
  let outOfStockVariants = 0
  let lowStockVariants = 0

  products.forEach((p) => {
    const nodes = p.variants?.nodes ?? []
    totalVariants += nodes.length
    nodes.forEach((v) => {
      const qty = Number(v.inventoryQuantity) || 0
      totalInventory += qty
      if (qty === 0) outOfStockVariants += 1
      if (qty > 0 && qty <= 5) lowStockVariants += 1
    })
  })

  return (
    <div className="bg-gradient-to-br from-blue-800 via-slate-900 to-slate-800 border border-slate-700 rounded-xl p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Product Insights</h2>
          <p className="text-sm text-slate-300">Overview of inventory and variants</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="bg-blue-800 rounded-md px-3 py-2">
            <p className="text-xs text-blue-200">Products</p>
            <p className="text-lg font-bold text-white">{totalProducts}</p>
          </div>
          <div className="bg-blue-800 rounded-md px-3 py-2">
            <p className="text-xs text-blue-200">Variants</p>
            <p className="text-lg font-bold text-white">{totalVariants}</p>
          </div>
          <div className="bg-blue-800 rounded-md px-3 py-2">
            <p className="text-xs text-blue-200">Inventory</p>
            <p className="text-lg font-bold text-white">{totalInventory}</p>
          </div>
          <div className="bg-blue-800 rounded-md px-3 py-2">
            <p className="text-xs text-blue-200">Out of stock</p>
            <p className="text-lg font-bold text-white">{outOfStockVariants}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-blue-200 mb-2">Products</p>
        <div className="flex gap-3 overflow-x-auto py-2">
          {products.map((p) => (
            <div key={p.id} className="min-w-[220px] bg-blue-800 rounded-md p-3 shrink-0">
              <p className="text-sm text-white font-medium">{p.title}</p>
              <p className="text-xs text-blue-300">{p.tags?.slice(0,3).join(", ")}</p>
              <div className="mt-2 text-sm text-blue-100">{p.variants?.nodes?.reduce((a,b) => a + (Number(b.inventoryQuantity)||0), 0) ?? 0} in stock</div>
              <div className="text-xs text-blue-300 mt-1">{p.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductInsights
