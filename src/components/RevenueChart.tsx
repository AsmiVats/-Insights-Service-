import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

interface RevenueChartProps {
  orders: any[]
}

export default function RevenueChart({ orders }: RevenueChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    
    const revenueByMonth: Record<string, number> = {}
    orders.forEach((order) => {
      const dateRaw = order.createdAt ?? order.created_at ?? order.date
      const parsed = new Date(dateRaw)
      if (isNaN(parsed.getTime())){
        console.log("error parsing date for order:", order);
         return
      }
      const year = parsed.getFullYear()
      const month = String(parsed.getMonth() + 1).padStart(2, "0")
      const key = `${year}-${month}`
      const amountStr = order.totalPriceSet?.shopMoney?.amount ?? order.total_price ?? order.totalPrice ?? 0
      const amount = Number.parseFloat(String(amountStr)) || 0
      revenueByMonth[key] = (revenueByMonth[key] || 0) + amount
    })

   
    const months: string[] = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      months.push(key)
    }

    const labels = months.map((m) => {
      const d = new Date(`${m}-01T00:00:00Z`)
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    })

    const data = months.map((m) => revenueByMonth[m] || 0)

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Monthly Revenue",
            data,
            backgroundColor: ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#ef4444"],
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: "#e2e8f0",
              font: { size: 13, weight: 600 },
              padding: 20,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#334155", drawBorder: false } as any,
            ticks: { color: "#94a3b8", font: { size: 12 } },
          },
          x: {
            grid: { display: false, drawBorder: false } as any,
            ticks: { color: "#94a3b8", font: { size: 12 } },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [orders])

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Daily Revenue</h2>
      <div className="relative h-80">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}
