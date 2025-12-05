"use client"

import { BarChart3, TrendingUp } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Analytics Dashboard
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </h1>
            <p className="text-slate-400 text-sm mt-1">Real-time business intelligence</p>
          </div>
        </div>
      </div>
    </header>
  )
}
