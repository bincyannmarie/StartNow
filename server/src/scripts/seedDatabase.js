import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import Startup from "../models/startup.model.js";
import Investment from "../models/investment.model.js";
import Proposal from "../models/proposal.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/pitchscore";

// Sample users data
const sampleUsers = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@ecotech.com",
    role: "founder",
    bio: "Serial entrepreneur passionate about sustainable technology and clean energy solutions.",
    location: "San Francisco, CA",
    website: "www.ecotech-solutions.com",
    linkedin: "linkedin.com/in/sarahchen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Dr. Michael Rodriguez",
    email: "michael@healthlink.ai",
    role: "founder",
    bio: "Medical doctor turned tech entrepreneur, focused on democratizing healthcare access globally.",
    location: "Boston, MA",
    website: "www.healthlink-ai.com",
    linkedin: "linkedin.com/in/drmichaelrodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Alex Thompson",
    email: "alex@fintech.startup",
    role: "founder",
    bio: "Former Goldman Sachs analyst building the future of decentralized finance.",
    location: "New York, NY",
    website: "www.defi-solutions.com",
    linkedin: "linkedin.com/in/alexthompson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Maria Gonzalez",
    email: "maria@agrismart.tech",
    role: "founder",
    bio: "Agricultural engineer revolutionizing farming with IoT and AI technologies.",
    location: "Denver, CO",
    website: "www.agrismart-tech.com",
    linkedin: "linkedin.com/in/mariagonzalez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "David Kim",
    email: "david@ecommerce.ai",
    role: "founder",
    bio: "E-commerce veteran building AI-powered customer service solutions.",
    location: "Seattle, WA",
    website: "www.ecommerce-ai.com",
    linkedin: "linkedin.com/in/davidkim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Jennifer Walsh",
    email: "jennifer.walsh@venture.capital",
    role: "investor",
    bio: "Partner at TechVentures focusing on early-stage SaaS and AI startups.",
    location: "Palo Alto, CA",
    website: "www.techventures.com",
    linkedin: "linkedin.com/in/jenniferwalsh",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    investmentPreferences: {
      industries: ["SaaS", "AI", "FinTech", "HealthTech"],
      stages: ["Seed", "Series A"],
      minInvestment: 50000,
      maxInvestment: 2000000
    }
  },
  {
    name: "Robert Chen",
    email: "robert@angelinvestor.com",
    role: "investor",
    bio: "Angel investor and former startup founder with 15+ years in tech.",
    location: "Austin, TX",
    website: "www.angelinvestor.com",
    linkedin: "linkedin.com/in/robertchen",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    investmentPreferences: {
      industries: ["CleanTech", "AgTech", "EdTech"],
      stages: ["Pre-Seed", "Seed"],
      minInvestment: 25000,
      maxInvestment: 500000
    }
  }
];

