import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { mockOrders } from "../data/date-range-orders"

interface Order {
  id: string
  name: string
  createdAt: string
  totalPriceSet: {
    shopMoney: {
      amount: string
      currencyCode: string
    }
  }
  customer: {
    firstName: string
    lastName: string
  }
}

export default function OrdersChart({orders}: {orders: Order[]}) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  
  const [dateRange, setDateRange] = useState({
    startDate: "2025-12-01",
    endDate: "2025-12-15"
  })
  
  const [groupBy, setGroupBy] = useState<"day" | "customer">("day")

  // Filter orders based on date range
  const filteredOrders = mockOrders.filter(order => {
    const orderDate = new Date(order.createdAt)
    const start = new Date(dateRange.startDate)
    const end = new Date(dateRange.endDate)
    end.setHours(23, 59, 59, 999)
    return orderDate >= start && orderDate <= end
  })

  useEffect(() => {
    if (!chartRef.current || filteredOrders.length === 0) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Destroy previous chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    let labels: string[] = []
    let data: number[] = []

    if (groupBy === "day") {
      const revenueByDay: { [key: string]: number } = {}
      
      filteredOrders.forEach(order => {
        const date = new Date(order.createdAt)
        const dayKey = date.toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric" 
        })
        const amount = parseFloat(order.totalPriceSet.shopMoney.amount)
        revenueByDay[dayKey] = (revenueByDay[dayKey] || 0) + amount
      })

      labels = Object.keys(revenueByDay)
      data = Object.values(revenueByDay)
    } 
    else if (groupBy === "customer") {
      const revenueByCustomer: { [key: string]: number } = {}
      
      filteredOrders.forEach(order => {
        const customerName = `${order.customer.firstName} ${order.customer.lastName}`
        const amount = parseFloat(order.totalPriceSet.shopMoney.amount)
        revenueByCustomer[customerName] = (revenueByCustomer[customerName] || 0) + amount
      })

      // Take top 8 customers
      const sorted = Object.entries(revenueByCustomer)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
      
      labels = sorted.map(([name]) => name)
      data = sorted.map(([, revenue]) => revenue)
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: groupBy === "customer" ? "Customer Revenue" : "Daily Revenue",
          data,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#3b82f6",
          pointRadius: 5,
          pointHoverRadius: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // plugins: {
        //   tooltip: {
        //     callbacks: {
        //       label: (context) => {
        //         return `$${context.raw.toLocaleString("en-US", {
        //           minimumFractionDigits: 2,
        //           maximumFractionDigits: 2
        //         })}`
        //       }
        //     }
        //   }
        // },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${value}`
            }
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [filteredOrders, groupBy])

  // Calculate total revenue
  const totalRevenue = filteredOrders.reduce((sum, order) => 
    sum + parseFloat(order.totalPriceSet.shopMoney.amount), 0
  )

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900  border border-slate-700 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Revenue Analysis</h2>
          <p className="text-blue-200 text-sm">Total revenue: ${totalRevenue.toFixed(2)}</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Date Range */}
          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <span className="text-gray-500 self-center">to</span>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          
          {/* Group By Selector */}
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as "day" | "customer")}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="day">By Day</option>
            <option value="customer">By Customer</option>
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-80">
        <canvas ref={chartRef} />
      </div>

      {/* Simple Stats */}
      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="bg-blue-900/20 rounded-md p-2">
            <p className="text-blue-200 text-xs">Total Orders</p>
            <p className="text-xl font-semibold text-white">{filteredOrders.length}</p>
          </div>
          <div className="bg-green-900/20 rounded-md p-2">
            <p className="text-blue-200 text-xs">Total Revenue</p>
            <p className="text-xl font-semibold text-white">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}