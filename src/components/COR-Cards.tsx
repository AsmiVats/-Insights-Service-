import type React from "react"

import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"

interface Metrics {
  totalCustomers: number
  totalOrders: number
  totalRevenue: number
  avgOrderValue: number
}

interface CORCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

function CORCard({ icon, label, value, color }: CORCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-white text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  )
}

export default function CORCards({ metrics }: { metrics: Metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CORCard
        icon={<Users className="w-6 h-6 text-white" />}
        label="Total Customers"
        value={metrics.totalCustomers}
        color="bg-gradient-to-br from-blue-500 to-blue-600"
      />
      <CORCard
        icon={<ShoppingCart className="w-6 h-6 text-white" />}
        label="Total Orders"
        value={metrics.totalOrders}
        color="bg-gradient-to-br from-cyan-500 to-blue-500"
      />
      <CORCard
        icon={<DollarSign className="w-6 h-6 text-white" />}
        label="Total Revenue"
        value={`$${(metrics.totalRevenue / 1000).toFixed(1)}K`}
        color="bg-gradient-to-br from-emerald-500 to-teal-500"
      />
      <CORCard
        icon={<TrendingUp className="w-6 h-6 text-white" />}
        label="Avg Order Value"
        value={`$${metrics.avgOrderValue.toFixed(2)}`}
        color="bg-gradient-to-br from-purple-500 to-pink-500"
      />
    </div>
  )
}