// Sample startups data (will be linked to users after creation)
const sampleStartups = [
  {
    name: "EcoTech Solutions",
    description: "Revolutionary AI-powered platform for sustainable energy management in smart cities.",
    industry: "CleanTech",
    stage: "Series A",
    fundingGoal: "$5M",
    fundingRaised: "$2.3M",
    foundedDate: "2022",
    location: "San Francisco, CA",
    teamSize: 12,
    tags: ["AI", "Sustainability", "Smart Cities", "IoT"],
    logo: "🌱",
    images: ["https://images.unsplash.com/photo-1497436072909-f5e4be1713a0?w=800&h=400&fit=crop"],
    website: "www.ecotech-solutions.com",
    pitch: "Reducing urban energy consumption by 30% through intelligent grid management and predictive analytics.",
    businessModel: "SaaS subscription model with tiered pricing based on city size and energy consumption.",
    targetMarket: "Smart cities, municipal governments, and large commercial real estate developers.",
    competition: "Traditional energy management systems lack AI capabilities and real-time optimization.",
    traction: "Deployed in 5 cities, 40% average energy savings, $2.3M ARR",
    financials: {
      revenue: "$2.3M ARR",
      growth: "25% MoM",
      burn: "$180K/month"
    }
  },
  {
    name: "HealthLink AI",
    description: "AI-driven telemedicine platform connecting patients with specialists worldwide.",
    industry: "HealthTech",
    stage: "Seed",
    fundingGoal: "$2M",
    fundingRaised: "$800K",
    foundedDate: "2023",
    location: "Boston, MA",
    teamSize: 8,
    tags: ["AI", "Healthcare", "Telemedicine", "Global Health"],
    logo: "🏥",
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop"],
    website: "www.healthlink-ai.com",
    pitch: "Breaking down geographical barriers in healthcare by connecting patients with the right specialists globally.",
    businessModel: "Commission-based model on consultations plus subscription for healthcare providers.",
    targetMarket: "Patients in underserved areas, healthcare providers, and international medical tourism.",
    competition: "Existing telemedicine platforms lack AI matching and global specialist networks.",
    traction: "10K+ consultations, 95% patient satisfaction, partnerships with 500+ specialists",
    financials: {
      revenue: "$400K ARR",
      growth: "40% MoM",
      burn: "$120K/month"
    }
  },
  {
    name: "DeFi Bridge",
    description: "Cross-chain DeFi protocol enabling seamless asset transfers between blockchains.",
    industry: "FinTech",
    stage: "Pre-Seed",
    fundingGoal: "$1.5M",
    fundingRaised: "$300K",
    foundedDate: "2023",
    location: "New York, NY",
    teamSize: 6,
    tags: ["DeFi", "Blockchain", "Cross-chain", "Web3"],
    logo: "🌉",
    images: ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop"],
    website: "www.defi-bridge.com",
    pitch: "Solving blockchain interoperability with secure, fast, and low-cost cross-chain transactions.",
    businessModel: "Transaction fees on cross-chain transfers and premium features for institutional users.",
    targetMarket: "DeFi users, institutional investors, and blockchain developers.",
    competition: "Current bridges are slow, expensive, and have security vulnerabilities.",
    traction: "$50M+ in cross-chain volume, 5K+ active users, 99.9% uptime",
    financials: {
      revenue: "$150K ARR",
      growth: "60% MoM",
      burn: "$80K/month"
    }
  }
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");
    
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await User.deleteMany({});
    await Startup.deleteMany({});
    await Investment.deleteMany({});
    await Proposal.deleteMany({});

    // Create users
    console.log("👥 Creating sample users...");
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = new User({
        ...userData,
        password: "password123", // Default password for demo
        isVerified: true
      });
      await user.save();
      createdUsers.push(user);
      console.log(`   ✓ Created user: ${user.name}`);
    }

    // Create startups
    console.log("🚀 Creating sample startups...");
    const createdStartups = [];
    for (let i = 0; i < sampleStartups.length; i++) {
      const startupData = sampleStartups[i];
      const founder = createdUsers[i]; // Link to corresponding founder
      
      const startup = new Startup({
        ...startupData,
        founder: founder._id,
        founderName: founder.name
      });
      await startup.save();
      createdStartups.push(startup);
      console.log(`   ✓ Created startup: ${startup.name}`);
    }

    // Create sample investments
    console.log("💰 Creating sample investments...");
    const investors = createdUsers.filter(user => user.role === 'investor');
    
    for (const investor of investors) {
      for (let i = 0; i < 2; i++) {
        const randomStartup = createdStartups[Math.floor(Math.random() * createdStartups.length)];
        const investment = new Investment({
          investor: investor._id,
          startup: randomStartup._id,
          amount: Math.floor(Math.random() * 500000) + 50000, // $50K - $550K
          investmentType: ['Equity', 'Convertible Note', 'SAFE'][Math.floor(Math.random() * 3)],
          equityPercentage: Math.floor(Math.random() * 10) + 1, // 1-10%
          status: ['Pending', 'Approved', 'Completed'][Math.floor(Math.random() * 3)],
          terms: "Standard investment terms with pro-rata rights and board observer seat."
        });
        await investment.save();
        console.log(`   ✓ Created investment: ${investor.name} → ${randomStartup.name}`);
      }
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log(`   📊 Created ${createdUsers.length} users`);
    console.log(`   🚀 Created ${createdStartups.length} startups`);
    console.log(`   💰 Created ${investors.length * 2} investments`);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run the seeding function
seedDatabase();
