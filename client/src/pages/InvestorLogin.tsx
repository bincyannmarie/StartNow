import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// 🔐 Demo investor credentials (frontend-only fallback)
const DEMO_EMAIL = "jennifer.walsh@venture.capital";
const DEMO_PASSWORD = "password123";

export default function InvestorLogin() {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🚨 EMERGENCY DEMO MODE: no backend, check creds on frontend
      console.log("[InvestorLogin] Using frontend-only demo login");

      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        const fakeUser = {
          _id: "demo-investor-id",
          name: "Jennifer Walsh",
          email: DEMO_EMAIL,
          role: "investor",
        };

        const fakeToken = "demo-investor-token";

        // Mimic real auth flow
        localStorage.setItem("token", fakeToken);
        localStorage.setItem("user", JSON.stringify(fakeUser));

        toast.success("Logged in as investor (demo)!");
        navigate("/investor-dashboard");
        return;
      }

      toast.error("Invalid demo investor credentials.");
    } catch (err) {
      console.error("[InvestorLogin] demo login error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900/80 border border-gray-700/60 rounded-3xl shadow-2xl shadow-black/40 p-8 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            💼 Investor Login
          </h1>
          <p className="text-gray-400 text-sm">
            Access curated startup pitches and manage your interests.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Investor Email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-2xl bg-gray-800/70 border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-500"
              placeholder="you@investor.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-2xl bg-gray-800/70 border border-gray-700 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold text-sm shadow-lg shadow-green-500/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            {loading ? "Logging in..." : "Login as Investor"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            Demo investor:
            <br />
            <span className="font-mono text-gray-300">
              jennifer.walsh@venture.capital / password123
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
