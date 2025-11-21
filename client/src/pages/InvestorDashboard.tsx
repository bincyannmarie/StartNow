import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Startup = {
  id: string;
  name: string;
  founder: string;
  industry: string;
  stage: string;
  score: number;
  fundingNeeded: string;
  location: string;
  description?: string;
};

type InvestorInterest = {
  startupId: string;
  investorEmail: string;
  createdAt: string;
};

const MOCK_STARTUPS: Startup[] = [
  {
    id: "demo-1",
    name: "GreenTech Innovations",
    founder: "Aarav Nair",
    industry: "Clean Energy",
    stage: "Seed",
    score: 88,
    fundingNeeded: "$250k",
    location: "Bangalore, India",
    description:
      "AI-driven optimization for solar microgrids targeting rural and semi-urban communities.",
  },
  {
    id: "demo-2",
    name: "MedConnect",
    founder: "Diya Menon",
    industry: "HealthTech",
    stage: "Pre-Series A",
    score: 91,
    fundingNeeded: "$500k",
    location: "Kochi, India",
    description:
      "End-to-end telemedicine platform connecting tier-2 city hospitals with specialists.",
  },
  {
    id: "demo-3",
    name: "EduSphere",
    founder: "Rohan Verma",
    industry: "EdTech",
    stage: "MVP",
    score: 83,
    fundingNeeded: "$150k",
    location: "Chennai, India",
    description:
      "Gamified learning platform for STEM concepts for school students in India.",
  },
];

const STARTUP_STORAGE_KEY = "pitchscore_startups";
const INTEREST_STORAGE_KEY = "pitchscore_investor_interests";

