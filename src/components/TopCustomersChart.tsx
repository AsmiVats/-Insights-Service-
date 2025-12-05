import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"



interface TopCustomerRaw {
  id?: string
  firstName?: string
  lastName?: string
  amountSpent?: { amount?: string; currencyCode?: string }
  numberOfOrders?: string | number
}

interface TopCustomersChartProps {
  topCustomers: TopCustomerRaw[]
}

export default function TopCustomersChart({ topCustomers }: TopCustomersChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

  
    const labels: string[] = []
    const data: number[] = []

    if (Array.isArray(topCustomers) && topCustomers.length > 0) {
      // Assume incoming `topCustomers` is already sorted descending by spend.
      // Use the first 5 entries as-is (no resorting).
      const top = topCustomers.slice(0, 5)
      top.forEach((t) => {
        const name = `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim() || "Unknown"
        const spending = Number.parseFloat(String(t.amountSpent?.amount ?? 0)) || 0
        labels.push(name)
        data.push(spending)
      })
    }

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const colors = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Total Spending",
            data,
            backgroundColor: colors,
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        indexAxis: "y" as const,
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
          x: {
            grid: { color: "#334155", drawBorder: false } as any,
            ticks: { color: "#94a3b8", font: { size: 12 } },
          },
          y: {
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
  }, [topCustomers])

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Top 5 Customers by Spend</h2>
      <div className="relative h-80">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}
