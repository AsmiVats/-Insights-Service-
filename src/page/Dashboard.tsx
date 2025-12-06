
import TopCustomersChart from "../components/TopCustomersChart"
import CustomEvents from "../components/CustomEvents"
import CustomerMetrics from "../components/CustomerMetric"
import CORCards from "../components/COR-Cards"
import Header from "../components/Header"
import OrdersChart from "../components/Orders"
import ProductInsights from "../components/ProductInsights"



export default function Dashboard() {

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-slate-900 to-slate-800">
      <Header />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <CORCards/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-3">

             <OrdersChart/>
          </div>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <TopCustomersChart />
          <CustomerMetrics  />
        </div>

        <div className="mt-8">
          <ProductInsights />
        </div>

        <div className="mt-8">
          <CustomEvents/>
        </div>

        <div className="mt-8">
          {/* <PerformanceIndicators metrics={metrics} orders={data.orders} customers={data.customers} /> */}
        </div>
      </main>
    </div>
  )
}
