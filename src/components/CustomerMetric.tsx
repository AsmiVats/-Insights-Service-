
import { Users, MapPin, Globe } from "lucide-react"

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  defaultAddress: {
    country: string
  }
}

export default function CustomerMetrics({ data }: { data: Customer[] }) {
  const countryDistribution = data.reduce(
    (acc, customer) => {
      acc[customer.defaultAddress.country] = (acc[customer.defaultAddress.country] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topCountries = Object.entries(countryDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Globe className="w-5 h-5 text-blue-400" />
        Customer Locations
      </h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300">Total Customers</span>
          </div>
          <span className="text-2xl font-bold text-white">{data.length}</span>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Top Regions
          </h3>
          <div className="space-y-2">
            {topCountries.map(([country, count]) => (
              <div key={country} className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{country}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      style={{ width: `${(count / data.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-blue-400 w-10 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
