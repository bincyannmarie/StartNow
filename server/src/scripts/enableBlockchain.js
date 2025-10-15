import mongoose from "mongoose";
import dotenv from "dotenv";
import Startup from "../models/startup.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/pitchscore";

async function enableBlockchainForAllStartups() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    console.log("🔧 Updating all startups to enable blockchain...");
    const result = await Startup.updateMany(
      {},
      { 
        $set: { 
          isBlockchainEnabled: true 
        } 
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} startups`);
    
    // Verify the update
    const updatedStartups = await Startup.find({}, 'name isBlockchainEnabled');
    console.log("\n📊 Current blockchain status:");
    updatedStartups.forEach(startup => {
      console.log(`   ${startup.name}: ${startup.isBlockchainEnabled ? '✅ Enabled' : '❌ Disabled'}`);
    });

    console.log("\n🎉 Blockchain enablement completed successfully!");
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

enableBlockchainForAllStartups();
