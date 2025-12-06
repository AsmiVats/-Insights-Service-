import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { fetchTopCustomers } from "../api/customers"

interface TopCustomerRaw {
     firstName: string,
      lastName: string,
      email: string,
      totalSpent: number,
}

export default function TopCustomersChart() {
    const [topCustomers, setTopCustomers] = useState<TopCustomerRaw[]>([]);
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    const loadCustomerData = async () => {
        try {
            const tokenData = localStorage.getItem("token");
            if (!tokenData) {
                console.error("No token found");
                return;
            }

            const token = JSON.parse(tokenData);
            const tokenString = token.token || token.access_token || JSON.stringify(token);

            const customerData = await fetchTopCustomers(tokenString);
            console.log("Fetched top customers:", customerData);
            
            const customers = customerData?.result || customerData || [];
            
            if (customers && customers.length) {
                setTopCustomers(customers);
            }
        } catch (error) {
            console.error("Error fetching top customers:", error);
        }
    }

    useEffect(() => {
        loadCustomerData();
    }, []); 

    useEffect(() => {
        if (!chartRef.current || !topCustomers.length) {
           
            if (chartInstance.current) {
                chartInstance.current.destroy()
                chartInstance.current = null;
            }
            return;
        }

        const labels = topCustomers.map(c => `${c.firstName} ${c.lastName}`);
        const data = topCustomers.map(c => 
            c.totalSpent
        );

        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const ctx = chartRef.current.getContext("2d")
        if (!ctx) return

        const colors = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels, 
                datasets: [
                    {
                        label: "Total Spending",
                        data: data, 
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
        <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Top 5 Customers by Spend</h2>
            <div className="relative h-80">
                <canvas ref={chartRef} />
            </div>
        </div>
    )
}