import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ShoppingCart, AlertCircle, CheckCircle } from "lucide-react"
import { Metric } from "../api/orders"; 
import { useEffect, useState } from "react";



export default function CustomEvents() {

  const [CartAbandoned, setCartAbandoned] = useState(0);
  const [CheckoutStarted, setCheckoutStarted] = useState(0);
  const [PurchaseCompleted, setPurchaseCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const Datametric = async () => {
    setIsLoading(true);
    try {
      const tokenData = localStorage.getItem("token");
      if (!tokenData) {
        console.error("No token found");
        setIsLoading(false);
        return;
      }

      const token = JSON.parse(tokenData);
      const tokenString = token.token || token.access_token || JSON.stringify(token);

    
      const response = await Metric(tokenString); 
      console.log("Custom Events Data:", response);

      setCartAbandoned(response.metrics?.cartAbandoned || 0);
      setCheckoutStarted(response.metrics?.checkoutStarted || 0);
      setPurchaseCompleted(response.metrics?.purchaseCompleted || 0);

    } catch (error) {
      console.error("Error fetching custom events data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Datametric();
  }, []);

  const eventTypes = [
    { icon: ShoppingCart, label: "Cart Abandoned", color: "#f59e0b", data: CartAbandoned },
    { icon: AlertCircle, label: "Checkout Started", color: "#06b6d4", data: CheckoutStarted },
    { icon: CheckCircle, label: "Purchase Completed", color: "#10b981", data: PurchaseCompleted },
  ];
 
  const comparisonData = [
    {
     
      name: "Conversion Funnel Totals", 
      "Cart Abandoned": CartAbandoned,
      "Checkout Started": CheckoutStarted,
      "Purchase Completed": PurchaseCompleted,
    },
  ];

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Custom Events</h2>
      
      {isLoading ? (
        <div className="text-center py-10 text-slate-400">Loading events data...</div>
      ) : (
        <>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {eventTypes.map(({ icon: Icon, label, color, data }) => (
              <div
                key={label}
                className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-slate-500 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="text-2xl font-bold text-white">{data}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

   
          <div className="bg-slate-900/50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Event Funnel Comparison</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                
                <Bar dataKey="Cart Abandoned" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Checkout Started" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Purchase Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}