export default function InvestorDashboard() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [interestedIds, setInterestedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  // ✅ Ensure only logged-in investor can access this page
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/investor-login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      if (parsed.role !== "investor") {
        navigate("/investor-login");
      }
    } catch {
      navigate("/investor-login");
    }
  }, [navigate]);

  // ✅ Load startups: always show MOCK_STARTUPS + user-submitted ones
  useEffect(() => {
    let combined: Startup[] = [...MOCK_STARTUPS];

    try {
      const raw = localStorage.getItem(STARTUP_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Startup[];
        if (Array.isArray(parsed)) {
          for (const s of parsed) {
            const exists = combined.some((c) => c.id === s.id);
            if (!exists) combined.push(s);
          }
        }
      }
    } catch (e) {
      console.error("[InvestorDashboard] Failed to parse stored startups:", e);
    }

    setStartups(combined);
  }, []);

  // ✅ Load investor interests from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(INTEREST_STORAGE_KEY);
      if (!raw) return;

      const parsed: InvestorInterest[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const ids = parsed.map((i) => i.startupId);
        setInterestedIds(ids);
      }
    } catch (e) {
      console.error("[InvestorDashboard] Failed to parse interests:", e);
    }
  }, []);

  const filteredStartups = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return startups;

    return startups.filter((s) => {
      return (
        s.name.toLowerCase().includes(q) ||
        s.industry.toLowerCase().includes(q) ||
        s.founder.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q)
      );
    });
  }, [filter, startups]);

  const handleShowInterest = (startup: Startup) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/investor-login");
      return;
    }

    let investorEmail = "investor@example.com";
    try {
      const parsed = JSON.parse(storedUser);
      investorEmail = parsed.email || investorEmail;
    } catch {
      // ignore
    }

    const interest: InvestorInterest = {
      startupId: startup.id,
      investorEmail,
      createdAt: new Date().toISOString(),
    };

    let existing: InvestorInterest[] = [];
    try {
      const raw = localStorage.getItem(INTEREST_STORAGE_KEY);
      if (raw) {
        existing = JSON.parse(raw);
      }
    } catch {
      // ignore
    }

    const already = existing.some(
      (i) => i.startupId === startup.id && i.investorEmail === investorEmail
    );
    if (!already) {
      const updated = [...existing, interest];
      localStorage.setItem(INTEREST_STORAGE_KEY, JSON.stringify(updated));
      setInterestedIds((prev) => Array.from(new Set([...prev, startup.id])));
    }

    alert(
      `Interest recorded for "${startup.name}". (Stored locally for demo purposes)`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              📊 Investor Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Browse curated startup pitches with PitchScore.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by name, industry, founder..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-64 rounded-2xl bg-gray-900/80 border border-gray-700 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-500"
            />
          </div>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Total Startups
            </p>
            <p className="text-2xl font-bold mt-1">{startups.length}</p>
          </div>
          <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Avg. PitchScore
            </p>
            <p className="text-2xl font-bold mt-1">
              {startups.length
                ? Math.round(
                    startups.reduce((sum, s) => sum + s.score, 0) /
                      startups.length
                  )
                : 0}
            </p>
          </div>
          <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Pitches Interested
            </p>
            <p className="text-2xl font-bold mt-1">
              {interestedIds.length}
            </p>
            <p className="text-xs mt-1 text-gray-400">
              Number of pitches you&apos;ve marked as interested.
            </p>
          </div>
        </div>

        {/* Startups list */}
        {filteredStartups.length === 0 ? (
          <div className="text-center text-gray-400 py-12 border border-dashed border-gray-700 rounded-2xl">
            No startups match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredStartups.map((startup) => {
              const isInterested = interestedIds.includes(startup.id);
              return (
                <div
                  key={startup.id}
                  className="rounded-2xl bg-gray-900/80 border border-gray-800 p-5 shadow-lg shadow-black/30 hover:border-green-500/60 transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h2 className="text-lg font-semibold">{startup.name}</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        {startup.industry} • {startup.stage}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400">PitchScore</span>
                      <span className="text-2xl font-bold text-green-400">
                        {startup.score}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-300 space-y-1 mb-4">
                    <p>
                      <span className="text-gray-400">Founder:</span>{" "}
                      {startup.founder}
                    </p>
                    <p>
                      <span className="text-gray-400">Funding Needed:</span>{" "}
                      {startup.fundingNeeded}
                    </p>
                    <p>
                      <span className="text-gray-400">Location:</span>{" "}
                      {startup.location}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-sm font-semibold transition"
                      onClick={() => setSelectedStartup(startup)}
                    >
                      View Details
                    </button>
                    <button
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                        isInterested
                          ? "bg-green-700 text-white cursor-default"
                          : "bg-green-500/90 hover:bg-green-500 text-gray-900"
                      }`}
                      onClick={() =>
                        !isInterested && handleShowInterest(startup)
                      }
                    >
                      {isInterested ? "Interested" : "Show Interest"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details modal */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="max-w-lg w-full bg-gray-900 rounded-2xl border border-gray-700 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
              onClick={() => setSelectedStartup(null)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2">
              {selectedStartup.name}
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              {selectedStartup.industry} • {selectedStartup.stage} •{" "}
              {selectedStartup.location}
            </p>

            <div className="space-y-2 text-sm text-gray-200 mb-4">
              <p>
                <span className="text-gray-400">Founder:</span>{" "}
                {selectedStartup.founder}
              </p>
              <p>
                <span className="text-gray-400">Funding Needed:</span>{" "}
                {selectedStartup.fundingNeeded}
              </p>
              <p>
                <span className="text-gray-400">PitchScore:</span>{" "}
                {selectedStartup.score}
              </p>
              {selectedStartup.description && (
                <p className="mt-2">
                  <span className="text-gray-400 block mb-1">
                    Pitch Summary:
                  </span>
                  {selectedStartup.description}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-xl bg-green-500/90 hover:bg-green-500 text-gray-900 text-sm font-semibold"
                onClick={() => {
                  handleShowInterest(selectedStartup);
                  setSelectedStartup(null);
                }}
              >
                I&apos;m Interested
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
