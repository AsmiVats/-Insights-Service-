import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { fetchRangeRevenue } from "../api/orders"

interface RevenueByDay {
  date: string;
  revenue: number;
}

export default function OrdersChart() {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)
    
    const [dateRange, setDateRange] = useState({
        startDate: "2025-12-01",
        endDate: "2025-12-15"
    })

    const [revenueByDay, setRevenueByDay] = useState<RevenueByDay[]>([]);
    const totalRevenue = revenueByDay.reduce((sum, item) => sum + item.revenue, 0);



    const fetchRevenueDay = async () => {
        try {
            const tokenData = localStorage.getItem("token");
            if (!tokenData) {
                console.error("No token found");
                return;
            }

            const token = JSON.parse(tokenData);
            const tokenString = token.token || token.access_token || JSON.stringify(token);

            const result = await fetchRangeRevenue(tokenString, dateRange.startDate, dateRange.endDate);
            

            if (result && Array.isArray(result.rangeRevenue)) {
                 setRevenueByDay(result.rangeRevenue);
            } else {
                 console.warn("API response format unexpected:", result);
                 setRevenueByDay([]); 
            }
           
        } catch (error) {
            console.error("Error fetching revenue by day:", error);
            setRevenueByDay([]);
        }
    }


    useEffect(() => {
        fetchRevenueDay();
    }, [dateRange]); 

    useEffect(() => {
       
        if (!chartRef.current || revenueByDay.length === 0) {
            
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
            return
        }

        const ctx = chartRef.current.getContext("2d")
        if (!ctx) return

        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const labels = revenueByDay.map(item => 
            new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        );
        const data = revenueByDay.map(item => item.revenue);


        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: "Daily Revenue",
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
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value: any) => `$${value}`
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
    }, [revenueByDay]) 



    return (
        <div className="bg-linear-to-br from-slate-800 to-slate-900  border border-slate-700 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Revenue Analysis</h2>
                    <p className="text-blue-200 text-sm">Total revenue: **${totalRevenue.toFixed(2)}**</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={dateRange.startDate}
                            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                            className="border text-white rounded-lg px-3 py-2 text-sm"
                        />
                        <span className="text-white self-center">to</span>
                        <input
                            type="date"
                            value={dateRange.endDate}
                            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                            className="border text-white rounded-lg px-3 py-2 text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="relative h-80">
                {revenueByDay.length > 0 ? (
                    <canvas ref={chartRef} />
                ) : (
                    <p className="text-center text-slate-400 py-10">No revenue data available for this date range.</p>
                )}
            </div>

            <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="bg-blue-900/20 rounded-md p-2">
                        <p className="text-blue-200 text-xs">Total Orders</p>
                        <p className="text-xl font-semibold text-white">{revenueByDay.length}</p>
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