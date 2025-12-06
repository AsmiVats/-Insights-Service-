
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { useEffect,useState } from "react"
import { fetchTotalCount } from "../api/customers"
import { fetchTotalOrders, fetchTotalRevenue } from "../api/orders"


interface CORCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

function CORCard({ icon, label, value, color }: CORCardProps) {
  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-blue-500/10">
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

export default function CORCards() {
  const [totalCustomers, setTotalCustomers] = useState<number>(0)
  const [totalOrders, setTotalOrders] = useState<number>(0)
  const [totalRevenue, setTotalRevenue] = useState<number>(0)
  const [avgOrderValue, setAvgOrderValue] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const tokenData = localStorage.getItem("token");
        if (!tokenData) {
          console.error("No token found");
          return;
        }
        
        const token = JSON.parse(tokenData);
        const tokenString = token.token || token.access_token || JSON.stringify(token);
        
        const customerRes = await fetchTotalCount(tokenString);
        const customersCount = customerRes?.totalCustomers || customerRes?.count || 0;
        if(customersCount) setTotalCustomers(customersCount);

        const ordersRes = await fetchTotalOrders(tokenString);
        const ordersCount = ordersRes?.totalOrders || ordersRes?.count || 0;
        if(ordersCount) setTotalOrders(ordersCount);

        const revenueRes = await fetchTotalRevenue(tokenString);
        const revenueAmount = revenueRes?.totalRevenue || revenueRes?.revenue || 0;
        if(revenueAmount) setTotalRevenue(revenueAmount);

        if(ordersCount && revenueAmount) setAvgOrderValue(revenueAmount / ordersCount);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    }
    
    fetchData();
  }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CORCard
        icon={<Users className="w-6 h-6 text-white" />}
        label="Total Customers"
        value={totalCustomers}
        color="bg-linear-to-br from-blue-500 to-blue-600"
      />
      <CORCard
        icon={<ShoppingCart className="w-6 h-6 text-white" />}
        label="Total Orders"
        value={totalOrders}
        color="bg-linear-to-br from-cyan-500 to-blue-500"
      />
      <CORCard
        icon={<DollarSign className="w-6 h-6 text-white" />}
        label="Total Revenue"
        value={`$${(totalRevenue / 1000).toFixed(1)}K`}
        color="bg-linear-to-br from-emerald-500 to-teal-500"
      />
      <CORCard
        icon={<TrendingUp className="w-6 h-6 text-white" />}
        label="Avg Order Value"
        value={`$${avgOrderValue.toFixed(2)}`}
        color="bg-linear-to-br from-purple-500 to-pink-500"
      />
    </div>
  )
}
