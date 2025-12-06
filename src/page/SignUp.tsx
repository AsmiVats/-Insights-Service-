import { useState } from "react";
import { UserPlus } from "lucide-react";
import { signUp } from "../api/auth"; 
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [shopName, setShopName] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        console.log("Attempting sign-up with:", { email, password, shopName, accessToken });

        try {
           
            const response = await signUp(email, password, shopName, accessToken);
            console.log("Sign-up successful:", response);
            
           
            
                localStorage.setItem("token", JSON.stringify(response.token));

                navigate("/");

        } catch (error) {
            
            console.error("Sign-up failed:", error);
         
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-900 via-slate-900 to-slate-800 flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-slate-900/70 border border-slate-700 rounded-2xl shadow-2xl p-8 text-white space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-linear-to-br from-emerald-500 to-lime-400">
                        <UserPlus className="w-5 h-5 text-slate-900" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Create your account</p>
                        <h1 className="text-2xl font-semibold">Sign Up</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300" htmlFor="signup-email">Email</label>
                            <input
                                id="signup-email"
                                name="email"
                                type="email"
                                required
                                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="name@gmail.com"
                            
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-300" htmlFor="signup-password">Password</label>
                            <input
                                id="signup-password"
                                name="password"
                                type="password"
                                required
                                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="Secure password"
                               
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300" htmlFor="signup-shop">Shop Name</label>
                            <input
                                id="signup-shop"
                                name="shopName"
                                type="text"
                                required
                                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="Shop Name"
                               
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-300" htmlFor="signup-token">Access Token</label>
                            <input
                                id="signup-token"
                                name="accessToken"
                                type="text"
                                required
                                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="shpat_..."
                                value={accessToken}
                                onChange={(e) => setAccessToken(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-emerald-500 to-lime-400 text-slate-900 font-semibold rounded-lg py-2 hover:from-emerald-400 hover:to-lime-300 transition-colors"
                    >
                        Create Account
                    </button>
                </form>
                <p>
                Already have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/signin")}>Sign In</span>
                </p>
            </div>
        </div>
    )
}