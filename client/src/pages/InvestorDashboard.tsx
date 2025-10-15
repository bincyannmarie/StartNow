import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Startup {
  _id: string;
  name: string;
  description: string;
  industry?: string;
  stage?: string;
  logo?: string;
  website?: string;
}

export default function InvestorDashboard() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view startups.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/investor/pitches`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetched = res.data.startups || res.data || [];
        setStartups(fetched);
      } catch (error: any) {
        console.error("❌ Error fetching startups:", error.response?.data || error.message);
        toast.error("Failed to fetch startup pitches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  // ✅ Fixed handleInterest function
  const handleInterest = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to mark interest.");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/investor/interest/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Marked interest successfully!");
      } else {
        toast.error(res.data.message || "Failed to mark interest.");
      }
    } catch (err: any) {
      console.error("❌ Error marking interest:", err.response?.data || err.message);
      toast.error("Failed to mark interest. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading startup pitches...
      </div>
    );
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900">
        💼 Investor Dashboard
      </h1>

      {startups.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No startup pitches available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {startups.map((startup) => (
            <div
              key={startup._id}
              className="bg-white shadow-xl rounded-3xl p-6 border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-5xl mr-3">{startup.logo || "🚀"}</div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {startup.name}
                </h2>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {startup.description}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>📊 {startup.industry || "Industry N/A"}</span>
                <span>🚀 {startup.stage || "Stage N/A"}</span>
              </div>

              <button
                onClick={() => handleInterest(startup._id)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition-all duration-200 shadow-sm"
              >
                💰 Show Interest
              </button>

              {startup.website && (
                <a
                  href={`https://${startup.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-blue-600 hover:text-blue-800 text-center text-sm font-medium"
                >
                  Visit Website ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
