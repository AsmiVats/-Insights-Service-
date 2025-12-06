import { useEffect, useState } from "react"
import { fetchOutOfStockProducts, fetchTopProducts, fetchTotalProducts } from "../api/products"

type Product = {
  id: string
  title?: string
  name?: string
  status?: string
  price?: number
  tags?: string[]
  quantitySold?: number
}
export function ProductInsights() {
  const [totalProducts, setTotalProducts] = useState<number>(0)
  const [outOfStockProducts, setOutOfStockProducts] = useState<Product[]>([])
  const [topSoldProducts, setTopSoldProducts] = useState<Product[]>([])

  const fetchTotal = async () => {
    try {
      const tokenData = localStorage.getItem("token")
      if (!tokenData) {
        console.error("No token found")
        return
      }
      const token = JSON.parse(tokenData)
      const tokenString = token.token || token.access_token || JSON.stringify(token)
      const res = await fetchTotalProducts(tokenString)
      const totalAvailable = res?.totalAvailable ?? 0
      setTotalProducts(totalAvailable)
    } catch (error) {
      console.error("Failed to fetch total products:", error)
    }
  }

  const fetchOutOfStock = async () => {
    try {
      const tokenData = localStorage.getItem("token")
      if (!tokenData) {
        console.error("No token found")
        return
      }
      const token = JSON.parse(tokenData)
      const tokenString = token.token || token.access_token || JSON.stringify(token)
      const res = await fetchOutOfStockProducts(tokenString)
      if (res) {
        setOutOfStockProducts(res.outOfStockProducts || [])
      }
    } catch (error) {
      console.error("Failed to fetch out of stock products:", error)
    }
  }

  const fetchTop = async () => {
    try {
      const tokenData = localStorage.getItem("token")
      if (!tokenData) {
        console.error("No token found")
        return
      }
      const token = JSON.parse(tokenData)
      const tokenString = token.token || token.access_token || JSON.stringify(token)
      const res = await fetchTopProducts(tokenString)
      if (res) {
        setTopSoldProducts(res.topSold || [])
      }
    } catch (error) {
      console.error("Failed to fetch top sold products:", error)
    }
  }

  useEffect(() => {
    fetchTotal()
    fetchOutOfStock()
    fetchTop()
  }, [])


  return (
    <div className="bg-linear-to-br from-blue-800 via-slate-900 to-slate-800 border border-slate-700 rounded-xl p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Product Insights 📈</h2>
          <p className="text-sm text-slate-300">Overview of products</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="bg-blue-800 rounded-md px-3 py-2">
            <p className="text-xs text-blue-200">Total Products</p>
            <p className="text-lg font-bold text-white">{totalProducts}</p>
          </div>
          <div className="bg-red-800 rounded-md px-3 py-2">
            <p className="text-xs text-red-200">Out of Stock Products</p>
            <p className="text-lg font-bold text-white">{outOfStockProducts.length}</p>
          </div>
        </div>
      </div>

      <hr className="my-4 border-slate-700" />
      
    
      <div className="mt-4">
        <p className="text-sm font-semibold text-green-200 mb-2">Top Sold Products </p>
        <div className="flex gap-3 overflow-x-auto py-2">
          {topSoldProducts.map((p) => (
            <div key={p.id} className="min-w-[220px] bg-green-800 rounded-md p-3 shrink-0">
              <p className="text-sm text-white font-medium">{p.name}</p>
              <div className="text-xs text-green-300 mt-1">Total sold: {p.quantitySold}</div>
            </div>
          ))}
        </div>
      </div>
      
      <hr className="my-4 border-slate-700" />


      <div className="mt-4">
        <p className="text-sm text-blue-200 mb-2">Out of Stock Products</p>
        <div className="flex gap-3 overflow-x-auto py-2">
          {outOfStockProducts.map((p) => (
            <div key={p.id} className="min-w-[220px] bg-blue-800 rounded-md p-3 shrink-0">
              <p className="text-sm text-white font-medium">{p.title}</p>
              <p className="text-xs text-blue-300">{p.tags?.slice(0,3).join(", ")}</p>
              <div className="text-xs text-blue-300 mt-1">Status: {p.status=="inactive"? "Out of stock" : "In stock"}</div>
              <div className="text-xs text-blue-300 mt-1">${p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductInsights