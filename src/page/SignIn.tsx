import { useState } from "react"
import { Lock } from "lucide-react"
import { signIn } from "../api/auth"; 
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        
        console.log("Attempting sign-in with:", { email, password });

        try {
            const response = await signIn(email, password); 
            console.log("Sign-in successful:", response);


            localStorage.setItem("token", JSON.stringify(response)); 

            navigate("/");

        } catch (error) {
            console.error("Sign-in failed:", error);
        }
    }

	return (
		<div className="min-h-screen bg-linear-to-br from-blue-900 via-slate-900 to-slate-800 flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-slate-900/70 border border-slate-700 rounded-2xl shadow-2xl p-8 text-white space-y-6">
				<div className="flex items-center gap-3">
					  <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500">
						<Lock className="w-5 h-5 text-white" />
					</div>
					<div>
						<p className="text-sm text-slate-400">Welcome back</p>
						<h1 className="text-2xl font-semibold">Sign In</h1>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm text-slate-300" htmlFor="signin-email">Email</label>
						<input
							id="signin-email"
							name="email"
							type="email"
							required
							className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
							placeholder="name@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<label className="text-sm text-slate-300" htmlFor="signin-password">Password</label>
						<input
							id="signin-password"
							name="password"
							type="password"
							required
							className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
							placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-linear-to-r from-blue-500 to-cyan-400 text-slate-900 font-semibold rounded-lg py-2 hover:from-blue-400 hover:to-cyan-300 transition-colors"
					>
						Sign In
					</button>
				</form>
                <p >
                Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/signup")}>Sign Up</span>
                </p>

			</div>
		</div>
	)
}