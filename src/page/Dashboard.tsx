
import { useMemo } from "react"
// import OrdersChart from "@/components/orders-chart"
import TopCustomersChart from "../components/TopCustomersChart"
import RevenueChart from "../components/RevenueChart"
// import PerformanceIndicators from "@/components/performance-indicators"
import CustomEvents from "../components/CustomEvents"
import CustomerMetrics from "../components/CustomerMetric"
import CORCards from "../components/COR-Cards"
import Header from "../components/Header"
import {orders } from "../data/orders"
import OrdersChart from "../components/Orders"
import { customers } from "../data/customers"
import { mockProducts } from "../data/products"
import { topCustomersMock } from "../data/top-customers"
import { mockOrders } from "../data/date-range-orders"
import ProductInsights from "../components/ProductInsights"



export default function Dashboard() {

  const metrics = useMemo(() => {
    return {
      totalCustomers: customers.length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + Number(order.totalPriceSet.shopMoney.amount), 0),
      avgOrderValue:
        orders.length > 0 ? orders.reduce((sum, order) => sum + Number(order.totalPriceSet.shopMoney.amount), 0) / orders.length : 0,
    }
  }, [customers, orders])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800">
      <Header />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <CORCards metrics={metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">

             <OrdersChart orders={mockOrders} />
          </div>
          <div>
            <CustomerMetrics data={customers} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <TopCustomersChart topCustomers={topCustomersMock} />
          <RevenueChart orders={orders} />
        </div>

        <div className="mt-8">
          <ProductInsights />
        </div>

        <div className="mt-8">
          <CustomEvents events={[]} />
        </div>

        <div className="mt-8">
          {/* <PerformanceIndicators metrics={metrics} orders={data.orders} customers={data.customers} /> */}
        </div>
      </main>
    </div>
  )
}
