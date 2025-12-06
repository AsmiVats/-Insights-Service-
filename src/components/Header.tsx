
import { BarChart3, TrendingUp } from "lucide-react"
import { updateAll } from "../api/auth";

export default function Header() {


  const handleUpdate = () => {
    try{
       const tokenData = localStorage.getItem("token");
            if (!tokenData) {
                console.error("No token found");
                return;
            }

            const token = JSON.parse(tokenData);
            const tokenString = token.token || token.access_token || JSON.stringify(token);

            const response = updateAll(tokenString);
            console.log("Update response:", response);
    } catch (error) {
        console.error("Error updating data:", error);
    }
    window.location.reload();
  }

  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Dashboard
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </h1>
            <p className="text-slate-400 text-sm mt-1">Real-time analytics</p>
          </div>
          <div className="ml-auto  text-gray-300">
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Update</button>
          </div>
        </div>
      </div>
    </header>
  )
}
