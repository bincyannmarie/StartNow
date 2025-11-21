import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Rocket,
  Users,
  Upload,
  Star,
  ExternalLink,
} from "lucide-react";
import { AuroraHero } from "@/components/ui/futuristic-hero-section";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <AuroraHero />

      {/* How It Works Section */}
      <div className="relative py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to launch your startup on our decentralized
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: "#ffee99" }}
              >
                <Upload className="w-10 h-10 text-black" />
              </div>
              <div
                className="bg-black border-2 rounded-2xl p-6 h-full shadow-lg"
                style={{ borderColor: "#ffee99" }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  1. Submit Your Pitch
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Create a compelling pitch deck with your business model,
                  market analysis, and financial projections. Our AI helps
                  optimize your presentation.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: "#ffee99" }}
              >
                <Users className="w-10 h-10 text-black" />
              </div>
              <div
                className="bg-black border-2 rounded-2xl p-6 h-full shadow-lg"
                style={{ borderColor: "#ffee99" }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  2. Get Community Validation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our decentralized community of investors and experts review
                  your pitch. Receive feedback and build momentum before the
                  funding round.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ background: "#ffee99" }}
              >
                <Rocket className="w-10 h-10 text-black" />
              </div>
              <div
                className="bg-black border-2 rounded-2xl p-6 h-full shadow-lg"
                style={{ borderColor: "#ffee99" }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  3. Launch & Scale
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Secure funding through our transparent, blockchain-based
                  system. Access ongoing support and resources to scale your
                  startup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Startups Section */}
      <div className="relative py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Startups
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the most promising startups currently raising funds on
              our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Startup Card 1 */}
            <div
              className="bg-gray-900 border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group shadow-md"
              style={{ borderColor: "#ffee99" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#ffee99")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#ffee99")
              }
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "#ffee99" }}
                >
                  <span className="text-black font-bold text-lg">AI</span>
                </div>
                <div className="flex items-center" style={{ color: "#ffee99" }}>
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-semibold">4.8</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                NeuralFlow AI
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Revolutionary AI platform for automated business process
                optimization
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">
                  $2.5M Raised
                </span>
                <span className="text-gray-400 text-sm">of $5M goal</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full"
                  style={{ width: "50%", background: "#ffee99" }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">12 days left</span>
                <button
                  className="transition-colors inline-flex items-center font-medium hover:opacity-80"
                  style={{ color: "#ffee99" }}
                >
                  View Details <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Startup Card 2 */}
            <div
              className="bg-gray-900 border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group shadow-md"
              style={{ borderColor: "#ffee99" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "#ffee99" }}
                >
                  <span className="text-black font-bold text-lg">DeFi</span>
                </div>
                <div className="flex items-center" style={{ color: "#ffee99" }}>
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-semibold">4.9</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">CryptoVault</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Next-generation DeFi protocol for secure yield farming and
                staking
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">
                  $4.2M Raised
                </span>
                <span className="text-gray-400 text-sm">of $6M goal</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full"
                  style={{ width: "70%", background: "#ffee99" }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">8 days left</span>
                <button
                  className="transition-colors inline-flex items-center font-medium hover:opacity-80"
                  style={{ color: "#ffee99" }}
                >
                  View Details <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Startup Card 3 */}
            <div
              className="bg-gray-900 border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group shadow-md"
              style={{ borderColor: "#ffee99" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "#ffee99" }}
                >
                  <span className="text-black font-bold text-lg">ECO</span>
                </div>
                <div className="flex items-center" style={{ color: "#ffee99" }}>
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-semibold">4.7</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                GreenTech Solutions
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Sustainable technology for carbon footprint reduction and green
                energy
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-semibold">
                  $1.8M Raised
                </span>
                <span className="text-gray-400 text-sm">of $3M goal</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full"
                  style={{ width: "60%", background: "#ffee99" }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">15 days left</span>
                <button
                  className="transition-colors inline-flex items-center font-medium hover:opacity-80"
                  style={{ color: "#ffee99" }}
                >
                  View Details <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="text-black font-semibold py-3 px-8 rounded-xl transition-all duration-300 inline-flex items-center shadow-lg hover:opacity-80"
              style={{ background: "#ffee99" }}
            >
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="relative py-16 px-4 bg-gray-900 border-t-2"
        style={{ borderColor: "#ffee99" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-4">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">PitchScore</h3>
              <p className="text-gray-300 mb-2 max-w-md">
                The future of startup funding is here. Join entrepreneurs and
                investors building the next generation of innovative companies.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/explore"
                    className="text-gray-300 hover:opacity-80 transition-colors"
                    style={{ color: "#ffee99" }}
                  >
                    Explore Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/idea-input"
                    className="text-gray-300 hover:opacity-80 transition-colors"
                    style={{ color: "#ffee99" }}
                  >
                    Submit Pitch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/financial-projections"
                    className="text-gray-300 hover:opacity-80 transition-colors"
                    style={{ color: "#ffee99" }}
                  >
                    For Investors
                  </Link>
                </li>
                <li>
                  <span
                    className="text-gray-300 hover:opacity-80 transition-colors cursor-default"
                    style={{ color: "#ffee99" }}
                  >
                    Documentation
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <span
                    className="text-gray-300 hover:opacity-80 transition-colors cursor-default"
                    style={{ color: "#ffee99" }}
                  >
                    About Us
                  </span>
                </li>
                <li>
                  <span
                    className="text-gray-300 hover:opacity-80 transition-colors cursor-default"
                    style={{ color: "#ffee99" }}
                  >
                    Careers
                  </span>
                </li>
                <li>
                  <span
                    className="text-gray-300 hover:opacity-80 transition-colors cursor-default"
                    style={{ color: "#ffee99" }}
                  >
                    Blog
                  </span>
                </li>
                <li>
                  <span
                    className="text-gray-300 hover:opacity-80 transition-colors cursor-default"
                    style={{ color: "#ffee99" }}
                  >
                    Contact
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Simple bottom note without © / policies */}
          <div className="pt-4 text-center text-xs text-gray-500">
            Made with ❤️ as part of the PitchScore project.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
