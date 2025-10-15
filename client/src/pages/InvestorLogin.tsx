import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InvestorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // If success
      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

        if (res.data.user.role === "investor") {
          navigate("/investor-dashboard");
        } else {
          setError("You are not registered as an investor.");
        }
      } else {
        setError("Invalid credentials.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials or server connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white rounded-xl shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Investor Login</h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
