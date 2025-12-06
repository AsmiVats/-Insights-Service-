
import { Users, MapPin, Globe } from "lucide-react"
import {  useEffect, useState } from "react"
import { topcountries } from "../api/customers"

interface TopCountry {
  name: string
  count: number
}

export default function CustomerMetrics() {
 
  // Calculate top countries
  const [top_contries,setTopCountries] = useState<TopCountry[]>([]);

  useEffect(() => {
    async function fetchTopCountries() {
      try {
        const tokenData = localStorage.getItem("token");
        if (!tokenData) {
          console.error("No token found");
          return;
        }
        
        const token = JSON.parse(tokenData);
        const tokenString = token.token || token.access_token || JSON.stringify(token);
        const countriesData = await topcountries(tokenString);
        
        const countries = countriesData.result;
        
        if(countries && Array.isArray(countries)){
          setTopCountries(countries);
        }
      } catch (error) {
        console.error("Error fetching top countries:", error);
      }
  }
    fetchTopCountries();
  }, []);

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
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
          <span className="text-2xl font-bold text-white">{top_contries.length}</span>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Top Regions
          </h3>
          <div className="space-y-2">
            {top_contries.map(({name, count}) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-cyan-400"
                      style={{ width: `${(count / top_contries.length) * 100}%` }}
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
